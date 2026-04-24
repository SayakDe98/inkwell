import { authors, articles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About — Inkwell",
  description: "Inkwell is a home for long-form thinking on technology, design, and ideas.",
};

export default function AboutPage() {
  return (
    <div>
      <div style={{ borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg, var(--surface) 0%, var(--background) 100%)", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: "16px", fontWeight: 500 }}>Our story</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.04em", color: "var(--text-primary)", maxWidth: "700px", margin: "0 auto 24px" }}>
          A home for ideas worth keeping.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300, maxWidth: "520px", margin: "0 auto" }}>
          Inkwell is a publishing platform for people who want to write seriously and read deeply. No algorithm optimizing for outrage. No 280-character limit. Just long-form thinking.
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "80px" }} className="about-2col">
          {[
            { title: "Write freely.", body: "No paywall requirements. No follower-count pressure. Publish what you actually want to say, for readers who actually want to read it." },
            { title: "Read deeply.", body: "Curated essays, not a scroll feed. We surface the best writing across topics that matter — technology, design, philosophy, startups, and more." },
            { title: "Own your work.", body: "Your writing is yours. We never sell it, we never let advertisers shape what you see. What you write on Inkwell stays on Inkwell." },
            { title: "Think in public.", body: "The best ideas get sharper in conversation. Comments, responses, and claps — all designed to encourage substance over performance." },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px", letterSpacing: "-0.02em" }}>{title}</h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300 }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)", borderRadius: "12px", overflow: "hidden", marginBottom: "80px" }} className="stats-3col">
          {[
            { value: `${articles.length}+`, label: "Articles published" },
            { value: "4", label: "Featured writers" },
            { value: "100%", label: "Ad-free, always" },
          ].map(({ value, label }) => (
            <div key={label} style={{ padding: "36px 24px", background: "var(--surface)", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--accent)", marginBottom: "6px", letterSpacing: "-0.03em" }}>{value}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500, marginBottom: "28px" }}>Writers on Inkwell</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {authors.map((author) => (
              <Link key={author.id} href={`/author/${author.id}`} style={{ textDecoration: "none" }}>
                <div className="author-row" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 0", borderBottom: "1px solid var(--border)", transition: "opacity 0.15s" }}>
                  <Image src={author.avatar} alt={author.name} width={44} height={44} style={{ borderRadius: "50%" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "3px" }}>{author.name}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.4 }}>{author.bio.slice(0, 90)}…</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}>{author.followers.toLocaleString()}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>followers</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ padding: "48px", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--surface)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Ready to write?</h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 300, marginBottom: "28px", lineHeight: 1.6 }}>Join writers publishing their best thinking on Inkwell. Free, forever.</p>
          <Link href="/write" style={{ display: "inline-block", padding: "12px 32px", borderRadius: "9999px", background: "var(--accent)", color: "#0a0a0a", fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none" }}>Start writing</Link>
        </div>
      </div>

      <style>{`
        .author-row:hover { opacity: 0.7; }
        @media (max-width: 640px) {
          .about-2col { grid-template-columns: 1fr !important; }
          .stats-3col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
