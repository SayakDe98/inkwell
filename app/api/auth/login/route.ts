import { NextRequest, NextResponse } from "next/server";
import {
  userStore,
  verifyPassword,
  signToken,
  validateEmail,
  JWT_COOKIE,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const key = email.toLowerCase().trim();
    const user = userStore.get(key);

    // Use consistent timing to prevent user enumeration
    const passwordMatch = user
      ? await verifyPassword(password, user.passwordHash)
      : await verifyPassword(password, "$2b$10$invalidhashfortimingnormalization");

    if (!user || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });

    const res = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

    res.cookies.set(JWT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
