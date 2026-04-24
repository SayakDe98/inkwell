"use client";
import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Heart, Reply } from "lucide-react";

interface Comment {
  id: string;
  author: { name: string; avatar: string };
  content: string;
  publishedAt: string;
  claps: number;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    author: { name: "Dev Patel", avatar: "https://i.pravatar.cc/150?img=33" },
    content:
      "This resonated deeply. I've been on teams that celebrated adding features and ignored the compounding cost of complexity. The gardening analogy is perfect.",
    publishedAt: "2025-01-16T08:00:00Z",
    claps: 34,
  },
  {
    id: "2",
    author: { name: "Lena Fischer", avatar: "https://i.pravatar.cc/150?img=5" },
    content:
      "The bit about requirements often arriving over-specified is so true. Half the time asking 'why' once or twice collapses the scope considerably.",
    publishedAt: "2025-01-15T20:30:00Z",
    claps: 21,
  },
  {
    id: "3",
    author: { name: "Ravi Shankar", avatar: "https://i.pravatar.cc/150?img=55" },
    content:
      "Bookmarked. I'm going to share this with my team before our next sprint planning. We have a sprint board that's basically a wish list at this point.",
    publishedAt: "2025-01-15T14:15:00Z",
    claps: 12,
  },
];

export default function CommentsSection({ count }: { count: number }) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const newComment: Comment = {
        id: String(Date.now()),
        author: { name: "You", avatar: "https://i.pravatar.cc/150?img=70" },
        content: text.trim(),
        publishedAt: new Date().toISOString(),
        claps: 0,
      };
      setComments((c) => [newComment, ...c]);
      setText("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <section style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 80px" }}>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.5rem",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          marginBottom: "28px",
        }}
      >
        Responses ({count})
      </h2>

      {/* Write a comment */}
      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          marginBottom: "40px",
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What are your thoughts?"
          rows={3}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontSize: "0.9375rem",
            lineHeight: 1.65,
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            resize: "none",
          }}
        />
        {text.trim() && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "12px",
              borderTop: "1px solid var(--border)",
              paddingTop: "12px",
            }}
          >
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                background: submitting ? "var(--surface-3)" : "var(--accent)",
                color: submitting ? "var(--text-tertiary)" : "#0a0a0a",
                border: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans)",
                transition: "all 0.2s",
              }}
            >
              {submitting ? "Publishing…" : "Respond"}
            </button>
          </div>
        )}
      </div>

      {/* Comment list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const [clapped, setClapped] = useState(false);
  const [claps, setClaps] = useState(comment.claps);

  const handleClap = () => {
    if (!clapped) {
      setClaps((c) => c + 1);
      setClapped(true);
    }
  };

  return (
    <div
      style={{
        padding: "24px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <Image
          src={comment.author.avatar}
          alt={comment.author.name}
          width={36}
          height={36}
          style={{ borderRadius: "50%", flexShrink: 0, marginTop: "2px" }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
              {comment.author.name}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              {formatDistanceToNow(new Date(comment.publishedAt), { addSuffix: true })}
            </span>
          </div>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              fontWeight: 300,
              marginBottom: "12px",
            }}
          >
            {comment.content}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={handleClap}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "none",
                border: "none",
                color: clapped ? "var(--accent)" : "var(--text-tertiary)",
                fontSize: "0.8rem",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.15s",
              }}
            >
              <Heart size={13} fill={clapped ? "currentColor" : "none"} />
              {claps > 0 ? claps : ""}
            </button>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "none",
                border: "none",
                color: "var(--text-tertiary)",
                fontSize: "0.8rem",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Reply size={13} />
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
