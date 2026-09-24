"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoSymbol, { LOGO_GOLD } from "@/components/LogoSymbol";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "SaaS Marketing", href: "/saas-marketing" },
  { label: "Services", href: "/services" },
  { label: "Work / Case Studies", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="header"
      style={{
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(10, 10, 10, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
        mixBlendMode: scrolled ? "normal" : "difference",
      }}
    >
      <div className="w-full flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-label tracking-[0.2em] text-white no-underline shrink-0 inline-flex items-center gap-2.5"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.8125rem",
          }}
          aria-label="Vigyapun Limitless home"
        >
          <LogoSymbol className="h-[18px] md:h-[20px] w-auto shrink-0" />
          <span className="inline-flex items-baseline gap-[0.45em]" aria-hidden="true">
            <span>VIGYAPUN</span>
            <span style={{ fontSize: "0.6875rem", color: LOGO_GOLD }}>LIMITLESS™</span>
          </span>
        </Link>

        {/* Navigation Links directly in Header */}
        <nav
          className="flex items-center gap-4 sm:gap-6 md:gap-7 overflow-x-auto no-scrollbar py-1"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-tag tracking-[0.14em] uppercase transition-all whitespace-nowrap py-1 ${
                  isActive
                    ? "text-white font-semibold border-b border-white"
                    : "text-white/70 hover:text-white"
                }`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6875rem",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
