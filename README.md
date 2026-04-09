# Elevate — Digital Growth Agency Landing Page

Landing page for **Elevate**, a digital marketing agency based in Dubai, UAE. Built as a professional demo/business card website with Calendly booking, WhatsApp contact, and an AI-powered chatbot.

**Live:** [anita-elevate.vercel.app](https://anita-elevate.vercel.app)

---

## Features

- **Calendly Booking** — popup widget on every CTA, integrated with Zoom
- **WhatsApp CTAs** — pre-filled messages on all contact buttons
- **Free Audit Form** — submits via WhatsApp with business name
- **AI Chatbot** — powered by Google Gemini, answers questions 24/7
- **Fully Responsive** — mobile-first design with dark theme
- **SEO Ready** — meta description, Open Graph tags, SVG favicon

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS 4, Plus Jakarta Sans |
| Animations | Motion (Framer Motion fork) |
| Icons | Lucide React |
| Backend | Express 4 (dev) / Vercel Serverless (prod) |
| AI | Google Gemini 2.0 Flash |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 22+
- A [Gemini API key](https://aistudio.google.com/app/apikey)
- A [Calendly](https://calendly.com) account

### Installation

```bash
git clone https://github.com/Trilokx/Anita-SaaS.git
cd Anita-SaaS
npm install
```

### Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
GEMINI_API_KEY=your_gemini_api_key

VITE_WHATSAPP_NUMBER=31612345678
VITE_CALENDLY_URL=https://calendly.com/your-name/30min
```

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key (server-side, for the chatbot) |
| `VITE_WHATSAPP_NUMBER` | WhatsApp Business number without `+` or spaces |
| `VITE_CALENDLY_URL` | Your Calendly event URL |

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
Anita-SaaS/
├── src/
│   ├── App.tsx          # Entire landing page (single-page app)
│   └── index.css        # Tailwind theme + brand colors
├── api/
│   └── chat.ts          # Vercel serverless function (Gemini chatbot)
├── server.ts            # Express dev server (Vite middleware + API)
├── index.html           # HTML entry point + Calendly scripts
├── vercel.json          # Vercel build config
└── .env.example         # Environment variable template
```

---

## Deployment (Vercel)

### One-time setup

```bash
npx vercel --prod
```

Set environment variables via CLI (use `printf` to avoid trailing newlines):

```bash
printf '%s' 'your_gemini_key'            | npx vercel env add GEMINI_API_KEY production --force
printf '%s' '31612345678'                | npx vercel env add VITE_WHATSAPP_NUMBER production --force
printf '%s' 'https://calendly.com/you/30min' | npx vercel env add VITE_CALENDLY_URL production --force
```

Then redeploy to bake the `VITE_` vars into the build:

```bash
npx vercel --prod --yes
```

### Subsequent deploys

Push to `main` — Vercel auto-deploys via GitHub integration.

---

## Customisation

All contact config is at the top of `src/App.tsx`:

```ts
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '31612345678';
const CALENDLY_URL    = import.meta.env.VITE_CALENDLY_URL    || 'https://calendly.com/anita-elevate/consult';
```

Brand color is defined in `src/index.css`:

```css
@theme {
  --color-brand:      #B2FF05;   /* electric lime */
  --color-brand-dark: #9DDF00;
}
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on http://localhost:3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | TypeScript type check |

---

## License

Private — all rights reserved by Elevate.
