"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { CommandMenu, type CommandArticle } from "@/components/CommandMenu";
import { navLinks, profile, sectionIdOf, socialLinks } from "@/lib/data";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const onScroll = () => {
      let current: string | null = null;
      for (const l of navLinks) {
        const id = sectionIdOf(l.href);
        const el = id ? document.getElementById(id) : null;
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);
  return active;
}

export function Navbar({ articles }: { articles: CommandArticle[] }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isMac, setIsMac] = React.useState(true);
  const activeSection = useActiveSection(pathname === "/");

  React.useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) =>
    pathname === "/" ? activeSection === sectionIdOf(href) : href !== "/" && pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <nav aria-label="Main" className="container flex h-14 items-center justify-between gap-6">
          <Logo onClick={() => setOpen(false)} />

          <ul className="hidden items-center lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                      active ? "text-fg" : "text-subtle hover:text-fg"
                    }`}
                  >
                    <span className={active ? "text-accent" : "text-line group-hover:text-subtle"}>{link.code}</span>
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-[11px] h-px bg-accent"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="hidden h-9 items-center gap-3 border border-line pl-3 pr-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-subtle transition-colors hover:border-fg hover:text-fg xl:flex"
              aria-label="Open command menu"
            >
              <Search className="h-3.5 w-3.5" />
              Search
              <kbd className="whitespace-nowrap border border-line px-1.5 py-0.5 text-[10px] normal-case">{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>
            <button type="button" onClick={() => setCmdOpen(true)} className="icon-btn xl:hidden" aria-label="Open search">
              <Search className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <Link href="/#contact" className="btn-accent hidden h-9 px-4 py-0 sm:inline-flex">
              Connect
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="icon-btn lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-14 lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" />
            <ul className="container relative mt-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.04, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="text-4xl font-medium tracking-[-0.04em]">{link.label}</span>
                    <span className="font-mono text-xs text-accent">{link.code}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container relative flex items-center justify-between border-t border-line py-5 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
              <a href={`mailto:${profile.email}`} className="text-fg">
                Email me
              </a>
              <div className="flex gap-4">
                {socialLinks.slice(0, 4).map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandMenu open={cmdOpen} setOpen={setCmdOpen} articles={articles} />
    </>
  );
}
