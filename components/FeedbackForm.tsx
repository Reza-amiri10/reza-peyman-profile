"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { feedbackKinds, type FeedbackKind } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border border-line bg-bg px-3.5 py-3 text-[15px] text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
      <span className="text-fg">{children}</span>
      {optional && <span>optional</span>}
    </label>
  );
}

export function FeedbackForm({ enabled }: { enabled: boolean }) {
  const [kind, setKind] = React.useState<FeedbackKind>("client");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  const [len, setLen] = React.useState(0);
  const startedAt = React.useRef(Date.now());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name: fd.get("name"),
          role: fd.get("role"),
          project: fd.get("project"),
          message: fd.get("message"),
          link: fd.get("link"),
          website: fd.get("website"),
          consent: fd.get("consent") === "on",
          startedAt: startedAt.current,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      setLen(0);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="reg-marks border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="mono-label text-fg">New report</span>
        <span className="mono-label">reviewed before publishing</span>
      </div>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6 sm:p-8"
          >
            <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-accent-teal">
              <Check className="h-4 w-4" /> 202 · accepted
            </p>
            <h3 className="mt-5 text-3xl font-medium tracking-[-0.035em]">Thank you — received.</h3>
            <p className="pretty mt-3 max-w-md leading-relaxed text-muted">
              Your feedback is in the review queue and will appear here once I&apos;ve approved it. I
              really appreciate you taking the time.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-8">
              Write another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-6 p-5 sm:p-8"
          >
            <fieldset>
              <legend className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg">
                How did we work together?
              </legend>
              <div role="radiogroup" className="grid gap-px border border-line bg-line sm:grid-cols-3">
                {feedbackKinds.map((k) => {
                  const on = kind === k.id;
                  return (
                    <button
                      key={k.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setKind(k.id)}
                      className={`px-4 py-3 text-left transition-colors ${on ? "bg-fg text-bg" : "bg-bg hover:bg-surface"}`}
                    >
                      <span className={`block font-mono text-[10px] tracking-[0.12em] ${on ? "text-accent" : "text-subtle"}`}>
                        {k.code}
                      </span>
                      <span className="mt-1 block text-sm font-medium">{k.label}</span>
                      <span className={`mt-0.5 block text-xs ${on ? "text-bg/60" : "text-subtle"}`}>{k.hint}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="fb-name">Your name</Label>
                <input id="fb-name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} placeholder="Jane Doe" />
              </div>
              <div>
                <Label htmlFor="fb-role" optional>Role & company</Label>
                <input id="fb-role" name="role" maxLength={100} autoComplete="organization-title" className={field} placeholder="CTO at Acme" />
              </div>
              <div>
                <Label htmlFor="fb-project" optional>Project or problem</Label>
                <input id="fb-project" name="project" maxLength={100} className={field} placeholder="Checkout redesign" />
              </div>
              <div>
                <Label htmlFor="fb-link" optional>LinkedIn or website</Label>
                <input id="fb-link" name="link" type="url" inputMode="url" maxLength={200} className={field} placeholder="https://linkedin.com/in/…" />
              </div>
            </div>

            <div>
              <Label htmlFor="fb-message">Your feedback</Label>
              <textarea
                id="fb-message"
                name="message"
                required
                minLength={20}
                maxLength={1200}
                rows={5}
                onChange={(e) => setLen(e.target.value.length)}
                className={`${field} resize-y leading-relaxed`}
                placeholder="What was it like working with Reza? What did he build or fix, and what changed afterwards?"
              />
              <p className="mt-1.5 text-right font-mono text-[10px] text-subtle">{len}/1200</p>
            </div>

            {/* honeypot — hidden from people, tempting for bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
              <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--accent))]" />
              <span>
                I&apos;m happy for this to be published on this site with my name and role. Reza reviews
                every entry before it goes live.
              </span>
            </label>

            {status === "error" && (
              <p role="alert" className="border-l-2 border-accent bg-accent/5 px-4 py-3 text-sm text-fg">
                {error}
              </p>
            )}
            {!enabled && (
              <p className="border-l-2 border-line px-4 py-2 text-sm text-muted">
                Submissions open soon — until then, feel free to email me your feedback.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <p className="font-mono text-[11px] text-subtle">Your email is never asked for or shown.</p>
              <button type="submit" disabled={status === "sending" || !enabled} className="btn-accent group">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    Submit feedback
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
