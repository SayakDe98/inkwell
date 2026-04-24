"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, PenLine, Bookmark, Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/tag", label: "Topics" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileOpen(false);
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--border)", background: "rgba(10,10,10,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>

        {/* Logo */}
        <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--text-primary)", textDecoration: "none", letterSpacing: "-0.02em", flexShrink: 0 }}>
          Inkwell
        </Link>

        {/* Center links */}
        <div className="desktop-center-nav" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{ padding: "6px 12px", borderRadius: "7px", color: isActive(href) ? "var(--text-primary)" : "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: isActive(href) ? 500 : 400, background: isActive(href) ? "var(--surface-2)" : "transparent", transition: "all 0.15s" }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="desktop-right-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Link href="/search" title="Search" style={{ padding: "8px", borderRadius: "8px", color: pathname === "/search" ? "var(--accent)" : "var(--text-secondary)", display: "flex", alignItems: "center", textDecoration: "none", transition: "color 0.15s" }}>
            <Search size={17} />
          </Link>
          <Link href="/bookmarks" title="Bookmarks" style={{ padding: "8px", borderRadius: "8px", color: pathname === "/bookmarks" ? "var(--accent)" : "var(--text-secondary)", display: "flex", alignItems: "center", textDecoration: "none", transition: "color 0.15s" }}>
            <Bookmark size={17} />
          </Link>

          <div style={{ width: "1px", height: "20px", background: "var(--border-2)", margin: "0 4px" }} />

          <Link href="/write/editor" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid var(--border-2)", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-2)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
            <PenLine size={13} />
            Write
          </Link>

          {/* Auth section */}
          {loading ? (
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--surface-2)" }} />
          ) : user ? (
            /* User dropdown */
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 4px 4px 4px", borderRadius: "9999px", border: dropdownOpen ? "1px solid var(--accent-2)" : "1px solid var(--border-2)", background: "transparent", cursor: "pointer", transition: "all 0.15s" }}
              >
                <Image src={user.avatar} alt={user.name} width={28} height={28} style={{ borderRadius: "50%" }} />
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown size={13} color="var(--text-tertiary)" style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", marginRight: "4px" }} />
              </button>

              {dropdownOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: "220px", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", zIndex: 100 }}>
                  {/* User info */}
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "2px" }}>{user.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{user.email}</p>
                  </div>
                  {/* Menu items */}
                  {[
                    { href: `/author/u_demo`, icon: <User size={14} />, label: "Your profile" },
                    { href: "/bookmarks", icon: <Bookmark size={14} />, label: "Bookmarks" },
                    { href: "/write/editor", icon: <PenLine size={14} />, label: "Write a story" },
                  ].map(({ href, icon, label }) => (
                    <Link key={label} href={href} onClick={() => setDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem", transition: "background 0.1s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--surface-2)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                      {icon}
                      {label}
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid var(--border)" }}>
                    <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", width: "100%", background: "none", border: "none", color: "#f87171", fontSize: "0.875rem", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "background 0.1s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest buttons */
            <div style={{ display: "flex", gap: "6px" }}>
              <Link href="/login" style={{ padding: "7px 14px", borderRadius: "8px", border: "1px solid var(--border-2)", color: "var(--text-secondary)", fontSize: "0.8rem", textDecoration: "none", transition: "all 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
                Sign in
              </Link>
              <Link href="/register" style={{ padding: "7px 16px", borderRadius: "8px", background: "var(--accent)", color: "#0a0a0a", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "opacity 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}>
                Get started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{ display: "none", padding: "8px", background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "10px", background: "var(--surface)", marginBottom: "8px" }}>
              <Image src={user.avatar} alt={user.name} width={36} height={36} style={{ borderRadius: "50%" }} />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>{user.name}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{user.email}</p>
              </div>
            </div>
          )}
          {[
            { href: "/", label: "Home" },
            { href: "/tag", label: "Topics" },
            { href: "/search", label: "Search" },
            { href: "/bookmarks", label: "Bookmarks" },
            { href: "/about", label: "About" },
            { href: "/write/editor", label: "Write" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", padding: "10px 12px", borderRadius: "8px", color: isActive(href) ? "var(--accent)" : "var(--text-secondary)", textDecoration: "none", fontSize: "0.9375rem", background: isActive(href) ? "rgba(232,213,163,0.06)" : "transparent" }}>
              {label}
            </Link>
          ))}
          <div style={{ marginTop: "8px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
            {user ? (
              <button onClick={handleLogout} style={{ width: "100%", padding: "11px", borderRadius: "9999px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#f87171", fontSize: "0.9375rem", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <LogOut size={15} />
                Sign out
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/login" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "11px", borderRadius: "9999px", border: "1px solid var(--border-2)", color: "var(--text-secondary)", fontSize: "0.9375rem", textDecoration: "none", textAlign: "center" }}>Sign in</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "11px", borderRadius: "9999px", background: "var(--accent)", color: "#0a0a0a", fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>Get started free</Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-center-nav { display: none !important; }
          .desktop-right-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
