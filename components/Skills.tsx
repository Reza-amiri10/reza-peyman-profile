"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding border-t border-border bg-elevated/40"
    >
      <div className="container">
        <SectionHeading
          eyebrow="What I Do"
          title="A full toolkit for shipping complete products"
          description="From the interface a user touches to the infrastructure running behind it — here's what I bring to a project."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="card group p-6 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <cat.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{cat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {cat.description}
              </p>
              <ul className="mt-4 space-y-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
