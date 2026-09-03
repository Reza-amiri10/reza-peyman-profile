# Reza Peyman Amiri — Portfolio

A modern, responsive personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Fully responsive, mobile-first layout
- Light/dark mode toggle (persisted, no flash on load)
- Sections: Hero, About, Skills ("What I Do"), Approach, Currently Focused On, Projects, Contact
- All content lives in one place: `lib/data.ts` — edit that file to update your info without touching components
- Placeholder project cards ready to be swapped for real case studies
- Clean, accessible, semantic markup with subtle scroll-in animations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Editing content

Almost everything on the site is driven by `lib/data.ts`:

- `profile` — name, role, bio, tagline, email
- `socialLinks` — GitHub, LinkedIn, Twitter/X, Instagram, email
- `skillCategories` — the "What I Do" cards
- `approachItems` / `currentFocus` — the "My Approach" section
- `projects` — the Projects grid (currently placeholder content — replace with real projects, links, and repo URLs)

Update the values there and the whole site updates automatically.

### Social links to double-check

Your Twitter/X (`https://x.com`) and Instagram (`https://www.instagram.com/?hl=en`) links in `lib/data.ts` are currently generic placeholders — replace `href` with your actual profile URLs when you have them.

### Fonts

The site currently uses the OS system font stack (San Francisco / Segoe UI / Roboto, etc.) so the project builds without any external network calls. If you'd like to use Google Fonts like Inter again, reintroduce `next/font/google` in `app/layout.tsx` — it works out of the box on any machine with normal internet access.

### Resume button

The "Resume" button in the Hero section currently links to `#`. Add your resume PDF to `public/` (e.g. `public/resume.pdf`) and update the `href` in `components/Hero.tsx`.

## Build for production

```bash
npm run build
npm run start
```

## Deploying

This project deploys cleanly to [Vercel](https://vercel.com) (recommended for Next.js), Netlify, or any Node.js host. For Vercel: push this repo to GitHub and import it at vercel.com/new — no configuration needed.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [lucide-react](https://lucide.dev/) icons
