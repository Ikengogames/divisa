"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Pending = { text: string; confirmLabel: string; danger: boolean; resolve: (ok: boolean) => void };

/**
 * Finestra di conferma nello stile del sito, al posto di quella grigia del browser.
 * Usa l'elemento <dialog>: il focus resta dentro la finestra, Esc annulla e i lettori di schermo la annunciano.
 *
 *   const [ask, dialog] = useConfirm();
 *   if (await ask("Chiudere subito le puntate?")) …
 *   return <>{dialog}…</>;
 */
export function useConfirm(): [(text: string, opts?: { confirmLabel?: string; danger?: boolean }) => Promise<boolean>, React.ReactNode] {
  const [pending, setPending] = useState<Pending | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  const ask = useCallback(
    (text: string, opts: { confirmLabel?: string; danger?: boolean } = {}) =>
      new Promise<boolean>((resolve) => setPending({ text, confirmLabel: opts.confirmLabel ?? "Conferma", danger: opts.danger ?? false, resolve })),
    [],
  );

  useEffect(() => {
    const d = ref.current;
    if (pending && d && !d.open) d.showModal();
  }, [pending]);

  const close = (ok: boolean) => {
    pending?.resolve(ok);
    ref.current?.close();
    setPending(null);
  };

  const dialog = pending ? (
    <dialog
      ref={ref}
      aria-labelledby="confirm-text"
      onCancel={(e) => {
        e.preventDefault();
        close(false);
      }}
      onClick={(e) => {
        // tocco fuori dal riquadro = annulla
        if (e.target === ref.current) close(false);
      }}
      className="m-auto w-[min(92vw,28rem)] rounded-2xl border border-line bg-paper p-0 text-cream backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-5 p-6">
        <p id="confirm-text" className="text-lg leading-snug">
          {pending.text}
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" autoFocus onClick={() => close(false)} className="min-h-[44px] rounded-lg border border-line px-5 font-semibold text-muted2 transition-colors hover:border-cream hover:text-cream">
            Annulla
          </button>
          <button
            type="button"
            onClick={() => close(true)}
            className={`min-h-[44px] rounded-lg px-5 font-bold text-ink transition-colors ${pending.danger ? "bg-red hover:brightness-110" : "bg-lime hover:bg-lime2"}`}
          >
            {pending.confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  ) : null;

  return [ask, dialog];
}
