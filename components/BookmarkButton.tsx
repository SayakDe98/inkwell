"use client";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

export default function BookmarkButton({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("inkwell-bookmarks") || "[]");
    setSaved(stored.some((b: { id: string }) => b.id === articleId));
  }, [articleId]);

  const toggle = () => {
    const stored: { id: string; title: string }[] = JSON.parse(
      localStorage.getItem("inkwell-bookmarks") || "[]"
    );
    let updated;
    if (saved) {
      updated = stored.filter((b) => b.id !== articleId);
    } else {
      updated = [...stored, { id: articleId, title: articleTitle }];
    }
    localStorage.setItem("inkwell-bookmarks", JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <button
      onClick={toggle}
      title={saved ? "Remove bookmark" : "Bookmark this article"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        borderRadius: "9999px",
        border: saved ? "1px solid var(--accent-2)" : "1px solid var(--border-2)",
        background: saved ? "rgba(232,213,163,0.08)" : "transparent",
        color: saved ? "var(--accent)" : "var(--text-secondary)",
        fontSize: "0.875rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
