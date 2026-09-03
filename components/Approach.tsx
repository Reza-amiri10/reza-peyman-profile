"use client";

import { motion } from "framer-motion";
import { Target, BookOpen, Layers, Bot, CheckCircle2 } from "lucide-react";
import { approachItems, currentFocus } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

const icons = [Target, BookOpen, Layers, Bot];

export function Approach() {
  return (
    <section
      id="approach"
      className="section-padding border-t border-border"
    >
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="My Approach" title="How I think about building software" />

            <div className="mt-10 space-y-6">
              {approachItems.map((item, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="card h-fit p-6 sm:p-8 lg:sticky lg:top-28"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Currently Focused On
            </h3>
            <ul className="mt-5 space-y-4">
              {currentFocus.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
