import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navLinks, profile, socialLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line pb-12 md:pb-20">
      <div className="container pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mono-label text-fg">End of document</p>
            <p className="pretty mt-4 max-w-sm text-sm leading-relaxed text-muted">{profile.tagline}</p>
          </div>
          <div>
            <p className="mono-label">Index</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-fg">
                    <span className="font-mono text-[11px] text-subtle group-hover:text-accent">{link.code}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono-label">Channels</p>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div aria-hidden className="mt-16 select-none border-y border-line">
        <svg viewBox="0 0 1200 150" className="block w-full">
          <text
            x="600"
            y="122"
            textAnchor="middle"
            textLength="1180"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-geist-sans)"
            fontWeight="500"
            fontSize="150"
            letterSpacing="-8"
            fill="none"
            stroke="rgb(var(--fg))"
            strokeOpacity="0.22"
            strokeWidth="1"
          >
            REZA PEYMAN AMIRI
          </text>
        </svg>
      </div>

      <div className="container mt-6 flex flex-col-reverse items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle sm:flex-row sm:items-center">
        <p>
          © {year} {profile.name} <span className="text-line">/</span> Built with Next.js
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
          Back to top
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
