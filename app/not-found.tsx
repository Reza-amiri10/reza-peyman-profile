import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-blueprint mask-radial" />
      </div>
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Error 404 — route not found</p>
        <h1 className="mt-4 text-6xl font-medium tracking-[-0.06em] sm:text-8xl">Nothing here<span className="text-accent">.</span></h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/articles" className="btn-ghost">
            Read articles
          </Link>
        </div>
      </div>
    </main>
  );
}
