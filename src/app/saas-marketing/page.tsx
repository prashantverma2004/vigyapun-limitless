"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendlyButton from "@/components/CalendlyButton";
import RevealText from "@/components/RevealText";
import StatsGrid from "@/components/StatsGrid";
import ParallaxImage from "@/components/ParallaxImage";
import SectionBackground from "@/components/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    title: "Demand Generation",
    description:
      "Full-funnel pipeline, from first touch to closed-won.",
    image: "/images/case-4.jpg",
  },
  {
    number: "02",
    title: "Brand Positioning",
    description:
      "Positioning that makes your SaaS impossible to ignore.",
    image: "/images/case-3.jpg",
  },
  {
    number: "03",
    title: "Growth Engineering",
    description:
      "Experiments across conversion, pricing and retention.",
    image: "/images/case-1.jpg",
  },
];

const stats = [
  { value: "147", suffix: "M+", label: "Pipeline Generated" },
  { value: "3.2", suffix: "×", label: "Avg. ARR Growth" },
  { value: "89", suffix: "%", label: "Lead-to-Opp Rate Lift" },
  { value: "40", suffix: "+", label: "SaaS Brands Scaled" },
];

export default function SaaSMarketing() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const heroText = heroTextRef.current;
    const heroBg = heroBgRef.current;
    if (!hero || !heroText || !heroBg) return;

    gsap.to(heroBg, {
      scale: 1.2,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(heroText, {
      y: -80,
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
          style={{ backgroundImage: "url(/images/hero-saas-abstract.svg)" }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div
          ref={heroTextRef}
          className="relative z-10 container-vw max-w-5xl mx-auto flex flex-col items-center justify-center text-center"
        >
          <div className="hero-line">
            <p
              className="text-label text-[#D4B47C] tracking-[0.3em] text-center"
              style={{ marginBottom: "1.5rem" }}
            >
              SAAS MARKETING
            </p>
          </div>
          <div className="hero-line">
            <h1 className="text-display-lg md:text-display-xl text-[#F3D39A] text-center tracking-tight leading-[0.95] max-w-5xl mx-auto">
              MARKETING
            </h1>
          </div>
          <div className="hero-line">
            <h1 className="text-display-lg md:text-display-xl text-[#F3D39A] text-center tracking-tight leading-[0.95] max-w-5xl mx-auto">
              THAT SCALES
            </h1>
          </div>
          <div className="hero-line" style={{ marginTop: "clamp(1.25rem, 2vw, 1.75rem)" }}>
            <p className="text-editorial text-[#E8E2D8] max-w-xl mx-auto text-center">
              The systematic approach to SaaS growth. From PMF to IPO,
              we engineer marketing that compounds.
            </p>
          </div>
          <div
            className="hero-line flex justify-center"
            style={{ marginTop: "clamp(32px, 4vw, 36px)" }}
          >
            <CalendlyButton className="btn-pill text-white no-underline inline-flex items-center justify-center">
              BOOK A STRATEGY CALL <span className="arrow-icon ml-2">→</span>
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ─── Why SaaS Marketing is Different (The Problem) ─── */}
      <section className="section-dark section-spacing w-full flex flex-col items-center justify-center relative overflow-hidden">
        <SectionBackground src="/images/saas-problem-bg.svg" />
        <div
          className="container-vw relative z-10 flex flex-col items-center justify-center text-center"
          style={{ maxWidth: "860px" }}
        >
          <RevealText className="flex flex-col items-center">
            <p
              className="text-label text-[var(--color-accent)] text-center"
              style={{ marginBottom: "1.5rem" }}
            >
              THE PROBLEM
            </p>
          </RevealText>
          <RevealText delay={0.1} className="flex flex-col items-center">
            <h2
              className="text-display-sm md:text-display-md text-white text-center max-w-3xl leading-tight"
              style={{ marginBottom: "2rem" }}
            >
              SaaS marketing isn&apos;t B2C with a longer sales cycle.
              It&apos;s a fundamentally different game.
            </h2>
          </RevealText>
          <RevealText delay={0.2} className="flex flex-col items-center">
            <p className="text-editorial text-[var(--color-light-gray)] text-center max-w-2xl leading-relaxed">
              Most agencies treat SaaS like any other business. They run generic paid ads,
              write SEO content that nobody reads, and call it &quot;growth strategy.&quot;
              The result? Burnt budget, misaligned pipeline, and a board that&apos;s losing patience.
            </p>
          </RevealText>
          <RevealText delay={0.3} className="flex flex-col items-center">
            <p
              className="text-editorial text-[var(--color-light-gray)] text-center max-w-2xl leading-relaxed"
              style={{ marginTop: "1.5rem" }}
            >
              We built Vigyapun Limitless exclusively for SaaS. Every strategy, every campaign,
              every creative asset is engineered for complex B2B buying journeys with multiple
              stakeholders and 6-12 month sales cycles.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ─── Three Pillars (Our Framework) ─── */}
      <section className="section-dark py-24 sm:py-32 relative overflow-hidden">
        <SectionBackground src="/images/saas-pillars-bg.svg" />
        <div className="container-vw relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="max-w-2xl mx-auto mb-16 text-center flex flex-col items-center">
            <RevealText>
              <p className="text-label text-[var(--color-gray)] mb-4 text-center">
                OUR FRAMEWORK
              </p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-display-md text-white mb-4 text-center">
                Three pillars of SaaS growth
              </h2>
            </RevealText>
            <RevealText delay={0.15}>
              <p className="text-editorial text-[var(--color-gray)] text-center max-w-xl mx-auto">
                A systematic architecture designed to turn complex products into category leaders.
              </p>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl mx-auto">
            {pillars.map((pillar, i) => (
              <RevealText key={i} delay={0.1 * (i + 1)} className="w-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-full overflow-hidden rounded-sm" style={{ marginBottom: "1.75rem" }}>
                    <ParallaxImage
                      src={pillar.image}
                      alt={pillar.title}
                      aspectRatio="16 / 10"
                      zoom={true}
                      overlay={false}
                    />
                  </div>
                  <span
                    className="text-label text-[var(--color-gray)] text-center tracking-widest"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    PILLAR {pillar.number}
                  </span>
                  <h3
                    className="text-white text-center"
                    style={{
                      marginBottom: "0.875rem",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="text-editorial text-[var(--color-gray)] text-center leading-relaxed"
                    style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)", maxWidth: "19rem" }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/saas-stats-bg.svg" />
        <div className="container-vw relative z-10 text-center">
          <RevealText>
            <p className="text-label text-[var(--color-gray)] mb-12 text-center">
              PROVEN RESULTS
            </p>
          </RevealText>
          <StatsGrid stats={stats} theme="dark" />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-dark min-h-[70vh] flex items-center justify-center py-24 sm:py-32 relative overflow-hidden">
        <SectionBackground src="/images/saas-cta-bg.svg" />
        <div className="container-vw relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <RevealText className="flex flex-col items-center">
            <h2
              className="text-display-md md:text-display-lg text-white text-center max-w-3xl leading-tight"
              style={{ marginBottom: "clamp(1.25rem, 2vw, 1.75rem)" }}
            >
              STOP MARKETING LIKE EVERYONE ELSE
            </h2>
          </RevealText>
          <RevealText delay={0.15} className="flex flex-col items-center">
            <p
              className="text-editorial text-[var(--color-light-gray)] max-w-xl text-center"
              style={{ marginBottom: "clamp(32px, 4vw, 36px)" }}
            >
              Book a strategy call and discover the growth levers your competitors are missing.
            </p>
          </RevealText>
          <RevealText delay={0.3} className="flex justify-center w-full">
            <CalendlyButton className="btn-pill btn-pill--filled no-underline inline-flex items-center justify-center">
              BOOK A STRATEGY CALL <span className="arrow-icon ml-2">→</span>
            </CalendlyButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
