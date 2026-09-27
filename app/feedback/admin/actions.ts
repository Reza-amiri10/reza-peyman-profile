"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "crypto";
import {
  FEEDBACK_TAG,
  approveFeedback,
  deleteFeedback,
  unpublishFeedback,
} from "@/lib/feedback";

const COOKIE = "fb_admin";

function digest(v: string) {
  return createHash("sha256").update(v).digest();
}

/** Trims spaces/newlines and stray surrounding quotes (a common copy-paste slip). */
function normalise(v: string | undefined | null): string {
  return (v ?? "").trim().replace(/^(['"])(.*)\1$/, "$2").trim();
}

function adminSecret(): string {
  return normalise(process.env.FEEDBACK_ADMIN_KEY);
}

function matches(candidate: string): boolean {
  const secret = adminSecret();
  if (secret.length < 12 || !candidate) return false;
  return timingSafeEqual(digest(normalise(candidate)), digest(secret));
}

/** True when the request carries the right admin key (in the cookie). */
export async function isAdmin(): Promise<boolean> {
  return matches(cookies().get(COOKIE)?.value ?? "");
}

export async function login(formData: FormData) {
  const key = normalise(String(formData.get("key") ?? ""));
  if (!matches(key)) redirect("/feedback/admin?error=1");
  cookies().set(COOKIE, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/feedback/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/feedback/admin");
}

export async function logout() {
  cookies().delete({ name: COOKIE, path: "/feedback/admin" });
  revalidatePath("/feedback/admin");
}

async function guarded(fn: () => Promise<void>) {
  if (!(await isAdmin())) throw new Error("Not authorised");
  await fn();
  revalidateTag(FEEDBACK_TAG);
  revalidatePath("/");
  revalidatePath("/feedback/admin");
}

export async function approve(formData: FormData) {
  await guarded(() => approveFeedback(String(formData.get("id"))));
}

export async function unpublish(formData: FormData) {
  await guarded(() => unpublishFeedback(String(formData.get("id"))));
}

export async function remove(formData: FormData) {
  await guarded(() => deleteFeedback(String(formData.get("id"))));
}
