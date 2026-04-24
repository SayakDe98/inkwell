import Link from "next/link";
import { PenLine, Zap, Globe, Shield } from "lucide-react";

export const metadata = {
  title: "Write — Inkwell",
  description: "Publish your ideas on Inkwell.",
};

export default function WritePage() {
  return (
    <div>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: "16px", fontWeight: 500 }}>
          For writers
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.04em", color: "var(--text-primary)", marginBottom: "20px" }}>
          Write what matters.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300, maxWidth: "440px", margin: "0 auto 40px" }}>
          A distraction-free editor for serious writers. No metrics. No noise. Just you and the page.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/write/editor" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "9999px", background: "var(--accent)", color: "#0a0a0a", fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none" }}>
            <PenLine size={16} />
            Start writing now
          </Link>
          <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "9999px", border: "1px solid var(--border-2)", color: "var(--text-secondary)", fontSize: "0.9375rem", textDecoration: "none" }}>
            Learn more
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {[
            { icon: <Zap size={20} color="var(--accent-2)" />, title: "Instant publishing", body: "Write and publish in minutes. No approval process, no editorial gatekeeping." },
            { icon: <Globe size={20} color="var(--accent-2)" />, title: "Built-in audience", body: "Your articles are surfaced to readers already here for ideas like yours." },
            { icon: <Shield size={20} color="var(--accent-2)" />, title: "Your words, your rights", body: "You own everything you publish. We're just the platform." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ padding: "28px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ marginBottom: "14px" }}>{icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px" }}>{title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 300 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
