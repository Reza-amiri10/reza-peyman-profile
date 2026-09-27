import { approachItems, currentFocus } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Approach() {
  return (
    <section id="approach" className="section">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Principles"
          meta={`${approachItems.length} rules`}
          title="The rules I build by."
        />

        <ol className="mt-14 grid border-l border-t border-line sm:grid-cols-2">
          {approachItems.map((item, i) => (
            <li key={item.title} className="group relative border-b border-r border-line p-7 transition-colors hover:bg-surface sm:p-10">
              <Reveal delay={(i % 2) * 0.08}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-accent">P-{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-2 w-2 border border-line transition-colors group-hover:border-accent group-hover:bg-accent" />
                </div>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] sm:text-[1.75rem]">{item.title}</h3>
                <p className="pretty mt-4 max-w-md leading-relaxed text-muted">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <div>
              <p className="mono-label flex items-center gap-2 text-fg">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-teal" />
                </span>
                Process queue
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">Currently running</h3>
              <p className="mt-2 text-sm text-muted">What I&apos;m focused on right now.</p>
            </div>
            <ul className="border-t border-line font-mono text-[13px]">
              {currentFocus.map((item, i) => (
                <li
                  key={item}
                  className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-line py-3.5 transition-colors hover:bg-surface"
                >
                  <span className="pl-1 text-subtle">{String(i + 1).padStart(3, "0")}</span>
                  <span className="font-sans text-[15px] text-fg/90">{item}</span>
                  <span className="pr-1 text-[10px] uppercase tracking-[0.14em] text-accent-teal">running</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
