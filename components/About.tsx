"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { profile, engineeringPractices } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="A full-stack developer who thinks in systems, not just screens"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-base leading-relaxed text-muted sm:text-lg"
          >
            <p>{profile.summary}</p>
            <p>{profile.focusStatement}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Engineering Practices
              </h3>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {engineeringPractices.map((practice) => (
                <li
                  key={practice}
                  className="flex items-start gap-2.5 text-sm leading-snug"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="min-w-0">{practice}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
