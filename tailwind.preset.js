/**
 * Divisa · preset Tailwind.
 * Nel tailwind.config del progetto: import divisa from "divisa/tailwind" e poi presets: [divisa].
 * I font arrivano dalle variabili CSS --font-display, --font-body e --font-mono, da definire con next/font.
 */
export default {
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
