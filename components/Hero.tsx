"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Download } from "lucide-react";
import { profile } from "@/lib/data";
import { SystemDiagram } from "@/components/SystemDiagram";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.pop();
  const middle = rest.join(" ");

  const spec = [
    ["Role", profile.role],
    ["Study", "Computer Science"],
    ["Based in", profile.basedIn],
    ["Builds", "Web · Mobile · AI"],
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-blueprint mask-radial"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="container">
        {/* meta row */}
        <motion.div
          {...fade(0)}
          className="flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle"
        >
          <span>
            Portfolio <span className="text-line">/</span> Rev.{" "}
            {new Date().getFullYear()}
          </span>
          <a
            href="#contact"
            className="group flex items-center gap-2 text-fg transition-colors hover:text-accent"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-teal" />
            </span>
            Building products • Exploring ideas • Collaborating with great teams
          </a>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_300px] lg:items-end">
          <h1 className="text-[17vw] font-medium leading-[0.86] tracking-[-0.065em] sm:text-[13vw] lg:text-[9.5rem] xl:text-[10.5rem]">
            <span className="sr-only">
              {profile.name} — {profile.role}
            </span>
            <span aria-hidden>
              <Line delay={0.1}>{first}</Line>
              <Line delay={0.18}>
                <span className="text-muted/60">{middle}</span>
              </Line>
              <Line delay={0.26}>
                {last}
                <span className="text-accent">.</span>
              </Line>
            </span>
          </h1>

          <motion.dl
            {...fade(0.5)}
            className="border-t border-line font-mono text-[12px]"
          >
            {spec.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
              >
                <dt className="uppercase tracking-[0.12em] text-subtle">{k}</dt>
                <dd className="text-right text-fg">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            {...fade(0.6)}
            className="balance max-w-3xl text-2xl font-normal leading-[1.2] tracking-[-0.025em] text-muted sm:text-[2rem]"
          >
            I build software{" "}
            <span className="text-fg">from interface to infrastructure</span> —
            web, mobile and AI products engineered as{" "}
            <span className="text-fg underline decoration-accent decoration-2 underline-offset-[6px]">
              whole systems
            </span>
            , not just screens.
          </motion.p>

          <motion.div {...fade(0.7)} className="flex flex-wrap gap-2">
            <a href="#projects" className="btn-primary group">
              View the work
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn-ghost">
              Open a connection
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn-ghost" download>
                <Download className="h-3.5 w-3.5" />
                Résumé
              </a>
            )}
          </motion.div>
        </div>

        <motion.div {...fade(0.85)} className="mt-14 sm:mt-20">
          <div className="mb-3 flex items-end justify-between">
            <p className="mono-label">
              <span className="text-accent">FIG. 01</span> — How I think about a
              product
            </p>
            <p className="mono-label hidden items-center gap-1.5 sm:flex">
              Hover a node <ArrowDownRight className="h-3 w-3" />
            </p>
          </div>
          <SystemDiagram />
        </motion.div>
      </div>
    </section>
  );
}
