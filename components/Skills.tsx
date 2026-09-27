"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { skillCategories } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Stack"
          meta={`${skillCategories.length} modules`}
          title="Everything a product needs, from pixel to server."
          description="The modules I bring to a project. Open one to see what's inside."
        />

        <ul className="mt-14 border-t border-line">
          {skillCategories.map((cat, i) => {
            const isOpen = open === i;
            return (
              <li key={cat.title} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[90px_auto_1fr_auto_auto] sm:gap-6 sm:py-7"
                >
                  <span className={`hidden font-mono text-[11px] transition-colors sm:block ${isOpen ? "text-accent" : "text-subtle"}`}>
                    MOD.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex h-10 w-10 items-center justify-center border transition-colors ${
                      isOpen ? "border-accent bg-accent text-white" : "border-line text-muted group-hover:border-fg group-hover:text-fg"
                    }`}
                  >
                    <cat.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xl font-medium tracking-[-0.03em] sm:text-3xl">{cat.title}</span>
                  </span>
                  <span className="hidden font-mono text-[11px] text-subtle md:block">
                    {cat.items.length} capabilities
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : "text-muted"}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-9 sm:grid-cols-[90px_1fr] sm:gap-6">
                        <span aria-hidden className="hidden sm:block" />
                        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                          <p className="pretty max-w-md text-base leading-relaxed text-muted">{cat.description}</p>
                          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                            {cat.items.map((item, j) => (
                              <li key={item} className="flex items-start gap-3 bg-bg px-4 py-3 text-[14px] leading-snug">
                                <span className="font-mono text-[10px] leading-5 text-accent">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                {item}
                              </li>
                            ))}
                            {cat.items.length % 2 === 1 && (
                              <li aria-hidden className="hidden bg-bg sm:block" />
                            )}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
