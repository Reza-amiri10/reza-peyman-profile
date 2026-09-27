"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  CornerDownLeft,
  FileText,
  Hash,
  Moon,
  Search,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { navLinks, profile, socialLinks } from "@/lib/data";

export type CommandArticle = { slug: string; title: string };

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
  keepOpen?: boolean;
};

export function CommandMenu({
  open,
  setOpen,
  articles,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  articles: CommandArticle[];
}) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const items = React.useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...navLinks.map((l) => ({
        id: `nav-${l.href}`,
        group: "Navigate",
        label: l.label,
        icon: Hash,
        run: go(l.href),
      })),
      ...articles.map((a) => ({
        id: `article-${a.slug}`,
        group: "Articles",
        label: a.title,
        icon: FileText,
        run: go(`/articles/${a.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: copied ? "Email copied!" : "Copy email address",
        hint: profile.email,
        icon: copied ? Check : Copy,
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        keepOpen: true,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      ...socialLinks.map((s) => ({
        id: `social-${s.label}`,
        group: "Connect",
        label: s.label,
        hint: s.handle,
        icon: s.icon,
        run: () => window.open(s.href, s.href.startsWith("http") ? "_blank" : "_self"),
      })),
    ];
  }, [articles, copied, resolvedTheme, router, setTheme]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  React.useEffect(() => setActive(0), [query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const select = (item?: Item) => {
    if (!item) return;
    item.run();
    if (!item.keepOpen) setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden border border-line bg-surface shadow-2xl"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, articles, links…"
                className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-subtle"
                aria-label="Search"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={filtered[active]?.id}
              />
              <kbd className="hidden border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:block">
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              id="command-list"
              role="listbox"
              className="max-h-[55vh] overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-muted">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup;
                lastGroup = item.group;
                const isActive = i === active;
                return (
                  <React.Fragment key={item.id}>
                    {header && (
                      <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                        {item.group}
                      </p>
                    )}
                    <button
                      id={item.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => select(item)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-accent/10 text-fg" : "text-muted"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 shrink-0 ${isActive ? "text-accent" : "text-subtle"}`}
                      />
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {item.hint && (
                        <span className="hidden truncate text-xs text-subtle sm:block">
                          {item.hint}
                        </span>
                      )}
                      {isActive &&
                        (item.keepOpen ? (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-subtle" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-subtle" />
                        ))}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-subtle">
              <span className="flex items-center gap-3">
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> select
                </span>
              </span>
              <span className="font-mono">peymanamiri.com</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
