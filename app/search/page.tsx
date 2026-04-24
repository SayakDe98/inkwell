// CSR: Search is fully client-side for instant results without server round-trips
"use client";
import { useState, useTransition } from "react";
import { searchArticles } from "@/lib/data";
import { Article } from "@/types";
import ArticleCard from "@/components/ArticleCard";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setQuery(value);
    startTransition(() => {
      if (value.trim().length > 1) {
        setResults(searchArticles(value));
        setSearched(true);
      } else {
        setResults([]);
        setSearched(false);
      }
    });
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "32px" }}>Search</h1>

      <div style={{ position: "relative", marginBottom: "40px" }}>
        <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search articles, topics, authors…"
          autoFocus
          style={{
            width: "100%",
            padding: "14px 16px 14px 44px",
            borderRadius: "10px",
            border: "1px solid var(--border-2)",
            background: "var(--surface)",
            color: "var(--text-primary)",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.15s",
            fontFamily: "var(--font-sans)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-2)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
        />
        {isPending && <Loader2 size={16} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", animation: "spin 1s linear infinite" }} />}
      </div>

      {searched && (
        <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: "20px", letterSpacing: "0.04em" }}>
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.map((article) => <ArticleCard key={article.id} article={article} />)}

      {searched && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-tertiary)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "8px" }}>Nothing found</p>
          <p style={{ fontSize: "0.875rem" }}>Try a different search term</p>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }`}</style>
    </div>
  );
}
