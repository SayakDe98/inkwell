"use client";
import { useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";

export default function FollowButton({ authorName }: { authorName: string }) {
  const [following, setFollowing] = useState(false);

  return (
    <button
      onClick={() => setFollowing((f) => !f)}
      title={following ? `Unfollow ${authorName}` : `Follow ${authorName}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "9px 20px",
        borderRadius: "9999px",
        border: following ? "1px solid var(--accent-2)" : "1px solid var(--border-2)",
        background: following ? "rgba(232,213,163,0.08)" : "transparent",
        color: following ? "var(--accent)" : "var(--text-secondary)",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "var(--font-sans)",
      }}
    >
      {following ? <UserCheck size={15} /> : <UserPlus size={15} />}
      {following ? "Following" : "Follow"}
    </button>
  );
}
