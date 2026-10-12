# Divisa

Il design system condiviso per i siti di sport e giochi: palette, caratteri, bottoni, animazioni e componenti. Nasce dal Fantabanco e viene usato anche da Pokerasta.

## Installazione

```bash
npm install github:Ikengogames/divisa
```

Servono React 18.3 o superiore e Tailwind CSS 3. `next-auth` serve solo se usi `SessionProvider` o `SignOutButton`.

## Uso in un progetto Next.js

1. **`next.config.ts`**: il pacchetto è scritto in TypeScript, quindi va compilato insieme all'app.

```ts
const nextConfig = {
  transpilePackages: ["divisa"],
};
export default nextConfig;
```

2. **`tailwind.config.ts`**: il preset porta palette e font. Tailwind deve leggere anche i componenti del pacchetto, per generare le loro classi.

```ts
import divisa from "divisa/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [divisa],
  content: ["./src/**/*.{ts,tsx}", "./node_modules/divisa/src/**/*.{ts,tsx}"],
  plugins: [],
};
export default config;
```

3. **`src/app/globals.css`**: gli stili di base vanno importati prima delle direttive di Tailwind. `games.css` serve solo ai progetti con tavoli e carte.

```css
@import "divisa/styles.css";
@import "divisa/games.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. **`src/app/layout.tsx`**: il preset legge tre variabili per i font. Le definisce l'app con `next/font`, come nel Fantabanco e in Pokerasta.

```tsx
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

## Palette

| Token | Colore | Uso |
| --- | --- | --- |
| `night` | `#090D16` | sfondo pagina |
| `paper` | `#0F1522` | card |
| `panel` | `#161D2E` | card in evidenza |
| `ink` | `#05070D` | campi di input, tab, aree incassate |
| `line` | `#222B40` | bordi |
| `cream` | `#EDF1FA` | testo |
| `muted` / `muted2` | `#8F9AB3` / `#A0AAC0` | testo secondario |
| `lime` / `lime2` | `#C8FF2E` / `#DDFF7A` | accento principale, azioni |
| `green` | `#2DE08F` | esito positivo |
| `red` | `#FF4D5E` | errori, tempo che scade |
| `amber` | `#FFB224` | avvisi |
| `cyan` | `#38D6FF` | informazioni |

## Classi di stile

- **Bottoni**: `btn` (primario), `btn-ghost` (secondario), `odds-btn` (scelta a quota, con `aria-pressed`).
- **Superfici**: `card` (riquadro standard), `card-hover` (si solleva al passaggio).
- **Moduli**: `field` (campo di testo) e `label` (etichetta sopra il campo).
- **Testi**: `eyebrow` (titolo di sezione in maiuscolo), `num` (cifre allineate).
- **Movimento**: `page-in`, `stagger`, `reveal`, `live-dot`, `bump` (un numero che cambia), `timer-hot` (ultimi secondi).

Nel file `styles/giochi.css`: `felt` (il tavolo), `pcard` (carta di un atleta, con `role-P`, `role-D`, `role-C`, `role-A`), `card-back` (dorso coperto), `deal` (carte che arrivano una dopo l'altra).

## Componenti

Si importano tutti da `divisa`:

```tsx
import { Toaster, toast, useConfirm, PlayerCard } from "divisa";
```

- **`Toaster`** e **`toast(testo, "ok" | "err")`**: messaggi brevi. Il `Toaster` si monta una volta nel layout. Di default sta sopra una barra in basso alta 84 px sul telefono: se il progetto non ne ha una, passa `className="bottom-6"`.
- **`useConfirm()`**: finestra di conferma nello stile del sito, al posto di quella del browser.

```tsx
const [ask, dialog] = useConfirm();
if (await ask("Chiudere subito le puntate?", { danger: true })) { /* ... */ }
return <>{dialog}…</>;
```

- **`AnimatedNumber`**: numero che scorre fino al valore (`value`, `fromZero`, `duration`).
- **`ScrollReveal`**: fa comparire il contenuto allo scorrimento; con `stagger` i figli arrivano uno dopo l'altro. Per il caso senza JavaScript serve un `<noscript>` con lo stile di base nel layout, come nelle app esistenti.
- **`PasswordInput`**: campo password con l'occhio per vederla. Accetta le stesse props di `<input>`.
- **`SessionProvider`** e **`SignOutButton`**: integrazione con `next-auth`. Il pulsante di uscita porta a `/login`; con `callbackUrl` puoi indicare un'altra pagina.
- **`PlayerCard`**, **`RoleChip`**, **`CardBack`**: carte di atleti per fantacalcio e giochi a carte. Il tipo `Athlete` ha nome, squadra, ruolo (`P`, `D`, `C`, `A`) e prezzo; le etichette dei ruoli sono in `ROLE_NAME`.

## Aggiornare

Quando il design system cambia, nel progetto basta:

```bash
npm update divisa
```

Le modifiche valgono in tutti i progetti che lo usano, quindi conviene cambiarlo solo con una verifica sui progetti principali.

## Sviluppo

```bash
npm install
npm run check
```

`npm run check` controlla i tipi dei componenti.

## Licenza

Non ancora scelta: fino ad allora il codice è di uso privato.
