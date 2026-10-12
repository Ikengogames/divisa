/**
 * Divisa · preset Tailwind.
 * Nel tailwind.config del progetto: import divisa from "divisa/tailwind" e poi presets: [divisa].
 * I font arrivano dalle variabili CSS --font-display, --font-body e --font-mono, da definire con next/font.
 */
import plugin from "tailwindcss/plugin.js";

/**
 * Componenti di Divisa. Stanno in un plugin, e non in un file CSS con @apply,
 * perché Next elabora ogni file CSS importato da solo e non troverebbe le direttive di Tailwind.
 */
const componenti = plugin(({ addComponents }) => {
  addComponents({
    ".card": { "@apply rounded-xl border border-line bg-paper shadow-card": {} },
    ".btn": { "@apply inline-flex items-center justify-center gap-2 rounded-lg bg-lime px-5 py-3 font-display text-xl font-800 uppercase tracking-wide text-ink transition hover:bg-lime2 hover:shadow-glow active:scale-[.98] disabled:opacity-40 disabled:hover:shadow-none": {} },
    ".btn-ghost": { "@apply inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-panel/60 px-5 py-3 font-display text-xl font-800 uppercase tracking-wide text-cream transition hover:border-lime hover:text-lime": {} },
    ".odds-btn": { "@apply flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border border-line bg-ink px-3 py-3 text-cream transition": {} },
    ".odds-btn:disabled": { "@apply text-cream": {} },
    ".odds-btn:not(:disabled):hover": { "@apply border-lime/60 bg-panel": {} },
    ".odds-btn[aria-pressed=\"true\"], .odds-btn[aria-pressed=\"true\"]:not(:disabled):hover": { "@apply border-lime bg-lime text-ink shadow-glow": {} },
    ".odds-btn[aria-pressed=\"true\"] .odds-label": { "@apply text-ink/70": {} },
    ".live-dot": { "@apply inline-block h-2 w-2 animate-pulseDot rounded-full bg-lime": {} },
    ".eyebrow": { "@apply font-mono text-xs font-semibold uppercase tracking-[3px] text-lime": {} },
    ".field": { "@apply w-full rounded border border-line bg-ink px-4 py-3 text-cream outline-none focus:border-lime": {} },
    ".label": { "@apply font-mono text-xs uppercase tracking-wide text-muted": {} },
  });
});

export default {
  plugins: [componenti],
  theme: {
    extend: {
      colors: {
        // Sfondi, dal più scuro al più chiaro
        ink: "#05070D", // campi di input, tab, aree incassate
        night: "#090D16", // sfondo pagina
        paper: "#0F1522", // card
        panel: "#161D2E", // card in evidenza
        line: "#222B40", // bordi
        // Testi
        cream: "#EDF1FA",
        muted: "#8F9AB3",
        muted2: "#A0AAC0",
        // Accenti
        lime: "#C8FF2E",
        lime2: "#DDFF7A",
        green: "#2DE08F",
        red: "#FF4D5E",
        amber: "#FFB224",
        cyan: "#38D6FF",
      },
      fontWeight: { 800: "800", 900: "900" },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(200,255,46,.5), 0 8px 40px -8px rgba(200,255,46,.45)",
        card: "0 1px 0 0 rgba(255,255,255,.04) inset, 0 20px 50px -30px rgba(0,0,0,.8)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseDot: { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: ".4", transform: "scale(1.6)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
};
