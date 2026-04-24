"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  compact?: boolean;
}

export default function ArticleCard({ article, featured = false, compact = false }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  if (compact) {
    return (
      <Link href={`/article/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <article style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Image src={article.author.avatar} alt={article.author.name} width={20} height={20} style={{ borderRadius: "50%" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{article.author.name}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.35, letterSpacing: "-0.01em", marginBottom: "4px" }}>{article.title}</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{article.readingTime} · {timeAgo}</p>
          </div>
          {article.coverImage && (
            <div style={{ width: "72px", height: "72px", flexShrink: 0, borderRadius: "4px", overflow: "hidden" }}>
              <Image src={article.coverImage} alt={article.title} width={72} height={72} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
          )}
        </article>
      </Link>
    );
  }

  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <article style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center", padding: "40px 0", borderBottom: "1px solid var(--border)" }} className="featured-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Image src={article.author.avatar} alt={article.author.name} width={28} height={28} style={{ borderRadius: "50%" }} />
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{article.author.name}</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, lineHeight: 1.25, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "12px" }}>{article.title}</h2>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px", fontWeight: 300 }}>{article.subtitle}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {article.tags.map((tag) => (<span key={tag} className="tag-chip">{tag}</span>))}
              <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{article.readingTime}</span>
            </div>
          </div>
          <div style={{ aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "var(--surface-2)" }} className="featured-img">
            <Image src={article.coverImage} alt={article.title} width={600} height={450} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
        </article>
        <style>{`
          @media (max-width: 768px) {
            .featured-grid { grid-template-columns: 1fr !important; }
            .featured-img { display: none; }
          }
        `}</style>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article style={{ padding: "32px 0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Image src={article.author.avatar} alt={article.author.name} width={24} height={24} style={{ borderRadius: "50%" }} />
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{article.author.name}</span>
              <span style={{ color: "var(--border-2)" }}>·</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{timeAgo}</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.3, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "8px" }}>{article.title}</h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 300, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.subtitle}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {article.tags.slice(0, 2).map((tag) => (<span key={tag} className="tag-chip">{tag}</span>))}
              <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginLeft: "auto" }}>{article.claps.toLocaleString()} claps · {article.readingTime}</span>
            </div>
          </div>
          <div style={{ width: "120px", height: "80px", flexShrink: 0, borderRadius: "4px", overflow: "hidden", background: "var(--surface-2)" }}>
            <Image src={article.coverImage} alt={article.title} width={120} height={80} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
        </div>
      </article>
    </Link>
  );
}
