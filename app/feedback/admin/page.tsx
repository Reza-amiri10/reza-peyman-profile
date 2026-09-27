import type { Metadata } from "next";
import { feedbackKinds } from "@/lib/data";
import {
  feedbackEnabled,
  getPendingFeedback,
  getPublishedFeedbackFresh,
  type Feedback,
} from "@/lib/feedback";
import { approve, isAdmin, login, logout, remove, unpublish } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Feedback review",
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="relative min-h-screen pb-24 pt-24 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-blueprint mask-radial" />
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
          <span>
            <span className="text-accent">ADMIN</span> — Feedback review
          </span>
          <span>private · not indexed</span>
        </div>
        {children}
      </div>
    </main>
  );
}

function Row({ fb, mode }: { fb: Feedback; mode: "pending" | "approved" }) {
  const kind = feedbackKinds.find((k) => k.id === fb.kind);
  return (
    <li className="border-b border-line py-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
        {kind && <span className="border border-line px-1.5 py-px text-fg">{kind.code}</span>}
        <span>{new Date(fb.createdAt).toISOString().replace("T", " ").slice(0, 16)} UTC</span>
      </div>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed">{fb.message}</p>
      <dl className="mt-4 grid gap-1 font-mono text-[12px] text-muted sm:grid-cols-2">
        <div>
          <dt className="inline text-subtle">name: </dt>
          <dd className="inline text-fg">{fb.name}</dd>
        </div>
        {fb.role && (
          <div>
            <dt className="inline text-subtle">role: </dt>
            <dd className="inline">{fb.role}</dd>
          </div>
        )}
        {fb.project && (
          <div>
            <dt className="inline text-subtle">project: </dt>
            <dd className="inline">{fb.project}</dd>
          </div>
        )}
        {fb.link && (
          <div className="truncate">
            <dt className="inline text-subtle">link: </dt>
            <dd className="inline">
              <a href={fb.link} target="_blank" rel="noopener noreferrer nofollow" className="underline decoration-line underline-offset-4 hover:text-accent">
                {fb.link}
              </a>
            </dd>
          </div>
        )}
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        {mode === "pending" ? (
          <form action={approve}>
            <input type="hidden" name="id" value={fb.id} />
            <button className="btn-accent py-2.5">Approve & publish</button>
          </form>
        ) : (
          <form action={unpublish}>
            <input type="hidden" name="id" value={fb.id} />
            <button className="btn-ghost py-2.5">Unpublish</button>
          </form>
        )}
        <form action={remove}>
          <input type="hidden" name="id" value={fb.id} />
          <button className="btn-ghost py-2.5 hover:border-accent hover:text-accent">Delete</button>
        </form>
      </div>
    </li>
  );
}

export default async function FeedbackAdminPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const configuredKey = (process.env.FEEDBACK_ADMIN_KEY ?? "").trim().replace(/^(['"])(.*)\1$/, "$2");
  if (configuredKey.length < 12) {
    return (
      <Shell>
        <h1 className="mt-12 text-4xl font-medium tracking-[-0.04em]">Admin key not set.</h1>
        <p className="mt-4 max-w-xl text-muted">
          Add a <code className="font-mono text-fg">FEEDBACK_ADMIN_KEY</code> environment variable (at least 12
          characters) in Vercel, then redeploy.
        </p>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <h1 className="mt-12 text-4xl font-medium tracking-[-0.04em]">Sign in to review.</h1>
        {searchParams.error && (
          <p role="alert" className="mt-6 max-w-md border-l-2 border-accent bg-accent/5 px-4 py-3 text-sm">
            That key doesn&apos;t match <code className="font-mono">FEEDBACK_ADMIN_KEY</code>. Check for typos — and if
            you changed the key recently, restart <code className="font-mono">npm run dev</code> (locally) or redeploy
            (on Vercel).
          </p>
        )}
        <form action={login} className="mt-8 flex max-w-md gap-2">
          <input
            name="key"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Admin key"
            className="w-full border border-line bg-bg px-3.5 py-3 outline-none focus:border-accent"
          />
          <button className="btn-primary">Enter</button>
        </form>
      </Shell>
    );
  }

  if (!feedbackEnabled) {
    return (
      <Shell>
        <h1 className="mt-12 text-4xl font-medium tracking-[-0.04em]">Storage not connected.</h1>
        <p className="mt-4 max-w-xl text-muted">Connect Upstash Redis to this project in Vercel, then redeploy.</p>
      </Shell>
    );
  }

  const [pending, approved] = await Promise.all([getPendingFeedback(), getPublishedFeedbackFresh()]);

  return (
    <Shell>
      <div className="mt-12 flex items-end justify-between gap-4">
        <h1 className="text-5xl font-medium tracking-[-0.05em]">
          Review queue<span className="text-accent">.</span>
        </h1>
        <form action={logout}>
          <button className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle hover:text-fg">Sign out</button>
        </form>
      </div>

      <section className="mt-12">
        <h2 className="mono-label border-t border-fg/80 pt-3 text-fg">
          Pending <span className="text-accent">{pending.length}</span>
        </h2>
        {pending.length ? (
          <ul>{pending.map((fb) => <Row key={fb.id} fb={fb} mode="pending" />)}</ul>
        ) : (
          <p className="py-8 text-muted">Nothing waiting. 🎉</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mono-label border-t border-fg/80 pt-3 text-fg">
          Published <span className="text-accent">{approved.length}</span>
        </h2>
        {approved.length ? (
          <ul>{approved.map((fb) => <Row key={fb.id} fb={fb} mode="approved" />)}</ul>
        ) : (
          <p className="py-8 text-muted">Nothing published yet.</p>
        )}
      </section>
    </Shell>
  );
}
