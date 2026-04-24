import { tags, articles } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "Topics — Inkwell",
  description: "Browse all topics on Inkwell",
};

export default function TagsIndexPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ maxWidth: "520px", marginBottom: "56px" }}>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: "10px", fontWeight: 500 }}>Explore</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "14px" }}>Topics</h1>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 300 }}>
          Dive into the subjects that matter to you. Every topic has a community of writers and readers thinking deeply about it.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {tags.map((tag) => {
          const tagArticles = articles.filter((a) => a.tags.some((t) => t.toLowerCase() === tag.name.toLowerCase()));
          const topArticle = tagArticles[0];
          return (
            <Link key={tag.id} href={`/tag/${tag.slug}`} style={{ textDecoration: "none" }}>
              <div className="topic-card" style={{ padding: "28px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--surface)", height: "100%", transition: "border-color 0.2s, background 0.2s", cursor: "pointer" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "8px" }}>{tag.name}</h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.55, fontWeight: 300, marginBottom: "20px" }}>{tag.description}</p>
                {topArticle && (
                  <div style={{ padding: "14px", borderRadius: "8px", background: "var(--surface-3)", marginBottom: "16px" }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "4px" }}>Latest</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.4, fontFamily: "var(--font-serif)" }}>{topArticle.title}</p>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{tag.count.toLocaleString()} stories</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-2)", fontWeight: 500 }}>Browse →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`.topic-card:hover { border-color: var(--border-2) !important; background: var(--surface-2) !important; }`}</style>
    </div>
  );
}
