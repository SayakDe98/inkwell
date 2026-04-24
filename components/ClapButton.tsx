"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function ClapButton({ initialClaps }: { initialClaps: number }) {
  const [claps, setClaps] = useState(initialClaps);
  const [clapped, setClapped] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleClap = () => {
    setClaps((c) => c + 1);
    setClapped(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 300);
  };

  return (
    <button
      onClick={handleClap}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        borderRadius: "9999px",
        border: `1px solid ${clapped ? "var(--accent-2)" : "var(--border-2)"}`,
        background: clapped ? "rgba(232,213,163,0.08)" : "transparent",
        color: clapped ? "var(--accent)" : "var(--text-secondary)",
        fontSize: "0.875rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: burst ? "scale(1.08)" : "scale(1)",
      }}
    >
      <Heart size={15} fill={clapped ? "currentColor" : "none"} />
      {claps.toLocaleString()}
    </button>
  );
}
