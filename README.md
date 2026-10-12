# Divisa

**English** · [Italiano](#italiano)

A small design system for sports and games websites: palette, fonts, buttons, badges, cards and React components, for Next.js and Tailwind CSS 3. It started in the Fantabanco and Pokerasta projects.

[Live example page](example/index.html) · MIT license

## English

### Install

```bash
npm install github:Ikengogames/divisa
```

Requires React 18.3+ and Tailwind CSS 3. `next-auth` is needed only for `SessionProvider` and `SignOutButton`.

### Set up (Next.js)

1. `next.config.ts` — the package is shipped as TypeScript, so Next must compile it:

```ts
const nextConfig = { transpilePackages: ["divisa"] };
export default nextConfig;
```

2. `tailwind.config.ts` — the preset adds the palette and fonts, and Tailwind must also read the package components:

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

3. `src/app/globals.css` — import the styles before the Tailwind directives. `games.css` is only for projects with tables and cards:

```css
@import "divisa/styles.css";
@import "divisa/games.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. `src/app/layout.tsx` — define three font variables with `next/font`:

```tsx
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

### What is inside

| Area | Contents |
| --- | --- |
| Palette | `night`, `paper`, `panel`, `ink`, `line`, `cream`, `muted`, `muted2`, `lime`, `lime2`, `green`, `red`, `amber`, `cyan` |
| Buttons | `btn`, `btn-ghost`, `odds-btn` (use `aria-pressed`) |
| Surfaces | `card`, `card-hover` |
| Forms | `field`, `label` |
| Badges | `badge` + `badge-lime`, `-green`, `-red`, `-amber`, `-cyan`, `-muted` |
| Roles | `role-P`, `role-D`, `role-C`, `role-A` with `role-chip` or `role-bar` |
| Motion | `page-in`, `stagger`, `reveal`, `live-dot`, `bump`, `timer-hot` |
| Games (`games.css`) | `felt` (table), `pcard` (card), `card-back`, `deal` |

React components, imported from `divisa`:

| Component | What it does |
| --- | --- |
| `Badge` | Coloured label: `<Badge tone="green">Open</Badge>` |
| `RoleChip`, `PlayerCard`, `CardBack` | Role badge and cards for athletes |
| `Toaster`, `toast()` | Short messages; mount `<Toaster />` once in the layout |
| `useConfirm()` | Confirmation dialog in the site style |
| `PasswordInput` | Password field with a show/hide button |
| `ScrollReveal` | Content that appears while scrolling |
| `AnimatedNumber` | Number that counts up to a value |
| `SessionProvider`, `SignOutButton` | `next-auth` helpers |

### Update

```bash
npm update divisa
```

### Develop

```bash
npm install
npm run check     # type check
npm run example   # rebuild example/out.css
```

## Italiano

Un piccolo design system per siti di sport e giochi: palette, caratteri, bottoni, badge, carte e componenti React, per Next.js e Tailwind CSS 3. Nasce dai progetti Fantabanco e Pokerasta.

[Pagina di esempio](example/index.html) · Licenza MIT

### Installazione

```bash
npm install github:Ikengogames/divisa
```

Servono React 18.3 o superiore e Tailwind CSS 3. `next-auth` serve solo per `SessionProvider` e `SignOutButton`.

### Configurazione (Next.js)

I quattro passaggi sono quelli della sezione inglese qui sopra, con gli stessi file:

1. **`next.config.ts`**: aggiungi `transpilePackages: ["divisa"]`, perché il pacchetto è in TypeScript e va compilato con l'app.
2. **`tailwind.config.ts`**: usa `presets: [divisa]` e aggiungi `./node_modules/divisa/src/**/*.{ts,tsx}` ai `content`, così Tailwind genera anche le classi dei componenti.
3. **`src/app/globals.css`**: importa `divisa/styles.css` (e `divisa/games.css` per tavolo e carte) prima delle direttive `@tailwind`.
4. **`src/app/layout.tsx`**: definisci con `next/font` le variabili `--font-display`, `--font-body` e `--font-mono`.

### Cosa c'è dentro

| Area | Contenuto |
| --- | --- |
| Palette | `night`, `paper`, `panel`, `ink`, `line`, `cream`, `muted`, `muted2`, `lime`, `lime2`, `green`, `red`, `amber`, `cyan` |
| Bottoni | `btn`, `btn-ghost`, `odds-btn` (con `aria-pressed`) |
| Superfici | `card`, `card-hover` |
| Moduli | `field`, `label` |
| Badge | `badge` con `badge-lime`, `-green`, `-red`, `-amber`, `-cyan`, `-muted` |
| Ruoli | `role-P`, `role-D`, `role-C`, `role-A` con `role-chip` o `role-bar` |
| Movimento | `page-in`, `stagger`, `reveal`, `live-dot`, `bump`, `timer-hot` |
| Giochi (`games.css`) | `felt` (tavolo), `pcard` (carta), `card-back`, `deal` |

| Componente | Cosa fa |
| --- | --- |
| `Badge` | Etichetta colorata: `<Badge tone="green">Aperto</Badge>` |
| `RoleChip`, `PlayerCard`, `CardBack` | Badge di ruolo e carte di atleti |
| `Toaster`, `toast()` | Messaggi brevi; monta `<Toaster />` una volta nel layout |
| `useConfirm()` | Finestra di conferma nello stile del sito |
| `PasswordInput` | Campo password con l'occhio |
| `ScrollReveal` | Contenuto che compare allo scorrimento |
| `AnimatedNumber` | Numero che scorre fino al valore |
| `SessionProvider`, `SignOutButton` | Strumenti per `next-auth` |

### Aggiornamento

```bash
npm update divisa
```

### Sviluppo

```bash
npm install
npm run check     # controllo dei tipi
npm run example   # ricompila example/out.css
```

## License / Licenza

[MIT](LICENSE) © 2026 Ikengogames
