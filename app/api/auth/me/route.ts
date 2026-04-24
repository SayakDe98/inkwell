import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JWT_COOKIE } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(JWT_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      avatar: payload.avatar,
    },
  });
}
