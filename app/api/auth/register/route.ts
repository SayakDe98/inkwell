import { NextRequest, NextResponse } from "next/server";
import {
  userStore,
  hashPassword,
  signToken,
  validateEmail,
  validatePassword,
  JWT_COOKIE,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body as {
      name?: string;
      email?: string;
      password?: string;
    };

    // ── Validation ──────────────────────────────────────────────
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }
    const pwError = validatePassword(password ?? "");
    if (pwError) {
      return NextResponse.json({ error: pwError }, { status: 400 });
    }

    const key = email.toLowerCase().trim();
    if (userStore.has(key)) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // ── Create user ─────────────────────────────────────────────
    const id = `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const passwordHash = await hashPassword(password!);
    const avatarSeed = Math.floor(Math.random() * 70) + 1;

    const user = {
      id,
      name: name.trim(),
      email: key,
      passwordHash,
      avatar: `https://i.pravatar.cc/150?img=${avatarSeed}`,
      bio: "",
      createdAt: new Date().toISOString(),
    };

    userStore.set(key, user);

    // ── Sign JWT ────────────────────────────────────────────────
    const token = await signToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });

    const res = NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      },
      { status: 201 }
    );

    res.cookies.set(JWT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
