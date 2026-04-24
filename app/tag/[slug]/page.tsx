// SSR: Tag pages are server-rendered on every request for fresh article counts
import { getArticlesByTag, getTagBySlug, tags } from "@/lib/data";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

// No revalidate = SSR (rendered on every request)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) return { title: "Not Found" };
  return { title: `${tag.name} — Inkwell`, description: tag.description };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) notFound();
  const articles = getArticlesByTag(tag.name);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: "10px", fontWeight: 500 }}>Topic</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "12px" }}>{tag.name}</h1>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 300, maxWidth: "480px", lineHeight: 1.6 }}>{tag.description}</p>
        <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginTop: "8px" }}>{tag.count.toLocaleString()} stories</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
        {tags.map((t) => (
          <Link key={t.id} href={`/tag/${t.slug}`} className="tag-chip" style={t.slug === slug ? { borderColor: "var(--accent-2)", color: "var(--accent)" } : {}}>
            {t.name}
          </Link>
        ))}
      </div>

      <div style={{ maxWidth: "680px" }}>
        {articles.length === 0 ? (
          <p style={{ color: "var(--text-tertiary)", fontSize: "1rem" }}>No articles yet in this topic.</p>
        ) : (
          articles.map((article) => <ArticleCard key={article.id} article={article} />)
        )}
      </div>
    </div>
  );
}
