import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "120px auto",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "6rem",
          color: "var(--border-2)",
          lineHeight: 1,
          marginBottom: "24px",
          letterSpacing: "-0.05em",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.75rem",
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: "12px",
          letterSpacing: "-0.02em",
        }}
      >
        This page doesn&apos;t exist.
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          fontWeight: 300,
          marginBottom: "36px",
        }}
      >
        The article may have been moved, deleted, or you may have followed a broken link.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            padding: "10px 24px",
            borderRadius: "9999px",
            background: "var(--accent)",
            color: "#0a0a0a",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          Back to feed
        </Link>
        <Link
          href="/search"
          style={{
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "1px solid var(--border-2)",
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          Search articles
        </Link>
      </div>
    </div>
  );
}
