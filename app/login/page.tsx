"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push(redirect);
      router.refresh();
    }
  };

  const fillDemo = () => {
    setEmail("demo@inkwell.io");
    setPassword("password123");
    setError("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", padding: "0 24px" }}>
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "block",
          fontFamily: "var(--font-serif)",
          fontSize: "1.75rem",
          color: "var(--text-primary)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Inkwell
      </Link>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "36px 32px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.75rem",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "6px",
          }}
        >
          Welcome back
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "28px", fontWeight: 300 }}>
          Sign in to your Inkwell account
        </p>

        {/* Demo hint */}
        <button
          type="button"
          onClick={fillDemo}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px dashed var(--border-2)",
            background: "transparent",
            color: "var(--text-tertiary)",
            fontSize: "0.8rem",
            cursor: "pointer",
            marginBottom: "24px",
            fontFamily: "var(--font-sans)",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-2)";
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
          }}
        >
          ✦ Fill demo credentials
        </button>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Email */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border-2)",
                background: "var(--surface-2)",
                color: "var(--text-primary)",
                fontSize: "0.9375rem",
                fontFamily: "var(--font-sans)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-2)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
            />
          </div>

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                Password
              </label>
              <Link href="#" style={{ fontSize: "0.75rem", color: "var(--accent-2)", textDecoration: "none" }}>
                Forgot password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 44px 11px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-2)",
                  background: "var(--surface-2)",
                  color: "var(--text-primary)",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-2)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(239,68,68,0.3)",
                background: "rgba(239,68,68,0.08)",
                color: "#f87171",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "9999px",
              border: "none",
              background: loading ? "var(--surface-3)" : "var(--accent)",
              color: loading ? "var(--text-tertiary)" : "#0a0a0a",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-sans)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            {loading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-tertiary)", marginTop: "24px" }}>
          No account?{" "}
          <Link href={`/register${redirect !== "/" ? `?redirect=${redirect}` : ""}`} style={{ color: "var(--accent-2)", textDecoration: "none", fontWeight: 500 }}>
            Create one free
          </Link>
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
