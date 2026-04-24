// SSR: Author profiles rendered fresh on each request
export const dynamic = "force-dynamic";

import { getAuthorById, getArticlesByAuthor } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import FollowButton from "@/components/FollowButton";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = getAuthorById(id);
  if (!author) return { title: "Not Found" };
  return { title: `${author.name} — Inkwell`, description: author.bio };
}

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = getAuthorById(id);
  if (!author) notFound();

  const articles = getArticlesByAuthor(id);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
      {/* Header banner */}
      <div
        style={{
          height: "180px",
          background: "linear-gradient(135deg, #1a1610 0%, #0f0f0f 50%, #121810 100%)",
          borderRadius: "0 0 12px 12px",
          marginBottom: "0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(196,169,109,0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Profile section */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 0 48px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "-40px",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Image
            src={author.avatar}
            alt={author.name}
            width={80}
            height={80}
            style={{
              borderRadius: "50%",
              border: "3px solid var(--background)",
              background: "var(--surface-2)",
            }}
          />
          <FollowButton authorName={author.name} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2rem",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "10px",
          }}
        >
          {author.name}
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            fontWeight: 300,
            maxWidth: "520px",
            marginBottom: "24px",
          }}
        >
          {author.bio}
        </p>

        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[
            { label: "Followers", value: author.followers.toLocaleString() },
            { label: "Following", value: author.following.toLocaleString() },
            { label: "Articles", value: author.articles },
          ].map(({ label, value }) => (
            <div key={label}>
              <span
                style={{
                  display: "block",
                  fontSize: "1.25rem",
                  fontFamily: "var(--font-serif)",
                  color: "var(--text-primary)",
                }}
              >
                {value}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{label}</span>
            </div>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "40px 0 8px" }} />

        <h2
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          Published
        </h2>

        {articles.length === 0 ? (
          <p style={{ color: "var(--text-tertiary)", padding: "40px 0" }}>No articles yet.</p>
        ) : (
          articles.map((article) => <ArticleCard key={article.id} article={article} />)
        )}
      </div>
    </div>
  );
}
