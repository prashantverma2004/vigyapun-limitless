"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/RevealText";
import SectionBackground from "@/components/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

const story = [
  {
    title: "THE VISION",
    text: "Founded in 2024 by Harsh Agarwal, Vigyapun Limitless is more than a marketing agency — we are a growth partner for ambitious B2B SaaS brands. We combine strategy, creativity and performance marketing to help SaaS companies stand out, scale faster and build lasting market presence.",
  },
  {
    title: "THE CRAFT",
    text: "In a market crowded with noise, we specialize in making SaaS brands impossible to ignore. We blend distinctive branding, demand generation, content, paid media, SEO and data-driven performance to turn attention into measurable growth.",
  },
  {
    title: "THE ESSENCE",
    text: "We don't just market brands — we build identities, create demand and engineer growth systems that scale. At Vigyapun Limitless, we help SaaS companies turn complex products into clear stories, strong brands and sustainable business growth.",
  },
];

const values = [
  {
    title: "Obsession Over Obligation",
    description:
      "We don't clock in and out. We become obsessed with your growth because your success is our portfolio.",
  },
  {
    title: "Strategy Before Tactics",
    description:
      "Every campaign starts with a hypothesis. We think before we act, and measure before we scale.",
  },
  {
    title: "Radical Transparency",
    description:
      "No black boxes. You see every metric, every decision, every dollar. If something isn't working, you'll know first.",
  },
  {
    title: "Creative Courage",
    description:
      "Safe marketing is invisible marketing. We push creative boundaries because standing out is the only strategy that compounds.",
  },
];

const team = [
  {
    name: "Harsh Agarwal",
    role: "Founder",
    image: "/images/team/harsh-agarwal.jpg",
    position: "78% 30%",
  },
  {
    name: "Rahul Naidu",
    role: "Co-Founder",
    image: "/images/team/rahul-naidu-cofounder.jpg",
    position: "50% 42%",
  },
  {
    name: "Prashant Verma",
    role: "Developer",
    image: "/images/team/prashant-verma-developer.jpg",
    position: "50% 20%",
  },
];

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const heroText = heroTextRef.current;
    const heroBg = heroBgRef.current;
    if (!hero || !heroText || !heroBg) return;

    gsap.to(heroBg, {
      scale: 1.15,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(heroText, {
      y: -60,
      opacity: 0,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "50% top",
        scrub: 1,
      },
    });

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
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url(/images/about-hero-bg.svg)" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div ref={heroTextRef} className="relative z-10 container-vw text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className="hero-line w-full text-center flex flex-col items-center">
            <p className="text-label text-[var(--color-accent)] mb-6 tracking-[0.3em] text-center">
              ABOUT US
            </p>
          </div>
          <div className="hero-line w-full text-center flex flex-col items-center">
            <h1 className="text-display-xl text-white text-center w-full">WE ARE</h1>
          </div>
          <div className="hero-line w-full text-center flex flex-col items-center">
            <h1 className="text-display-xl text-white text-center w-full">VIGYAPUN</h1>
          </div>
        </div>
      </section>

      {/* ─── Story ─── */}
      <section className="section-dark section-spacing">
        <div className="container-vw max-w-4xl text-center mx-auto">
          <RevealText>
            <p className="text-label text-[var(--color-accent)] mb-6 text-center">
              OUR STORY
            </p>
          </RevealText>
          <div className="story-list">
            {story.map((block, i) => (
              <div
                key={block.title}
                className={`story-row ${i % 2 === 1 ? "story-row--right" : ""}`}
              >
                <RevealText delay={0.1} className="story-block">
                  <p className="text-label text-white story-block__title">
                    {block.title}
                  </p>
                  <p className="text-editorial text-[var(--color-light-gray)]">
                    {block.text}
                  </p>
                </RevealText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/about-values-bg.svg" />
        <div className="container-vw relative z-10 text-center">
          <RevealText>
            <p className="text-label text-[var(--color-gray)] mb-4 text-center">
              OUR VALUES
            </p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-display-md text-white mb-16 text-center">
              What we believe
            </h2>
          </RevealText>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto w-full"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            {values.map((value, i) => (
              <RevealText key={i} delay={0.1 * (i + 1)}>
                <div className="border-t border-white/10 pt-8 text-center flex flex-col items-center">
                  <h3
                    className="text-white mb-4 text-center"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                      fontWeight: 600,
                    }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-editorial text-[var(--color-gray)] text-center max-w-md mx-auto">
                    {value.description}
                  </p>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="section-dark section-spacing">
        <div className="container-vw text-center">
          <RevealText>
            <p className="text-label text-[var(--color-accent)] mb-4 text-center">
              THE TEAM
            </p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-display-md text-white mb-16 text-center">
              SaaS veterans, not generalists
            </h2>
          </RevealText>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 md:gap-12 max-w-4xl mx-auto w-full"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            {team.map((member, i) => (
              <RevealText key={member.name} delay={0.08 * (i + 1)}>
                <div className="text-center flex flex-col items-center">
                  <div
                    className="w-full relative overflow-hidden bg-[var(--color-charcoal)]"
                    style={{ aspectRatio: "3/4", borderRadius: "2px", marginBottom: "1.5rem", maxWidth: "320px" }}
                  >
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(max-width: 640px) 320px, 300px"
                      style={{ objectFit: "cover", objectPosition: member.position }}
                    />
                  </div>
                  <h3
                    className="text-white text-center"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-tag text-[var(--color-gray)] text-center"
                    style={{ marginTop: "0.375rem" }}
                  >
                    {member.role}
                  </p>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-dark section-spacing">
        <div className="container-vw text-center">
          <RevealText className="flex flex-col items-center">
            <h2 className="text-display-lg text-white mb-8 max-w-4xl text-center">
              JOIN THE BRANDS THAT CHOSE LIMITLESS
            </h2>
          </RevealText>
          <RevealText delay={0.15}>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-pill btn-pill--filled no-underline">
                WORK WITH US <span className="arrow-icon">→</span>
              </Link>
              <Link href="/work" className="btn-pill text-white no-underline">
                SEE OUR WORK <span className="arrow-icon">→</span>
              </Link>
            </div>
          </RevealText>
        </div>
      </section>
    </>
  );
}
