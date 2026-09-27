import type { FeedbackKind } from "@/lib/data";

/*
 * Feedback storage on Upstash Redis (REST API — no extra dependency).
 *
 * Works with either env var naming:
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN   (Upstash console)
 *   KV_REST_API_URL        / KV_REST_API_TOKEN          (Vercel Marketplace integration)
 *
 * Keys
 *   feedback:{id}        JSON of one entry
 *   feedback:pending     sorted set of ids awaiting review (score = createdAt)
 *   feedback:approved    sorted set of ids shown on the site
 */

export type Feedback = {
  id: string;
  kind: FeedbackKind;
  name: string;
  role?: string;
  project?: string;
  message: string;
  link?: string;
  createdAt: number;
  approvedAt?: number;
};

const URL_ = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const feedbackEnabled = Boolean(URL_ && TOKEN);

const PENDING = "feedback:pending";
const APPROVED = "feedback:approved";
const key = (id: string) => `feedback:${id}`;

/** Tag used to refresh the public list after a moderation change. */
export const FEEDBACK_TAG = "feedback";

type Cmd = (string | number)[];

async function pipeline(cmds: Cmd[], opts: { cache?: "public" } = {}): Promise<unknown[]> {
  if (!feedbackEnabled) throw new Error("Feedback storage is not configured");
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
    ...(opts.cache === "public"
      ? { next: { revalidate: 300, tags: [FEEDBACK_TAG] } }
      : { cache: "no-store" as const }),
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((d) => {
    if (d.error) throw new Error(d.error);
    return d.result;
  });
}

function parse(raw: unknown): Feedback | null {
  if (typeof raw !== "string") return null;
  try {
    return JSON.parse(raw) as Feedback;
  } catch {
    return null;
  }
}

async function listFrom(set: string, cache?: "public"): Promise<Feedback[]> {
  const [ids] = (await pipeline([["ZRANGE", set, 0, 99, "REV"]], { cache })) as [string[]];
  if (!ids?.length) return [];
  const [raws] = (await pipeline([["MGET", ...ids.map(key)]], { cache })) as [unknown[]];
  return raws.map(parse).filter((f): f is Feedback => f !== null);
}

/** Approved entries for the public site (cached for 5 minutes, refreshed on approval). */
export async function getApprovedFeedback(): Promise<Feedback[]> {
  if (!feedbackEnabled) return [];
  try {
    return await listFrom(APPROVED, "public");
  } catch (e) {
    console.error("[feedback] could not load approved entries", e);
    return [];
  }
}

export async function getPendingFeedback(): Promise<Feedback[]> {
  return listFrom(PENDING);
}

/** Published entries, uncached — for the admin page. */
export async function getPublishedFeedbackFresh(): Promise<Feedback[]> {
  return listFrom(APPROVED);
}

export async function addPendingFeedback(entry: Omit<Feedback, "id" | "createdAt">): Promise<Feedback> {
  const fb: Feedback = {
    ...entry,
    id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
    createdAt: Date.now(),
  };
  await pipeline([
    ["SET", key(fb.id), JSON.stringify(fb)],
    ["ZADD", PENDING, fb.createdAt, fb.id],
  ]);
  return fb;
}

export async function approveFeedback(id: string): Promise<void> {
  const [raw] = await pipeline([["GET", key(id)]]);
  const fb = parse(raw);
  if (!fb) return;
  fb.approvedAt = Date.now();
  await pipeline([
    ["SET", key(id), JSON.stringify(fb)],
    ["ZREM", PENDING, id],
    ["ZADD", APPROVED, fb.createdAt, id],
  ]);
}

/** Moves an approved entry back to the review queue (hides it from the site). */
export async function unpublishFeedback(id: string): Promise<void> {
  const [raw] = await pipeline([["GET", key(id)]]);
  const fb = parse(raw);
  if (!fb) return;
  await pipeline([
    ["ZREM", APPROVED, id],
    ["ZADD", PENDING, fb.createdAt, id],
  ]);
}

export async function deleteFeedback(id: string): Promise<void> {
  await pipeline([
    ["ZREM", PENDING, id],
    ["ZREM", APPROVED, id],
    ["DEL", key(id)],
  ]);
}

/** Simple fixed-window rate limit. Returns true when the caller is allowed. */
export async function allowSubmission(ip: string, max = 3, windowSec = 3600): Promise<boolean> {
  const k = `feedback:rl:${ip}`;
  const [count] = (await pipeline([
    ["INCR", k],
    ["EXPIRE", k, windowSec, "NX"],
  ])) as [number];
  return count <= max;
}
