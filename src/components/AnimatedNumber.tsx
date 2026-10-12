"use client";

import { useEffect, useRef, useState } from "react";

/** Numero che "scorre" fino al nuovo valore. fromZero: alla prima comparsa parte da 0. */
export default function AnimatedNumber({ value, fromZero = false, duration = 700 }: { value: number; fromZero?: boolean; duration?: number }) {
  const [shown, setShown] = useState(fromZero ? 0 : value);
  // ultimo valore mostrato: l'animazione riparte sempre da qui (anche se un effetto viene annullato e rieseguito)
  const current = useRef(fromZero ? 0 : value);

  useEffect(() => {
    const from = current.current;
    if (from === value) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // senza animazione: il nuovo valore compare al prossimo disegno
      raf = requestAnimationFrame(() => {
        current.current = value;
        setShown(value);
      });
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (value - from) * eased);
      current.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{shown.toLocaleString("it-IT")}</>;
}
