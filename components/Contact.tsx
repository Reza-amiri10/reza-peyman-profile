"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile, socialLinks } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

const LINES = [
  { t: "$ connect --to reza", c: "text-fg" },
  { t: "› resolving peymanamiri.com … ok", c: "text-subtle" },
  { t: "› handshake … ok", c: "text-subtle" },
  { t: "› connection open. pick a channel:", c: "text-accent-teal" },
];

export function Contact() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = socialLinks.filter((s) => !s.href.startsWith("mailto:"));

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          meta="port open"
          title={
            <>
              Have an idea? Let&apos;s build the <span className="text-signal">system</span> behind it.
            </>
          }
          description="Web application, mobile product, backend system or AI-powered tool — I'm always up for challenging problems and meaningful projects."
        />

        <div ref={ref} className="reg-marks mt-14 border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-line" />
              <span className="h-2.5 w-2.5 rounded-full border border-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </div>
            <span className="font-mono text-[11px] text-subtle">~/connect — zsh</span>
            <span className="w-10" />
          </div>

          <div className="p-5 font-mono text-[13px] leading-7 sm:p-8">
            {LINES.map((l, i) => (
              <motion.p
                key={l.t}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.35, duration: 0.2 }}
                className={l.c}
              >
                {l.t}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + LINES.length * 0.35, duration: 0.5 }}
              className="mt-8"
            >
              {/* primary channel: email */}
              <div className="flex flex-col gap-4 border-y border-line py-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-accent">Email · primary</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-2 block break-all font-sans text-2xl font-medium tracking-[-0.03em] text-fg transition-colors hover:text-accent sm:text-4xl lg:text-5xl"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={copy} className="btn-ghost" aria-label="Copy email address">
                    {copied ? <Check className="h-3.5 w-3.5 text-accent-teal" /> : <Copy className="h-3.5 w-3.5" />}
                    <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <a href={`mailto:${profile.email}`} className="btn-accent">
                    Send
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* other channels */}
              <ul className="mt-2">
                {channels.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-line py-3.5 last:border-b-0 sm:grid-cols-[28px_160px_1fr_auto]"
                    >
                      <s.icon className="h-4 w-4 text-subtle transition-colors group-hover:text-accent" />
                      <span className="uppercase tracking-[0.12em] text-fg">{s.label}</span>
                      <span className="hidden truncate text-subtle sm:block">{s.handle}</span>
                      <ArrowUpRight className="h-4 w-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-subtle">
                $ <span className="inline-block h-4 w-2 translate-y-[3px] animate-blink bg-accent" />
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
