"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "80px", padding: "48px 24px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }} className="footer-grid">
          <div style={{ gridColumn: "span 1" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--text-primary)", letterSpacing: "-0.02em", display: "block", marginBottom: "12px" }}>Inkwell</span>
            <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", lineHeight: 1.65, fontWeight: 300, maxWidth: "220px" }}>
              A home for long-form thinking on technology, design, and ideas.
            </p>
          </div>
          {[
            {
              heading: "Explore",
              links: [
                { label: "Home", href: "/" },
                { label: "Topics", href: "/tag" },
                { label: "Search", href: "/search" },
                { label: "Bookmarks", href: "/bookmarks" },
              ],
            },
            {
              heading: "Publish",
              links: [
                { label: "Start writing", href: "/write" },
                { label: "Open editor", href: "/write/editor" },
                { label: "About Inkwell", href: "/about" },
              ],
            },
            {
              heading: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
              ],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500, marginBottom: "16px" }}>{heading}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map(({ label, href }) => (
                  <Link key={label} href={href} style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.15s", fontWeight: 300 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
            © {new Date().getFullYear()} Inkwell. A place for curious minds.
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
            Built with Next.js · ISR + SSG + SSR + CSR
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
