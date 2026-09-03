"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { profile, socialLinks } from "@/lib/data";

const stats = [
  { label: "Full-stack focus", value: "Web · Mobile · AI" },
  { label: "Core stack", value: "React / Next.js / Node" },
  { label: "Status", value: "Open to opportunities" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-light bg-grid opacity-40 mask-fade-bottom dark:bg-grid-dark"
      />

      <div className="container relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-elevated px-4 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="min-w-0">{profile.location}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-accent to-accent-teal bg-clip-text text-transparent">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg font-medium text-muted sm:text-xl"
          >
            {profile.role} · {profile.subrole}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="balance mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
            <a href="#" className="btn-secondary">
              <Download className="h-4 w-4" />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-elevated text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full min-w-0 max-w-md"
        >
          <div className="animate-float">
            <div className="card overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 font-mono text-xs text-muted">
                  profile.ts
                </span>
              </div>
              <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words px-4 py-5 font-mono text-[12px] leading-relaxed sm:px-5 sm:text-[13px]">
                <code className="break-words">
                  <span className="text-accent-teal">const</span>{" "}
                  <span className="text-accent-light">developer</span> = {"{"}
                  {"\n"}
                  {"  "}name:{" "}
                  <span className="text-emerald-400">{`"Reza Peyman Amiri"`}</span>
                  ,{"\n"}
                  {"  "}role:{" "}
                  <span className="text-emerald-400">{`"Full-Stack Developer"`}</span>
                  ,{"\n"}
                  {"  "}stack: [
                  <span className="text-emerald-400">{`"Next.js"`}</span>,{" "}
                  <span className="text-emerald-400">{`"Node"`}</span>,{" "}
                  <span className="text-emerald-400">{`"React Native"`}</span>
                  ],{"\n"}
                  {"  "}focus: [
                  <span className="text-emerald-400">{`"Web"`}</span>,{" "}
                  <span className="text-emerald-400">{`"Mobile"`}</span>,{" "}
                  <span className="text-emerald-400">{`"AI"`}</span>],{"\n"}
                  {"  "}shipsProduction:{" "}
                  <span className="text-accent-light">true</span>,{"\n"}
                  {"}"};
                </code>
              </pre>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="card px-4 py-3 text-center sm:text-left"
              >
                <p className="text-[11px] uppercase tracking-wide text-muted">
                  {s.label}
                </p>
                <p className="mt-1 text-sm font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
