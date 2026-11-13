const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 100, email: 254, message: 5000 } as const;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot: real users never see or fill this field. */
  website?: unknown;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const json = (body: Record<string, unknown>, status: number) =>
  Response.json(body, { status });

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot filled => bot. Pretend success so it learns nothing.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "required";
  else if (name.length > LIMITS.name) fieldErrors.name = "too_long";
  if (!email) fieldErrors.email = "required";
  else if (email.length > LIMITS.email || !EMAIL_REGEX.test(email)) fieldErrors.email = "invalid";
  if (!message) fieldErrors.message = "required";
  else if (message.length > LIMITS.message) fieldErrors.message = "too_long";

  if (Object.keys(fieldErrors).length > 0) {
    return json({ ok: false, error: "validation", fieldErrors }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[contact] Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return json({ ok: false, error: "not_configured" }, 503);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nuevo mensaje del portafolio — ${name}`.slice(0, 200),
        text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
        html: `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Correo:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend responded with status", response.status);
      return json({ ok: false, error: "send_failed" }, 502);
    }
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] Resend request failed", error);
    return json({ ok: false, error: "send_failed" }, 502);
  }
}
