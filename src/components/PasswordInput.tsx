"use client";

import { useState } from "react";

type Props = Omit<React.ComponentProps<"input">, "type"> & {
  /** Classi del contenitore, per quando è lui (e non il campo) a doversi allargare dentro una riga flessibile. */
  wrapperClassName?: string;
};

/**
 * Campo password con l'occhio per vederla mentre la si scrive. Parte sempre nascosta.
 * Il pulsante non invia il modulo e si raggiunge da tastiera dopo il campo.
 */
export default function PasswordInput({ className = "", wrapperClassName, ...props }: Props) {
  const [visible, setVisible] = useState(false);
  // un campo a tutta larghezza porta con sé il contenitore
  const wrapper = wrapperClassName ?? (/\bw-full\b/.test(className) ? "w-full" : "");
  return (
    <span className={`relative inline-flex max-w-full ${wrapper}`}>
      <input {...props} type={visible ? "text" : "password"} className={`${className} min-w-0 flex-1 pr-11`} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Nascondi la password" : "Mostra la password"}
        aria-pressed={visible}
        title={visible ? "Nascondi la password" : "Mostra la password"}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r text-muted2 transition-colors hover:text-lime focus-visible:text-lime"
      >
        <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
          {visible && <path d="M4 4l16 16" />}
        </svg>
      </button>
    </span>
  );
}
