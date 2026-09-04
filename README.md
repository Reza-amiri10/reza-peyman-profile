# Reza Peyman Amiri — Portfolio

A modern, responsive personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Fully responsive, mobile-first layout
- Light/dark mode toggle (persisted, no flash on load)
- Sections: Hero, About, Skills ("What I Do"), Approach, Currently Focused On, Projects, Articles, Contact
- An Articles section (`/articles`) for publishing your own writing — just add a markdown file, no code changes needed
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

## Publishing articles

To publish a new article, add a markdown file to `content/articles/` — the filename (minus `.md`) becomes the article's URL slug. For example, `content/articles/my-new-post.md` becomes `peymanamiri.com/articles/my-new-post`.

Each file needs frontmatter at the top, followed by the article body in plain markdown:

```md
---
title: "Your Article Title"
excerpt: "A one-to-two sentence summary shown on article cards."
date: "2026-09-04"
tags: ["AI", "Career"]
---

Your article content goes here, written in normal markdown —
headings, paragraphs, lists, \`inline code\`, and fenced code blocks
all work and are styled automatically to match the site.
```

That's the whole workflow — no code changes required:

- The article automatically appears at the top of `/articles` (sorted by `date`, newest first) and in the "Latest Articles" section on the homepage (the 3 most recent).
- Read time is calculated automatically from word count.
- Each article gets its own page, its own URL, and its own SEO metadata (title/description) for sharing.
- Deleting a `.md` file removes the article from the site the next time it's built.

The markdown is rendered with [`marked`](https://marked.js.org/) and styled with the [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) plugin (`prose` classes in `app/articles/[slug]/page.tsx`), so headings, links, code blocks, blockquotes, and lists all pick up the site's fonts, colors, and spacing automatically in both light and dark mode.

## Build for production

```bash
npm run build
npm run start
```

## Deploying

This project deploys cleanly to [Vercel](https://vercel.com) (recommended for Next.js), Netlify, or any Node.js host. For Vercel: push this repo to GitHub and import it at vercel.com/new. A `vercel.json` pinning `"framework": "nextjs"` is included so Vercel always uses the correct build output directory (`.next`), even if a project's dashboard settings were previously misconfigured.

## Getting found in search (SEO)

The site is set up so search engines can find, understand, and display it well — but getting indexed and ranking for your name or terms like "full-stack developer" takes a mix of on-page setup (done) and a few off-site steps only you can do (below). Be wary of anyone promising guaranteed rankings or overnight results — that's not how search engines work, and this is a realistic, honest starting point, not a guarantee.

**What's already in place:**

- `app/sitemap.ts` — an auto-generated `/sitemap.xml` listing every page, including each article, so crawlers can discover everything.
- `app/robots.ts` — a `/robots.txt` that allows all crawlers and points them to the sitemap.
- Structured data (JSON-LD): a `Person` schema on the homepage with your name, role, and verified profile links (GitHub, LinkedIn) — this is what helps Google associate peymanamiri.com with searches for "Reza Peyman Amiri" and can enable rich results. Each article carries `BlogPosting` schema (title, date, author) for the same reason.
- Canonical URLs and proper `robots` meta tags on every page, so search engines index the right version of each URL.
- Auto-generated Open Graph share images (`app/opengraph-image.tsx` and one per article) — when you share a link on LinkedIn, X, Slack, etc., it shows a clean branded preview instead of a blank box.
- Descriptive, keyword-relevant `<title>` and meta descriptions on every page (homepage, articles index, each article).

**What only you can do, once it's deployed:**

1. **Submit to Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)) — add `peymanamiri.com` as a property, verify ownership (Search Console gives you a meta tag; paste it into the commented `verification: { google: "..." }` line in `app/layout.tsx`), then submit `https://peymanamiri.com/sitemap.xml`. This is the single most useful step — it's what actually gets your pages crawled and indexed quickly instead of waiting for Google to stumble onto the site.
2. **Link to it from places that already have authority**: your GitHub profile bio/README, your LinkedIn "Featured" section, your resume, X/Instagram bios once those are real profiles. Search engines weigh a site more when other trusted pages link to it.
3. **Keep publishing articles** relevant to your field — fresh, substantive content on topics like "full-stack development," "AI engineering," etc. is what actually earns rankings for those search terms over time; the technical setup here just makes sure that content gets found and read correctly once it exists.
4. **Update the two placeholder social links** (Twitter/X and Instagram in `lib/data.ts`) to your real profiles, and consider adding them to the `sameAs` array in the `Person` schema in `app/page.tsx` — right now that array only lists GitHub and LinkedIn since those are your verified links.

Expect this to take real time — typically days to a few weeks to get indexed, and longer to rank well for competitive terms — rather than something that happens the moment the site goes live.

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
