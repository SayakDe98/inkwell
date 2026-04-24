"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bold, Italic, Quote, List, Minus, Eye, EyeOff,
  ArrowLeft, Image as ImageIcon, Link as LinkIcon,
} from "lucide-react";

type Block = { type: "h1" | "h2" | "p" | "blockquote" | "li"; text: string };

const PLACEHOLDER_COVER = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80";

export default function EditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([{ type: "p", text: "" }]);
  const [activeBlock, setActiveBlock] = useState(0);
  const [preview, setPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage] = useState(PLACEHOLDER_COVER);
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim() && tags.length < 5) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, "");
      if (!tags.includes(newTag)) setTags((t) => [...t, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags((t) => t.filter((x) => x !== tag));

  const updateBlock = (i: number, text: string) => {
    setBlocks((b) => b.map((block, idx) => (idx === i ? { ...block, text } : block)));
  };

  const setBlockType = (i: number, type: Block["type"]) => {
    setBlocks((b) => b.map((block, idx) => (idx === i ? { ...block, type } : block)));
  };

  const handleBlockKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, i: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newBlocks = [...blocks];
      newBlocks.splice(i + 1, 0, { type: "p", text: "" });
      setBlocks(newBlocks);
      setActiveBlock(i + 1);
      setTimeout(() => textareaRefs.current[i + 1]?.focus(), 10);
    }
    if (e.key === "Backspace" && blocks[i].text === "" && blocks.length > 1) {
      e.preventDefault();
      const newBlocks = blocks.filter((_, idx) => idx !== i);
      setBlocks(newBlocks);
      const prev = Math.max(0, i - 1);
      setActiveBlock(prev);
      setTimeout(() => textareaRefs.current[prev]?.focus(), 10);
    }
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 1800);
  };

  const wordCount = [title, subtitle, ...blocks.map((b) => b.text)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const blockStyle = (type: Block["type"]): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      resize: "none",
      fontFamily: type === "blockquote" ? "var(--font-serif)" : "var(--font-sans)",
      color: "var(--text-primary)",
      lineHeight: 1.8,
      padding: 0,
      overflow: "hidden",
    };
    if (type === "h1") return { ...base, fontSize: "1.75rem", fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.02em" };
    if (type === "h2") return { ...base, fontSize: "1.3rem", fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.01em" };
    if (type === "blockquote") return { ...base, fontSize: "1.2rem", fontStyle: "italic", color: "var(--accent)", paddingLeft: "16px", borderLeft: "2px solid var(--accent-2)" };
    if (type === "li") return { ...base, fontSize: "1rem", paddingLeft: "20px", fontWeight: 300, color: "#ccc8c2" };
    return { ...base, fontSize: "1rem", fontWeight: 300, color: "#ccc8c2" };
  };

  if (published) {
    return (
      <div style={{ maxWidth: "480px", margin: "120px auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✦</div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Published.</h2>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.6, marginBottom: "32px" }}>Your article is live on Inkwell. Share it with the world.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => router.push("/")} style={{ padding: "10px 24px", borderRadius: "9999px", border: "1px solid var(--border-2)", background: "transparent", color: "var(--text-secondary)", fontSize: "0.875rem", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Back to feed</button>
          <button onClick={() => { setPublished(false); setTitle(""); setSubtitle(""); setBlocks([{ type: "p", text: "" }]); setTags([]); }} style={{ padding: "10px 24px", borderRadius: "9999px", background: "var(--accent)", color: "#0a0a0a", border: "none", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)" }}>Write another</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Toolbar */}
      <div style={{ position: "sticky", top: "56px", zIndex: 40, borderBottom: "1px solid var(--border)", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", padding: "0 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", height: "48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <button onClick={() => router.push("/")} style={{ padding: "6px 8px", borderRadius: "6px", border: "none", background: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex", alignItems: "center" }}><ArrowLeft size={16} /></button>
            <div style={{ width: "1px", height: "20px", background: "var(--border-2)", margin: "0 6px" }} />
            {([
              { icon: <Bold size={15} />, label: "Bold (not implemented)", action: () => {} },
              { icon: <Italic size={15} />, label: "Italic", action: () => {} },
              { icon: <Quote size={15} />, label: "Blockquote", action: () => setBlockType(activeBlock, "blockquote") },
              { icon: <List size={15} />, label: "List item", action: () => setBlockType(activeBlock, "li") },
              { icon: <Minus size={15} />, label: "Paragraph", action: () => setBlockType(activeBlock, "p") },
              { icon: <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>H2</span>, label: "Heading 2", action: () => setBlockType(activeBlock, "h2") },
            ]).map(({ icon, label, action }, i) => (
              <button key={i} onClick={action} title={label} style={{ padding: "6px 8px", borderRadius: "6px", border: "none", background: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", transition: "color 0.15s, background 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
              >{icon}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{wordCount} words</span>
            <button onClick={() => setPreview((p) => !p)} style={{ padding: "6px 8px", borderRadius: "6px", border: "none", background: "none", color: preview ? "var(--accent)" : "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem" }}>
              {preview ? <EyeOff size={15} /> : <Eye size={15} />}
              {preview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={handlePublish}
              disabled={!title.trim() || publishing}
              style={{ padding: "7px 18px", borderRadius: "9999px", background: !title.trim() || publishing ? "var(--surface-3)" : "var(--accent)", color: !title.trim() || publishing ? "var(--text-tertiary)" : "#0a0a0a", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: !title.trim() || publishing ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", transition: "all 0.2s" }}
            >
              {publishing ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {!preview ? (
          <>
            {/* Cover image hint */}
            <div style={{ marginBottom: "32px", display: "flex", gap: "10px" }}>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px dashed var(--border-2)", background: "none", color: "var(--text-tertiary)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                <ImageIcon size={14} />
                Add cover image
              </button>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px dashed var(--border-2)", background: "none", color: "var(--text-tertiary)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                <LinkIcon size={14} />
                Embed link
              </button>
            </div>

            {/* Title */}
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              rows={1}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                resize: "none",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: "16px",
                overflow: "hidden",
              }}
              onInput={(e) => {
                const t = e.currentTarget;
                t.style.height = "auto";
                t.style.height = t.scrollHeight + "px";
              }}
            />

            {/* Subtitle */}
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Add a subtitle…"
              rows={1}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                resize: "none",
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                marginBottom: "40px",
                fontWeight: 300,
                overflow: "hidden",
              }}
              onInput={(e) => {
                const t = e.currentTarget;
                t.style.height = "auto";
                t.style.height = t.scrollHeight + "px";
              }}
            />

            <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "40px" }} />

            {/* Body blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {blocks.map((block, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <textarea
                    ref={(el) => { textareaRefs.current[i] = el; }}
                    value={block.text}
                    onChange={(e) => updateBlock(i, e.target.value)}
                    onFocus={() => setActiveBlock(i)}
                    onKeyDown={(e) => handleBlockKeyDown(e, i)}
                    placeholder={i === 0 ? "Tell your story…" : ""}
                    rows={1}
                    style={{
                      ...blockStyle(block.type),
                      display: "block",
                      minHeight: "32px",
                    }}
                    onInput={(e) => {
                      const t = e.currentTarget;
                      t.style.height = "auto";
                      t.style.height = t.scrollHeight + "px";
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500, marginBottom: "12px" }}>Tags (up to 5)</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                {tags.map((tag) => (
                  <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "9999px", border: "1px solid var(--accent-2)", color: "var(--accent)", fontSize: "0.8rem" }}>
                    {tag}
                    <button onClick={() => removeTag(tag)} style={{ background: "none", border: "none", color: "var(--accent-2)", cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
                  </span>
                ))}
                {tags.length < 5 && (
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder={tags.length === 0 ? "Add a tag, press Enter…" : "Add another…"}
                    style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: "0.875rem", fontFamily: "var(--font-sans)", minWidth: "160px" }}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          /* Preview mode */
          <div>
            {title && <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "16px" }}>{title}</h1>}
            {subtitle && <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 300, marginBottom: "32px", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>{subtitle}</p>}
            <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "32px" }} />
            <div className="prose">
              {blocks.map((block, i) => {
                if (!block.text) return null;
                if (block.type === "h1") return <h1 key={i} style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, marginBottom: "16px" }}>{block.text}</h1>;
                if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
                if (block.type === "blockquote") return <blockquote key={i}>{block.text}</blockquote>;
                if (block.type === "li") return <p key={i} style={{ paddingLeft: "20px", marginBottom: "8px" }}>• {block.text}</p>;
                return <p key={i}>{block.text}</p>;
              })}
            </div>
            {tags.length > 0 && (
              <div style={{ display: "flex", gap: "8px", marginTop: "32px", flexWrap: "wrap" }}>
                {tags.map((tag) => <span key={tag} className="tag-chip">{tag}</span>)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
