// SSG + ISR: This page is statically generated and revalidated every 60s
// Represents the "for you" feed with trending content
import { getFeaturedArticles, getRecentArticles, tags } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default function HomePage() {
  const featured = getFeaturedArticles();
  const recent = getRecentArticles(10);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
      {/* Hero */}
      <section
        style={{
          padding: "64px 0 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-2)",
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            Ideas Worth Reading
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              marginBottom: "20px",
            }}
          >
            Writing that
            <br />
            <em style={{ color: "var(--accent)" }}>makes you think.</em>
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              fontWeight: 300,
              maxWidth: "440px",
            }}
          >
            Long-form essays on technology, design, startups, and the ideas that
            shape how we build and live.
          </p>
        </div>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "64px",
          paddingTop: "48px",
        }}
        className="home-grid"
      >
        {/* Main feed */}
        <div>
          {/* Featured */}
          <div style={{ marginBottom: "8px" }}>
            {featured.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>

          {/* Divider with label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "16px 0 8px",
            }}
          >
            <TrendingUp size={14} color="var(--text-tertiary)" />
            <span
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                fontWeight: 500,
              }}
            >
              Recent
            </span>
          </div>

          {recent.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Sidebar */}
        <aside style={{ paddingTop: "8px" }}>
          <div
            style={{
              position: "sticky",
              top: "80px",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            {/* Topics */}
            <div>
              <h3
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  fontWeight: 500,
                  marginBottom: "16px",
                }}
              >
                Explore Topics
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="tag-chip"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  fontWeight: 500,
                  marginBottom: "16px",
                }}
              >
                This Week
              </h3>
              {[
                { label: "Articles published", value: "24" },
                { label: "Total readers", value: "18.4k" },
                { label: "Claps given", value: "92.1k" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontFamily: "var(--font-serif)",
                      color: "var(--accent)",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .home-grid { grid-template-columns: 1fr !important; }
          aside { display: none; }
        }
      `}</style>
    </div>
  );
}
