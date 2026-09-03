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

This project deploys cleanly to [Vercel](https://vercel.com) (recommended for Next.js), Netlify, or any Node.js host. For Vercel: push this repo to GitHub and import it at vercel.com/new. A `vercel.json` pinning `"framework": "nextjs"` is included so Vercel always uses the correct build output directory (`.next`), even if a project's dashboard settings were previously misconfigured.

## Responsive design notes

This project was audited and hardened for every screen size, from the smallest phones (320px) up through 4K monitors (2560px+), with zero horizontal overflow at any width in between. A few things worth knowing if you extend the design:

- The `.container` class (in `tailwind.config.ts`) has an explicit max-width at every breakpoint, so content stays a comfortable reading width on large monitors instead of stretching edge-to-edge.
- Any element that mixes an icon with text uses `shrink-0` on the icon and `min-w-0` on the text wrapper — this is what lets text wrap or truncate properly inside flex/grid layouts instead of silently pushing the page wider than the viewport.
- The Hero's fake code snippet wraps (`whitespace-pre-wrap break-words`) rather than scrolling horizontally, so it's never a source of page overflow.
- The Contact section's email/LinkedIn buttons show shorter labels below the `xs` (480px) breakpoint to avoid crowding on the smallest phones.
- `html, body { overflow-x: hidden }` in `globals.css` is a safety net — if you add new content later that's wider than expected, it'll get clipped instead of breaking the whole page's layout again.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [lucide-react](https://lucide.dev/) icons
