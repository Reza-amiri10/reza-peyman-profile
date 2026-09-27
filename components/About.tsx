import { profile, engineeringPractices } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About"
          meta="README.md"
          title={
            <>
              A developer who thinks in <span className="text-signal">systems</span>, not just
              screens.
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="pretty text-xl leading-[1.5] tracking-[-0.01em] text-fg sm:text-[1.6rem] sm:leading-[1.45]">
              {profile.summary}
            </p>
            <p className="pretty mt-8 max-w-2xl border-l-2 border-accent pl-5 text-base leading-relaxed text-muted sm:text-lg">
              {profile.focusStatement}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="mono-label text-fg">Engineering practices</span>
                <span className="mono-label">{String(engineeringPractices.length).padStart(2, "0")} items</span>
              </div>
              <ul>
                {engineeringPractices.map((practice, i) => (
                  <li
                    key={practice}
                    className="group flex items-start gap-4 border-b border-line px-5 py-3 last:border-b-0 transition-colors hover:bg-bg"
                  >
                    <span className="mt-[2px] font-mono text-[11px] text-subtle transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-[14px] leading-snug text-fg/90">{practice}</span>
                    <span className="mt-[1px] font-mono text-[11px] text-accent-teal">[✓]</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
