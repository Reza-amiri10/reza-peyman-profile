import { navLinks, profile, socialLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-mono text-sm font-semibold">
            <span className="text-accent">{"<"}</span>
            Reza.dev
            <span className="text-accent">{" />"}</span>
          </p>
          <p className="mt-1 text-xs text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[rgb(var(--fg))]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.slice(0, 4).map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={s.label}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <s.icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
