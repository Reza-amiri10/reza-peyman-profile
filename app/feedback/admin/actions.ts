"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
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

/** True when the request carries the right admin key (in the cookie). */
export async function isAdmin(): Promise<boolean> {
  const secret = process.env.FEEDBACK_ADMIN_KEY;
  const got = cookies().get(COOKIE)?.value;
  if (!secret || secret.length < 12 || !got) return false;
  return timingSafeEqual(digest(got), digest(secret));
}

export async function login(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  cookies().set(COOKIE, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/feedback/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
  revalidatePath("/feedback/admin");
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
