"use server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { sessionPayload } from "./definitions";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { permanentRedirect } from "next/dist/client/components/redirect";
const secretKey = process.env.JWT_SECRET as string;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: sessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(
  userId: string,
  isAdmin: boolean,
  name: string
) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ userId, isAdmin, name, expiresAt });
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  redirect("/");
}

export async function verifySession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) return null;
  return {
    isAuth: true,
    userId: session?.userId,
  };
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().delete("session");
  redirect("/login");
}
