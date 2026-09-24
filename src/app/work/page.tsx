"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/RevealText";
import SectionBackground from "@/components/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Agrani Education Center", logo: "/images/clients/agrani-education-center.jpg" },
  { name: "Femagiene", logo: "/images/clients/femagiene.jpg" },
  { name: "PUNO", logo: "/images/clients/puno.jpg" },
  { name: "JYANA Personal Care", logo: "/images/clients/jyana-personal-care.jpg" },
  { name: "Jaipur Acres Group", logo: "/images/clients/jaipur-acres-group.jpg" },
  { name: "The Grand Farms Jaipur", logo: "/images/clients/the-grand-farms-jaipur.jpg" },
  { name: "Alphixx Marketing Solution", logo: "/images/clients/alphixx-marketing-solution.jpg" },
  { name: "Yaavii", logo: "/images/clients/yaavii.jpg" },
  { name: "Raptor Holic Inc.", logo: "/images/clients/raptor-holic.jpg" },
  { name: "Skylen", logo: "/images/clients/skylen.jpg" },
  { name: "Jaipur Ride Mafia", logo: "/images/clients/jaipur-ride-mafia.jpg" },
  { name: "Sarodha", logo: "/images/clients/sarodha.jpg" },
  { name: "Modifable Clothing", logo: "/images/clients/modifable-clothing.jpg" },
];

export default function Work() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroText = heroTextRef.current;
    if (!heroText) return;

    const lines = heroText.querySelectorAll(".hero-line");
    gsap.fromTo(
      lines,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden section-dark text-center"
        style={{ paddingTop: "calc(var(--header-height) + 3rem)", paddingBottom: "clamp(4rem, 10vw, 8rem)" }}
      >
        <SectionBackground src="/images/work-hero-bg.svg" />
        <div ref={heroTextRef} className="container-vw relative z-10 text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className="hero-line w-full text-center flex flex-col items-center">
            <p className="text-label text-[var(--color-accent)] mb-6 tracking-[0.3em] text-center">
              CASE STUDIES
            </p>
          </div>
          <div className="hero-line w-full text-center flex flex-col items-center">
            <h1 className="text-display-xl text-white text-center w-full">SELECTED WORK</h1>
          </div>
          <div className="hero-line mt-6 w-full text-center flex flex-col items-center">
            <p className="text-editorial text-[var(--color-light-gray)] max-w-xl text-center mx-auto">
              Real results for real SaaS companies. Every project is a partnership
              built on strategy, creativity, and relentless execution.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Case Studies Grid ─── */}
      <section className="section-dark section-spacing">
        <div className="container-vw text-center">
          <RevealText>
            <p className="text-label text-[var(--color-accent)] mb-4 text-center">
              FEATURED PROJECTS
            </p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-display-md text-white mb-16 text-center">
              Brands we&apos;ve made limitless
            </h2>
          </RevealText>

          <ul className="client-grid" aria-label="Brands we have worked with">
            {clients.map((client, i) => (
              <li key={client.name} className="client-tile">
                <RevealText delay={0.04 * (i % 5)} className="client-tile__inner">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                    style={{ objectFit: "cover" }}
                  />
                </RevealText>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/work-cta-bg.svg" />
        <div className="container-vw relative z-10 text-center flex flex-col items-center">
          <RevealText className="flex flex-col items-center">
            <h2 className="text-display-lg text-white mb-8 max-w-4xl text-center">
              YOUR BRAND COULD BE NEXT
            </h2>
          </RevealText>
          <RevealText delay={0.15} className="flex flex-col items-center">
            <p className="text-editorial text-[var(--color-light-gray)] max-w-xl mb-10 text-center">
              Let&apos;s discuss how we can create extraordinary results for your SaaS brand.
            </p>
          </RevealText>
          <RevealText delay={0.3} className="flex flex-col items-center">
            <Link href="/contact" className="btn-pill btn-pill--filled no-underline">
              START A PROJECT <span className="arrow-icon">→</span>
            </Link>
          </RevealText>
        </div>
      </section>
    </>
  );
}
