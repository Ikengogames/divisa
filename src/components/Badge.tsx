import type { ReactNode } from "react";

/** Le tinte della palette Divisa disponibili per un badge. */
export type BadgeTone = "lime" | "green" | "red" | "amber" | "cyan" | "muted";

/**
 * Etichetta colorata: stato, categoria, ruolo.
 * Per i ruoli di gioco usa RoleChip, che prende il colore dal ruolo.
 *
 *   <Badge tone="green">Aperto</Badge>
 */
export function Badge({ tone = "muted", className = "", children }: { tone?: BadgeTone; className?: string; children: ReactNode }) {
  return <span className={`badge badge-${tone} ${className}`}>{children}</span>;
}
