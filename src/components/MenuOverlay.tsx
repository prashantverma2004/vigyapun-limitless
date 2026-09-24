"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "SaaS Marketing", href: "/saas-marketing" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current;
    const footer = footerRef.current;
    if (!overlay || !links || !footer) return;

    const linkEls = links.querySelectorAll(".menu-link");
    const footerEls = footer.querySelectorAll(".menu-footer-item");

    if (isOpen) {
      gsap.to(overlay, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        linkEls,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          delay: 0.3,
          ease: "power3.out",
        }
      );
      gsap.fromTo(
        footerEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.6,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(linkEls, {
        y: -40,
        opacity: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.in",
      });
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        delay: 0.2,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="menu-overlay"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(15rem, 40vw, 40rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            letterSpacing: "-0.05em",
          }}
        >
          VL
        </span>
      </div>

      <div className="container-vw relative z-10 flex flex-col justify-center h-full py-[var(--header-height)]">
        <div ref={linksRef} className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="menu-link menu-overlay__link"
            >
              <span>{link.label}</span>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>

        <div
          ref={footerRef}
          className="mt-auto pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="menu-footer-item">
            <p className="text-tag text-[var(--color-gray)] mb-2">Get in touch</p>
            <a
              href="mailto:hello@vigyapun.com"
              className="text-[var(--color-black)] no-underline text-lg"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              hello@vigyapun.com
            </a>
          </div>
          <div className="menu-footer-item flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tag text-[var(--color-black)] no-underline hover:opacity-50 transition-opacity"
            >
              IG
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tag text-[var(--color-black)] no-underline hover:opacity-50 transition-opacity"
            >
              LN
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tag text-[var(--color-black)] no-underline hover:opacity-50 transition-opacity"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
