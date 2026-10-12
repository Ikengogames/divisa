"use client";

import { useEffect, useState } from "react";

type Toast = { id: number; text: string; kind: "ok" | "err" };

/** Mostra un messaggio da qualsiasi componente: toast("Puntata registrata"). */
export function toast(text: string, kind: Toast["kind"] = "ok") {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("divisa-toast", { detail: { text, kind } }));
}

/**
 * Conferme in primo piano (es. dopo una puntata): restano sopra la barra in basso del telefono per qualche secondo
 * e vengono annunciate dai lettori di schermo.
 */
export default function Toaster({ className = "bottom-[calc(84px+env(safe-area-inset-bottom))] md:bottom-6" }: { className?: string }) {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    let n = 0;
    const onToast = (e: Event) => {
      const d = (e as CustomEvent<{ text: string; kind: Toast["kind"] }>).detail;
      const id = ++n;
      setItems((x) => [...x.slice(-2), { id, text: d.text, kind: d.kind }]);
      setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 4500);
    };
    window.addEventListener("divisa-toast", onToast);
    return () => window.removeEventListener("divisa-toast", onToast);
  }, []);

  return (
    <div aria-live="polite" role="status" className={`pointer-events-none fixed inset-x-0 z-[60] flex flex-col items-center gap-2 px-4 ${className}`}>
      {items.map((t) => (
        <p key={t.id} className={`toast pointer-events-auto max-w-md rounded-xl border px-5 py-3 text-center font-semibold shadow-card ${t.kind === "ok" ? "border-green bg-[#0f2a1c] text-green" : "border-red bg-[#2a0f17] text-red"}`}>
          {t.text}
        </p>
      ))}
    </div>
  );
}
