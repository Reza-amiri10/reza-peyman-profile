import { techStack } from "@/lib/data";

/** A scrolling "dependency bus" of the tools I use. */
export function TechMarquee() {
  const row = [...techStack, ...techStack];
  return (
    <section aria-label="Technologies I work with" className="border-y border-line">
      <div className="flex items-stretch">
        <div className="hidden shrink-0 items-center border-r border-line px-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent sm:flex">
          deps
        </div>
        <div className="mask-x group relative flex min-w-0 flex-1 overflow-hidden py-4">
          <ul className="flex w-max shrink-0 animate-marquee items-center pr-0 group-hover:[animation-play-state:paused]">
            {row.map((t, i) => (
              <li
                key={`${t}-${i}`}
                aria-hidden={i >= techStack.length}
                className="flex items-center whitespace-nowrap font-mono text-[13px] text-muted"
              >
                <span className="px-6 transition-colors hover:text-fg">{t}</span>
                <span className="text-line">/</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
