"use client";

import Link from "next/link";
import LogoSymbol from "@/components/LogoSymbol";

const navLinks = [
  { href: "/saas-marketing", label: "SaaS Marketing" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.instagram.com/vigyapunofficial/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/vigyapun/", label: "LinkedIn" },
  { href: "https://www.youtube.com/@vigyapunofficial", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="site-footer section-dark">
      <div className="container-vw">
        <div className="site-footer__grid">
          {/* Brand */}
          <div className="site-footer__brand">
            <Link href="/" aria-label="Vigyapun Limitless home" className="no-underline">
              <LogoSymbol className="site-footer__logo" />
            </Link>
            <p className="site-footer__tagline">
              Premium SaaS marketing, demand generation and growth strategy for
              B2B brands that refuse to blend in.
            </p>
          </div>

          {/* Navigation */}
          <nav className="site-footer__col" aria-label="Footer">
            <p className="site-footer__heading">Explore</p>
            <ul className="site-footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="site-footer__col">
            <p className="site-footer__heading">Contact</p>
            <ul className="site-footer__list">
              <li>
                <a href="mailto:workwithvigyapun@gmail.com" className="site-footer__link">
                  workwithvigyapun@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917014207724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  WhatsApp: +91 70142 07724
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="site-footer__col">
            <p className="site-footer__heading">Follow</p>
            <ul className="site-footer__list">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__link"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="site-footer__bottom">
          <p className="text-tag">
            © {new Date().getFullYear()} Vigyapun Limitless™. All rights reserved.
          </p>
          <p className="text-tag">SaaS Marketing Agency</p>
        </div>
      </div>
    </footer>
  );
}
