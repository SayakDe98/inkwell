"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { articles } from "@/lib/data";
import { Article } from "@/types";
import ArticleCard from "@/components/ArticleCard";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  const [bookmarked, setBookmarked] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored: { id: string }[] = JSON.parse(
      localStorage.getItem("inkwell-bookmarks") || "[]"
    );
    const ids = new Set(stored.map((b) => b.id));
    setBookmarked(articles.filter((a) => ids.has(a.id)));
    setLoaded(true);
  }, []);

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <Bookmark size={18} color="var(--accent-2)" />
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-2)", fontWeight: 500 }}>
            Your Library
          </p>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
          }}
        >
          Saved articles
        </h1>
      </div>

      {!loaded ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: "100px",
                borderBottom: "1px solid var(--border)",
                background: "linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
                borderRadius: "4px",
                margin: "16px 0",
              }}
            />
          ))}
          <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
        </div>
      ) : bookmarked.length === 0 ? (
        <div
          style={{
            padding: "80px 0",
            textAlign: "center",
            border: "1px dashed var(--border-2)",
            borderRadius: "12px",
          }}
        >
          <Bookmark size={32} color="var(--text-tertiary)" style={{ margin: "0 auto 16px" }} />
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              marginBottom: "8px",
            }}
          >
            Nothing saved yet
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "24px" }}>
            Hit the save button on any article to find it here later.
          </p>
          <Link
            href="/"
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              border: "1px solid var(--border-2)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.875rem",
            }}
          >
            Browse articles
          </Link>
        </div>
      ) : (
        <>
          <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: "8px" }}>
            {bookmarked.length} article{bookmarked.length !== 1 ? "s" : ""} saved
          </p>
          {bookmarked.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </>
      )}
    </div>
  );
}
