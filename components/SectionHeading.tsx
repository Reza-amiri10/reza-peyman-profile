import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  /** e.g. "01" — rendered as SYS/01 */
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** right-hand metadata in the spec bar, e.g. "6 modules" */
  meta?: string;
  align?: "left" | "center";
};

/** Spec-sheet style section header: a hairline bar with a code, then the title. */
export function SectionHeading({ index, eyebrow, title, description, meta }: SectionHeadingProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-t border-fg/80 pt-3">
        <p className="mono-label">
          {index && <span className="text-accent">SYS/{index}</span>}
          <span className="mx-2 text-line">—</span>
          <span className="text-fg">{eyebrow}</span>
        </p>
        {meta && <p className="mono-label hidden sm:block">{meta}</p>}
      </div>
      <Reveal>
        <h2 className="h2 mt-10 max-w-4xl sm:mt-14">{title}</h2>
        {description && (
          <p className="pretty mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
      </Reveal>
    </div>
  );
}
