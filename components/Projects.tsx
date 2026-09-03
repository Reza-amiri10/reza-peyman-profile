"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Projects() {
  return (
    <section
      id="projects"
      className="section-padding border-t border-border bg-elevated/40"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects & product builds"
          description="A snapshot of the kind of work I build — placeholders here, ready to be swapped for real case studies and links."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className={`card group relative flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 hover:border-accent/40 sm:p-7 ${
                project.featured ? "sm:col-span-2" : ""
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="chip gap-1 border-accent/30 bg-accent/10 text-accent">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all group-hover:border-accent/50 group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>

              {project.repo && (
                <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-muted">
                  <Github className="h-3.5 w-3.5" />
                  View source
                </div>
              )}
            </motion.a>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          More projects and detailed case studies coming soon — in the
          meantime, check out{" "}
          <a
            href="https://github.com/Reza-amiri10"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            my GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
