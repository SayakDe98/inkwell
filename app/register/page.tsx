"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
  const strengthLabel = ["", "Too short", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#4ade80"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await register(name.trim(), email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push(redirect);
      router.refresh();
    }
  };

  const inputStyle: React.CSSProperties = {
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
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", padding: "0 24px" }}>
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
          Create your account
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "28px", fontWeight: 300 }}>
          Free forever. No credit card required.
        </p>

        {/* Perks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
          {["Publish unlimited articles", "Save bookmarks across devices", "Join the conversation"].map((perk) => (
            <div key={perk} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(74,222,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={11} color="#4ade80" />
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 300 }}>{perk}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Name */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: 500 }}>
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Your name"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-2)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
            />
          </div>

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
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-2)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                style={{ ...inputStyle, paddingRight: "44px" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-2)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Strength bar */}
            {password.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= strength ? strengthColor : "var(--border-2)", transition: "background 0.3s" }} />
                  ))}
                </div>
                <p style={{ fontSize: "0.75rem", color: strengthColor }}>{strengthLabel}</p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#f87171", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}

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
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-tertiary)", marginTop: "24px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent-2)", textDecoration: "none", fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>

      <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "20px", lineHeight: 1.6 }}>
        By creating an account, you agree to our{" "}
        <Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Terms</Link>
        {" "}and{" "}
        <Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Privacy Policy</Link>.
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
