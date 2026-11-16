import { Fragment } from "react";

/** Renders a message string, turning **segments** into <strong>. */
export default function Rich({
  text,
  strongClassName = "font-semibold text-ink",
}: {
  text: string;
  strongClassName?: string;
}) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className={strongClassName}>
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
}
