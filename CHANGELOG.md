# Changelog

All notable changes to this project are documented here.

---

## [1.3.0] — 2026-04-09

### Added
- Full project documentation in `README.md`
- `CHANGELOG.md` (this file)

### Changed
- Footer location updated to **Dubai, UAE**
- Placeholder email (`hello@elevatedigital.com`) removed from footer and chatbot
- Chatbot quick-link "Email" button replaced with **"Book a Call"** (Calendly)

---

## [1.2.0] — 2026-04-08

### Added
- **Vercel deployment** — `vercel.json` build config + `api/chat.ts` serverless function
- `@vercel/node` devDependency for TypeScript types
- Node.js engine pinned to `22.x` in `package.json` (Vercel compatibility)

### Fixed
- Production build verified clean (`npm run build` ✓)

---

## [1.1.0] — 2026-04-08

### Added
- **Calendly popup widget** — script tags in `index.html`, `openCalendly()` helper in `App.tsx`
- **WhatsApp CTAs** — `openWhatsApp()` helper with pre-filled messages per button
- **Free Audit form** — submits via WhatsApp redirect with business name in message
- `VITE_WHATSAPP_NUMBER` and `VITE_CALENDLY_URL` env vars in `.env.example`
- `window.Calendly` TypeScript declaration
- `Calendar` icon added to lucide-react imports

### Changed
- "Get Started" + "Log in" in navbar → **"Book a Call"** button (Calendly)
- Mobile menu: Log in removed, added WhatsApp button
- Hero CTAs: "Talk to an Expert" → **"Book a Free Call"** (Calendly), "Watch Video" → **"WhatsApp Us"**
- Pricing mockup: "Consult" → Calendly, "Request" → WhatsApp, arrow button → Calendly
- Chatbot WhatsApp quick-link upgraded with pre-filled message

### Fixed
- `vite/client` types added to `tsconfig.json` for `import.meta.env` support

---

## [1.0.1] — 2026-04-08

### Fixed
- Broken nav anchor `#pricing` → changed to `#how-it-works` (no matching section existed)
- Footer service links: dead `href="#"` → `href="#features"`
- Hero subheading: "tools designed" → **"expert strategies designed"** (agency, not SaaS)
- Features section badge: "Features" → **"Our Services"**
- Features heading: "tools designed" → **"expertise designed"**
- Audit section copy: false promise of "report in 24h" → accurate WhatsApp flow description

### Added
- `<meta name="description">` for SEO
- Open Graph tags (`og:title`, `og:description`, `og:type`)
- Twitter card meta tag
- SVG favicon using brand color (`#B2FF05`)
- Page title updated: "My Google AI Studio App" → **"Elevate — Smarter Digital Growth for SMEs"**

---

## [1.0.0] — 2026-04-08

### Added
- Initial landing page built with React 19, TypeScript, Vite, Tailwind CSS 4
- Dark theme with brand color `#B2FF05` (electric lime)
- Sections: Navigation, Hero, Features, How it Works / Pricing, Free Audit, Footer
- Animated hero with floating UI mockup cards (Motion/Framer Motion)
- AI chatbot widget powered by **Google Gemini** via Express backend
- Mobile-responsive layout with hamburger menu
- WhatsApp and email links in footer and chatbot widget
- Plus Jakarta Sans font via Google Fonts
