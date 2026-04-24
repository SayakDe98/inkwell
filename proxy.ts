import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JWT_COOKIE } from "@/lib/auth";

const PROTECTED = ["/write/editor", "/bookmarks"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(JWT_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/write/editor", "/write/editor/:path*", "/bookmarks"],
};
