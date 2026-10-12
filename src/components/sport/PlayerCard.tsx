import type { ReactNode } from "react";

/** Ruoli di gioco: sigla, nome e colore. Il colore viene dalla classe role-X di styles/giochi.css. */
export type Role = "P" | "D" | "C" | "A";

export const ROLE_NAME: Record<Role, string> = {
  P: "Portiere",
  D: "Difensore",
  C: "Centrocampista",
  A: "Attaccante",
};

/** Ciò che va su una carta: un calciatore, una squadra, un pilota. */
export type Athlete = { role: Role; name: string; team: string; price: number };

/** Pallino con la lettera del ruolo, nel colore del ruolo. */
export function RoleChip({ role, className = "" }: { role: Role; className?: string }) {
  return (
    <span title={ROLE_NAME[role]} className={`role-${role} role-chip grid h-7 w-7 shrink-0 place-items-center rounded-md font-display text-lg font-900 leading-none ${className}`}>
      {role}
      <span className="sr-only"> ({ROLE_NAME[role]})</span>
    </span>
  );
}

/** La carta di un atleta. I figli finiscono sotto il nome (puntata, comandi…). */
export function PlayerCard({
  card,
  lead = false,
  priceLabel = "quot.",
  className = "",
  children,
}: {
  card: Athlete;
  lead?: boolean;
  priceLabel?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={`pcard role-${card.role} ${lead ? "pcard-lead" : ""} flex flex-col gap-3 p-4 pl-5 ${className}`}>
      <header className="flex items-start gap-3">
        <RoleChip role={card.role} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-2xl font-900 uppercase leading-none">{card.name}</h3>
          <p className="mt-1 truncate font-mono text-xs uppercase tracking-wide text-muted2">{card.team}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="num font-mono text-sm font-bold text-cream">{card.price}</p>
          <p className="font-mono text-xs uppercase text-muted">{priceLabel}</p>
        </div>
      </header>
      {children}
    </article>
  );
}

/** Dorso della carta coperta. */
export function CardBack({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`card-back grid place-items-center ${className}`}>
      <span className="grid h-7 w-7 -skew-x-6 place-items-center rounded-md bg-lime font-display text-xl font-900 leading-none text-ink">?</span>
    </span>
  );
}
