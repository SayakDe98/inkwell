import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "inkwell-dev-secret-change-in-production-32chars"
);

export const JWT_COOKIE = "inkwell_token";
export const JWT_EXPIRY = "7d";

// ── In-memory user store (replace with a real DB in production) ──
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
  bio: string;
  createdAt: string;
}

// Seed one demo user so testers don't have to register
const DEMO_HASH = bcrypt.hashSync("password123", 10);

export const userStore: Map<string, User> = new Map([
  [
    "demo@inkwell.io",
    {
      id: "u_demo",
      name: "Demo User",
      email: "demo@inkwell.io",
      passwordHash: DEMO_HASH,
      avatar: "https://i.pravatar.cc/150?img=68",
      bio: "Just a curious reader exploring ideas on Inkwell.",
      createdAt: new Date().toISOString(),
    },
  ],
]);

// ── JWT helpers ──────────────────────────────────────────────────
export interface JWTPayload {
  sub: string;   // user id
  email: string;
  name: string;
  avatar: string;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// ── Password helpers ─────────────────────────────────────────────
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ── Validation ───────────────────────────────────────────────────
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters";
  return null;
}
