// SSG: Pre-render all articles at build time
import { articles, getArticleBySlug, getRecentArticles } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ArticleCard from "@/components/ArticleCard";
import ClapButton from "@/components/ClapButton";
import BookmarkButton from "@/components/BookmarkButton";
import ReadingProgress from "@/components/ReadingProgress";
import CommentsSection from "@/components/CommentsSection";
import { BookOpen, Share2, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const revalidate = 30;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return { title: `${article.title} — Inkwell`, description: article.subtitle };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRecentArticles(10)
    .filter((a) => a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <div>
      <ReadingProgress />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 24px 0" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-tertiary)", textDecoration: "none", fontSize: "0.875rem" }}>
          <ArrowLeft size={14} />
          Back to feed
        </Link>
      </div>

      <div style={{ maxWidth: "900px", margin: "32px auto 0", padding: "0 24px" }}>
        <div style={{ aspectRatio: "16/7", borderRadius: "12px", overflow: "hidden", background: "var(--surface-2)" }}>
          <Image src={article.coverImage} alt={article.title} width={900} height={394} priority style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        </div>
      </div>

      <article style={{ maxWidth: "680px", margin: "48px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {article.tags.map((tag) => (
            <Link key={tag} href={`/tag/${tag.toLowerCase()}`} className="tag-chip">{tag}</Link>
          ))}
        </div>

        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "16px" }}>
          {article.title}
        </h1>

        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 300, marginBottom: "32px", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
          {article.subtitle}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <Link href={`/author/${article.author.id}`} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <Image src={article.author.avatar} alt={article.author.name} width={40} height={40} style={{ borderRadius: "50%" }} />
            <div>
              <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-primary)" }}>{article.author.name}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{timeAgo}</p>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-tertiary)", fontSize: "0.8rem" }}>
            <BookOpen size={14} />
            {article.readingTime}
          </div>
        </div>

        <div className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />

        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "28px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginTop: "48px", flexWrap: "wrap" }}>
          <ClapButton initialClaps={article.claps} />
          <BookmarkButton articleId={article.id} articleTitle={article.title} />
          <button style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "9999px", border: "1px solid var(--border-2)", background: "transparent", color: "var(--text-secondary)", fontSize: "0.875rem", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
            <Share2 size={15} />
            Share
          </button>
        </div>

        <Link href={`/author/${article.author.id}`} style={{ textDecoration: "none", display: "block" }}>
          <div style={{ display: "flex", gap: "20px", padding: "32px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--surface)", margin: "40px 0" }}>
            <Image src={article.author.avatar} alt={article.author.name} width={56} height={56} style={{ borderRadius: "50%", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500, marginBottom: "6px" }}>Written by</p>
              <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "6px" }}>{article.author.name}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 300, marginBottom: "12px" }}>{article.author.bio}</p>
              <div style={{ display: "flex", gap: "24px" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}><strong style={{ color: "var(--text-secondary)" }}>{article.author.followers.toLocaleString()}</strong> Followers</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}><strong style={{ color: "var(--text-secondary)" }}>{article.author.articles}</strong> Articles</span>
              </div>
            </div>
          </div>
        </Link>
      </article>

      <CommentsSection count={article.comments} />

      {related.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "48px", marginBottom: "64px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500, marginBottom: "24px" }}>More to read</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0 48px" }}>
              {related.map((a) => <ArticleCard key={a.id} article={a} compact />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
