import { NextResponse } from "next/server";
import { JWT_COOKIE } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(JWT_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // immediately expire
  });
  return res;
}
