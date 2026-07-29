# Bcrypt Generator — Online Hash Generator & Checker

A free, fast, and privacy-first **online bcrypt hash generator and password verifier** built with **Next.js 15+**, **Tailwind CSS v4**, and **bcryptjs**.

Everything runs 100% in your browser — no passwords or hashes are ever sent to a server.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Generate Bcrypt Hash** | Customizable cost factor (rounds 4–15), show/hide password |
| **Verify Password** | Compare plain text against any bcrypt hash |
| **Password Strength Meter** | Live indicator: Very Weak → Very Strong |
| **Hash Information** | Parsed version, rounds, salt, and length |
| **Hash History** | Last 10 hashes stored in `localStorage` |
| **Toast Notifications** | Instant feedback for copy/generate/verify/delete |
| **FAQ Section** | Accessible accordion answering common bcrypt questions |
| **SEO Ready** | Full metadata, Open Graph, sitemap.xml, robots.txt |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Project Structure

```
bcrypt-generator/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout — metadata, Inter font, ToastProvider
│   │   ├── page.js            # Home page (hero + all sections)
│   │   ├── globals.css        # Tailwind v4 + custom animations
│   │   ├── sitemap.js         # Auto-generates /sitemap.xml
│   │   └── robots.js          # Auto-generates /robots.txt
│   │
│   ├── components/
│   │   ├── Header.js          # Sticky glassmorphism header
│   │   ├── Footer.js          # Footer with links
│   │   ├── Generator.js       # Bcrypt hash generation card
│   │   ├── Verifier.js        # Password verification card
│   │   ├── StrengthMeter.js   # Live password strength bar
│   │   ├── HashInfo.js        # Parsed hash metadata panel
│   │   ├── History.js         # localStorage hash history
│   │   ├── Toast.js           # Global toast notification system
│   │   └── FAQ.js             # Accordion FAQ (native details/summary)
│   │
│   └── utils/
│       ├── bcrypt.js           # generateHash / verifyHash wrappers
│       ├── hashInfo.js         # Bcrypt hash string parser
│       ├── passwordStrength.js # Strength score calculator
│       └── storage.js          # localStorage helpers
│
├── package.json
└── README.md
```

---

## 🔧 Tech Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, React 19
- **[Tailwind CSS v4](https://tailwindcss.com/)** — `@import "tailwindcss"` syntax
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** — Pure JS bcrypt (no native bindings needed)
- **[Google Fonts — Inter](https://fonts.google.com/specimen/Inter)** — Via `next/font/google`

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment

Deploy to [Vercel](https://vercel.com) with zero config:

```bash
npx vercel
```

Or any platform supporting Next.js (Netlify, AWS Amplify, Render, Railway, etc.).

Before deploying, update the `baseUrl` in:
- `src/app/sitemap.js`
- `src/app/robots.js`
- `src/app/layout.js` (alternates.canonical and openGraph.url)

---

## 🔒 Privacy

- **No server-side password processing** — bcryptjs runs entirely in the browser
- **No analytics or tracking** — zero third-party scripts
- **No account needed** — completely anonymous
- **History is local** — stored only in your browser's `localStorage`

---

## ♿ Accessibility

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels, `aria-live` regions, and `role` attributes
- Keyboard navigation — all interactive elements focusable
- Native `<details>/<summary>` FAQ — no JavaScript required
- High color contrast throughout

---

## 📄 License

MIT License — free to use, modify, and distribute.
