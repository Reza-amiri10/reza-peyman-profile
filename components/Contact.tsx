"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile, socialLinks } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-elevated px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80"
          />
          <div className="relative">
            <p className="section-eyebrow">Let&apos;s Build Something</p>
            <h2 className="section-heading balance mx-auto mt-4 max-w-2xl">
              Have a project, product, or idea? Let&apos;s turn it into
              something real.
            </h2>
            <p className="balance mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Whether you&apos;re looking for a developer to build a web
              application, mobile product, backend system, or AI-powered
              solution, I&apos;m always interested in challenging technical
              problems and meaningful projects.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="hidden xs:inline">{profile.email}</span>
                <span className="xs:hidden">Email Me</span>
              </a>
              <a
                href="https://www.linkedin.com/in/reza-peyman-amiri-4362b8335/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <span className="hidden xs:inline">Connect on LinkedIn</span>
                <span className="xs:hidden">LinkedIn</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-2 rounded-full border border-border bg-elevated px-4 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
