"use client";

import { signOut } from "next-auth/react";

/** Esce dalla sessione e porta alla pagina indicata (di default /login). */
export default function SignOutButton({ callbackUrl = "/login" }: { callbackUrl?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl })}
      className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:border-red hover:text-red"
    >
      Esci
    </button>
  );
}
