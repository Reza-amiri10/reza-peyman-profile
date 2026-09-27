"use client";

import * as React from "react";
import type { TocItem } from "@/lib/articles";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState<string | null>(items[0]?.id ?? null);

  React.useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 text-[13px] leading-snug transition-colors ${
                  item.level === 3 ? "pl-7" : "pl-4"
                } ${
                  isActive
                    ? "border-accent font-medium text-fg"
                    : "border-transparent text-subtle hover:border-fg/30 hover:text-muted"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
