import { Award, Trophy } from "lucide-react";
import type { Trophies } from "@/data/personal";
import { fmt, useT } from "@/messages";

/** Stats panel (bottom-right of the stage). Generic icons only, tinted by tier. */
export default function TrophyPanel({ trophies, title }: { trophies: Trophies; title: string }) {
  const t = useT();
  const tiers = [
    { key: "gold", count: trophies.gold, label: t.beyond.trophies.gold },
    { key: "silver", count: trophies.silver, label: t.beyond.trophies.silver },
    { key: "bronze", count: trophies.bronze, label: t.beyond.trophies.bronze },
  ] as const;

  return (
    <section className="ps-info" aria-label={fmt(t.beyond.trophies.aria, { title })}>
      <div className="ps-info-head">
        <Trophy className="ps-info-icon" aria-hidden="true" />
        <dl className="ps-info-stats">
          <div>
            <dt>{t.beyond.trophies.progress}</dt>
            <dd>
              {trophies.progress}%
              <span className="ps-progress" aria-hidden="true">
                <span style={{ width: `${Math.min(100, Math.max(0, trophies.progress))}%` }} />
              </span>
            </dd>
          </div>
          <div>
            <dt>{t.beyond.trophies.earned}</dt>
            <dd>
              {trophies.earned}/{trophies.total}
            </dd>
          </div>
        </dl>
      </div>
      <ul className="ps-tiers">
        {trophies.platinum && (
          <li className="ps-tier" data-tier="platinum">
            <Award aria-hidden="true" />
            <span className="sr-only">{t.beyond.trophies.platinum}</span>
          </li>
        )}
        {tiers.map((tier) => (
          <li key={tier.key} className="ps-tier" data-tier={tier.key}>
            <Trophy aria-hidden="true" />
            <span className="sr-only">{tier.label}: </span>
            <span>{tier.count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
