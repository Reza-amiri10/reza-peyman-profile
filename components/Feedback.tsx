import { ArrowUpRight, MessageSquareQuote } from "lucide-react";
import { feedbackKinds } from "@/lib/data";
import { feedbackEnabled, getApprovedFeedback, type Feedback as Entry } from "@/lib/feedback";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FeedbackForm } from "@/components/FeedbackForm";

function fmtDate(ts: number) {
  return new Date(ts).toISOString().slice(0, 10);
}

function EntryCard({ entry, index }: { entry: Entry; index: number }) {
  const kind = feedbackKinds.find((k) => k.id === entry.kind);
  return (
    <li className="group border-b border-line py-8 last:border-b-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em]">
        <span className="text-accent">FB/{String(index).padStart(3, "0")}</span>
        {kind && <span className="border border-line px-1.5 py-px text-muted">{kind.code}</span>}
        <span className="text-subtle">{fmtDate(entry.createdAt)}</span>
      </div>
      <blockquote className="pretty mt-5 whitespace-pre-line text-lg leading-[1.55] tracking-[-0.01em] text-fg sm:text-xl">
        <span className="mr-1 text-accent">“</span>
        {entry.message}
        <span className="ml-0.5 text-accent">”</span>
      </blockquote>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-line font-mono text-[11px] uppercase">
            {entry.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <p className="text-sm font-medium">
              {entry.link ? (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow ugc"
                  className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                >
                  {entry.name}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                entry.name
              )}
            </p>
            {entry.role && <p className="text-xs text-muted">{entry.role}</p>}
          </div>
        </div>
        {entry.project && (
          <p className="font-mono text-[11px] text-subtle">
            <span className="uppercase tracking-[0.12em]">Re:</span> <span className="text-fg/80">{entry.project}</span>
          </p>
        )}
      </div>
    </li>
  );
}

export async function Feedback() {
  const entries = await getApprovedFeedback();

  return (
    <section id="feedback" className="section">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Feedback"
          meta={`${String(entries.length).padStart(2, "0")} signals received`}
          title={
            <>
              Signals from the people I&apos;ve <span className="text-signal">built with</span>.
            </>
          }
          description="Worked with me, hired me, or had a problem I solved? I'd love to hear how it went — every entry is reviewed before it appears here."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <Reveal>
            {entries.length > 0 ? (
              <ul className="border-t border-line">
                {entries.map((e, i) => (
                  <EntryCard key={e.id} entry={e} index={entries.length - i} />
                ))}
              </ul>
            ) : (
              <div className="flex h-full min-h-[320px] flex-col justify-between border border-dashed border-line p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="mono-label">Log</span>
                  <span className="mono-label">0 entries</span>
                </div>
                <div>
                  <MessageSquareQuote className="h-7 w-7 text-accent" strokeWidth={1.5} />
                  <p className="mt-5 text-2xl font-medium tracking-[-0.03em]">No signals yet.</p>
                  <p className="pretty mt-2 max-w-sm text-muted">
                    If we&apos;ve worked together, you could be the first entry in this log.
                  </p>
                </div>
                <p className="font-mono text-[12px] text-subtle">
                  $ listening<span className="ml-1 inline-block h-3.5 w-1.5 translate-y-[2px] animate-blink bg-accent" />
                </p>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <FeedbackForm enabled={feedbackEnabled} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
