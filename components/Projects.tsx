import { ArrowUpRight, Github } from "lucide-react";
import { profile, projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ArchSketch } from "@/components/ArchSketch";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function Record({ project, index }: { project: Project; index: number }) {
  const host = hostOf(project.href);
  const code = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative grid border-b border-line transition-colors hover:bg-surface lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col p-6 sm:p-10 lg:border-r lg:border-line">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="text-accent">Build/{code}</span>
          {project.featured && <span className="border border-accent px-1.5 py-px text-accent">Featured</span>}
          {host && <span className="normal-case tracking-normal text-subtle">{host}</span>}
        </div>

        <h3 className="mt-8 text-3xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-[2.6rem]">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </a>
        </h3>
        <p className="pretty mt-5 max-w-xl leading-relaxed text-muted">{project.description}</p>

        <dl className="mt-8 border-t border-line font-mono text-[12px]">
          <div className="flex gap-4 border-b border-line py-2.5">
            <dt className="w-16 shrink-0 uppercase tracking-[0.12em] text-subtle">Stack</dt>
            <dd className="text-fg/90">{project.tags.join(" · ")}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center gap-6 pt-8 font-mono text-[12px] uppercase tracking-[0.12em]">
          <span className="inline-flex items-center gap-1.5 text-fg transition-colors group-hover:text-accent">
            Open project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      </div>

      <div className="relative border-t border-line lg:border-t-0">
        <span className="mono-label absolute left-4 top-3 z-10">Fig. {code} — architecture sketch</span>
        <div className="aspect-[600/230] w-full lg:h-full lg:min-h-[300px] lg:[aspect-ratio:auto]">
          <ArchSketch nodes={project.tags} id={code} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Work"
          meta={`${projects.length} builds`}
          title="Selected builds."
          description="Products across AI, mobile and the web — each one sketched as the system behind it."
        />

        <div className="mt-14 border-x border-t border-line">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={0.05}>
              <Record project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="mono-label">More case studies in progress</p>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github className="h-3.5 w-3.5" />
            Everything on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
