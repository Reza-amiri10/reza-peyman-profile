import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { feedbackKinds, type FeedbackKind } from "@/lib/data";
import { addPendingFeedback, allowSubmission, feedbackEnabled } from "@/lib/feedback";

export const dynamic = "force-dynamic";

const LIMITS = { name: 80, role: 100, project: 100, message: 1200, link: 200 };

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function cleanMessage(v: unknown): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, LIMITS.message);
}

function cleanLink(v: unknown): string | undefined {
  const s = clean(v, LIMITS.link);
  if (!s) return undefined;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  if (!feedbackEnabled) {
    return NextResponse.json(
      { ok: false, error: "Feedback isn't switched on yet. Please email me instead." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot + time trap: bots fill hidden fields and submit instantly.
  const startedAt = Number(body.startedAt);
  if (clean(body.website, 200) || (Number.isFinite(startedAt) && Date.now() - startedAt < 2500)) {
    return NextResponse.json({ ok: true }); // pretend success, store nothing
  }

  const kind = clean(body.kind, 10) as FeedbackKind;
  const name = clean(body.name, LIMITS.name);
  const message = cleanMessage(body.message);

  if (!feedbackKinds.some((k) => k.id === kind)) {
    return NextResponse.json({ ok: false, error: "Pick how we worked together." }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (message.length < 20) {
    return NextResponse.json(
      { ok: false, error: "A little more detail, please (20+ characters)." },
      { status: 400 }
    );
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "Please confirm it's OK to publish your feedback." },
      { status: 400 }
    );
  }

  const h = headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";

  try {
    if (!(await allowSubmission(ip))) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions — please try again later." },
        { status: 429 }
      );
    }

    await addPendingFeedback({
      kind,
      name,
      message,
      role: clean(body.role, LIMITS.role) || undefined,
      project: clean(body.project, LIMITS.project) || undefined,
      link: cleanLink(body.link),
    });
  } catch (e) {
    console.error("[feedback] submit failed", e);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on my side. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
