"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollShowcase from "@/components/ScrollShowcase";
import SectionBackground from "@/components/SectionBackground";
import HomeHeroLoop from "@/components/HomeHeroLoop";
import CalendlyButton from "@/components/CalendlyButton";
import RevealText from "@/components/RevealText";

gsap.registerPlugin(ScrollTrigger);

const showcaseSlides = [
  {
    image: "/images/case-1.jpg",
    label: "FINTECH SAAS",
    title: "Fintrac — Dashboard Redesign & Growth Strategy",
    description:
      "3× pipeline growth in 6 months through demand-gen and brand repositioning.",
  },
  {
    image: "/images/case-2.jpg",
    label: "PRODUCTIVITY SAAS",
    title: "TaskFlow — Mobile-First Product Launch",
    description:
      "From 0 to 12K MRR in 90 days with full-funnel marketing execution.",
  },
  {
    image: "/images/case-4.jpg",
    label: "MARTECH",
    title: "CampaignOS — Multi-Channel Growth Engine",
    description:
      "Scaled paid acquisition to 5× ROAS while reducing CPA by 40%.",
  },
];

const services = [
  {
    title: "Demand Generation",
    description: "Full-funnel pipeline strategies that turn awareness into revenue.",
    href: "/services",
  },
  {
    title: "Brand & Creative",
    description: "Visual identity and messaging that make SaaS brands unforgettable.",
    href: "/services",
  },
  {
    title: "Growth Strategy",
    description: "Data-driven roadmaps from PMF to scale, and beyond.",
    href: "/services",
  },
];

export default function Home() {
  const ctaRef = useRef<HTMLElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CTA background parallax zoom (same motion as ParallaxImage)
    const cta = ctaRef.current;
    const ctaBg = ctaBgRef.current;
    if (cta && ctaBg) {
      gsap.fromTo(
        ctaBg,
        { y: -20, scale: 1.15 },
        {
          y: 20,
          scale: 1,
          scrollTrigger: {
            trigger: cta,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ─── Hero (looping motion graphics) ─── */}
      <HomeHeroLoop />

      {/* ─── Positioning Statement ─── */}
      <section
        className="section-dark section-spacing w-full flex flex-col items-center justify-center"
        style={{ textAlign: "center", width: "100%" }}
      >
        <div
          className="container-vw flex flex-col items-center justify-center mx-auto text-center"
          style={{
            maxWidth: "860px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <RevealText className="w-full flex justify-center text-center">
            <p
              className="text-label text-[var(--color-accent)] mb-6 text-center w-full"
              style={{ textAlign: "center" }}
            >
              WHY VIGYAPUN?
            </p>
          </RevealText>
          <RevealText delay={0.15} className="w-full flex justify-center text-center">
            <h2
              className="text-display-sm text-white mb-8 text-center mx-auto"
              style={{ textAlign: "center", maxWidth: "780px", marginLeft: "auto", marginRight: "auto" }}
            >
              Most SaaS companies don&apos;t have a product problem.
              They have a perception problem.
            </h2>
          </RevealText>
          <RevealText delay={0.3} className="w-full flex justify-center text-center">
            <p
              className="text-editorial text-[var(--color-light-gray)] text-center mx-auto"
              style={{ textAlign: "center", maxWidth: "680px", marginLeft: "auto", marginRight: "auto" }}
            >
              We are a boutique SaaS marketing agency that combines deep B2B expertise
              with bold creative execution. We don&apos;t just run campaigns — we build
              category-defining brands that generate qualified pipeline at scale.
              From seed-stage to Series D, we&apos;ve helped SaaS companies
              break through the noise and achieve predictable, compounding growth.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ─── Scroll Showcase ─── */}
      <ScrollShowcase slides={showcaseSlides} />

      {/* ─── Services Teaser ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/home-services-bg.svg" />
        <div className="container-vw relative z-10 text-center">
          <RevealText>
            <p className="text-label text-[var(--color-gray)] mb-4 text-center">
              WHAT WE DO
            </p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-display-md text-white mb-16 text-center">
              Services built for SaaS growth
            </h2>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, i) => (
              <RevealText key={i} delay={0.1 * (i + 1)}>
                <div className="text-center flex flex-col items-center">
                  <h3
                    className="text-white mb-4 text-center"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                      fontWeight: 600,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-editorial text-[var(--color-gray)] mb-6 text-center max-w-sm mx-auto">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="btn-pill no-underline text-white mx-auto"
                  >
                    Learn More <span className="arrow-icon">→</span>
                  </Link>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section (over abstract parallax image) ─── */}
      <section
        ref={ctaRef}
        className="section-dark section-spacing relative overflow-hidden w-full flex flex-col items-center justify-center min-h-[80vh] md:min-h-[90vh]"
        style={{ textAlign: "center", width: "100%" }}
      >
        <div
          ref={ctaBgRef}
          className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url(/images/cta-abstract.svg)" }}
          role="img"
          aria-label="Abstract growth analytics background"
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 55%, rgba(10,10,10,0) 80%)",
          }}
        />
        <div
          className="container-vw relative z-10 flex flex-col items-center justify-center mx-auto text-center"
          style={{
            maxWidth: "960px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <RevealText className="w-full flex justify-center text-center">
            <p
              className="text-label cta-label text-[var(--color-accent)] mb-6 text-center w-full"
              style={{ textAlign: "center" }}
            >
              READY TO SCALE?
            </p>
          </RevealText>
          <RevealText delay={0.15} className="w-full flex justify-center text-center">
            <h2
              className="text-display-lg cta-heading text-white mb-10 text-center mx-auto"
              style={{ textAlign: "center", maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}
            >
              LET&apos;S MAKE YOUR SAAS BRAND LIMITLESS
            </h2>
          </RevealText>
          <RevealText delay={0.3} className="w-full flex justify-center text-center">
            <div
              className="flex gap-4 justify-center items-center flex-wrap mx-auto"
              style={{ justifyContent: "center" }}
            >
              <CalendlyButton className="btn-pill cta-btn text-white no-underline">
                BOOK A CALL <span className="arrow-icon">→</span>
              </CalendlyButton>
              <Link href="/saas-marketing" className="btn-pill cta-btn text-white no-underline">
                OUR APPROACH <span className="arrow-icon">→</span>
              </Link>
            </div>
          </RevealText>
        </div>
      </section>
    </>
  );
}
