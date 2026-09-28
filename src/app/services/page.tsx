"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendlyButton from "@/components/CalendlyButton";
import RevealText from "@/components/RevealText";
import SectionBackground from "@/components/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

// Card photos: Unsplash (free commercial use, https://unsplash.com/license) —
// explainer 1614963326505-843868e1d83a, video-ads 1619850015746-bedcb4801700,
// content 1694173966355-6a8048f91769, pitch-decks 1559223694-98ed5e272fef,
// brand-visuals 1709377195538-5522ed0f9e10, strategy 1550239261-89b17e004488,
// growth-catalyst 1727451139462-cd34008cd50b.
const services = [
  {
    number: "01",
    title: "SaaS Intro & Explainer Videos",
    items: [
      "Product explainer videos",
      "SaaS demo videos",
      "Motion graphics",
      "Feature-to-benefit storytelling",
      "Product UI animation",
    ],
    image: "/images/services/explainer.jpg",
  },
  {
    number: "02",
    title: "Performance Video Ads",
    items: [
      "Ad creatives",
      "Multiple hooks/variations",
      "Short-form promotional videos",
      "Conversion-focused creatives",
      "Creative testing",
    ],
    image: "/images/services/video-ads.jpg",
  },
  {
    number: "03",
    title: "Content Creation & Social Media",
    items: [
      "Social media content",
      "Reels/short-form videos",
      "Content systems",
      "Marketing creatives",
    ],
    image: "/images/services/content.jpg",
  },
  {
    number: "04",
    title: "Pitch Decks",
    items: ["Startup pitch decks", "Founder presentations", "Investor-facing presentations"],
    image: "/images/services/pitch-decks.jpg",
  },
  {
    number: "05",
    title: "Brand Visuals",
    items: ["Brand graphics", "Marketing visuals", "Visual storytelling", "Design systems"],
    image: "/images/services/brand-visuals.jpg",
  },
  {
    number: "06",
    title: "Marketing Strategy",
    items: [
      "Funnel mapping",
      "Buyer-psychology-based messaging",
      "Content positioning",
      "Conversion-focused strategy",
    ],
    image: "/images/services/strategy.jpg",
  },
];

const growthCatalyst = {
  number: "07",
  title: "The Growth Catalyst",
  items: [
    "7x high-converting ad creatives with tested hooks",
    "1x 30s promo video",
    "Custom marketing strategy with funnel mapping + placement guide",
  ],
  image: "/images/services/growth-catalyst.jpg",
};

export default function Services() {
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
        <SectionBackground src="/images/services-hero-bg.svg" />
        <div ref={heroTextRef} className="container-vw relative z-10 text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className="hero-line w-full text-center flex flex-col items-center">
            <p className="text-label text-[var(--color-accent)] mb-6 tracking-[0.3em] text-center">
              WHAT WE DO
            </p>
          </div>
          <div className="hero-line w-full text-center flex flex-col items-center">
            <h1 className="text-display-xl text-white text-center w-full">SERVICES</h1>
          </div>
          <div className="hero-line mt-6 w-full text-center flex flex-col items-center">
            <p className="text-editorial text-[var(--color-light-gray)] max-w-xl text-center mx-auto">
              End-to-end SaaS marketing capabilities, delivered by specialists
              who understand B2B growth inside and out.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Service Accordion ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/services-capabilities-bg.svg" />
        <div className="container-vw relative z-10 text-center flex flex-col items-center">
          <RevealText className="flex flex-col items-center">
            <p
              className="text-label text-[var(--color-accent)] text-center"
              style={{ marginBottom: "1rem" }}
            >
              OUR CAPABILITIES
            </p>
          </RevealText>
          <RevealText delay={0.1} className="flex flex-col items-center">
            <h2
              className="text-display-md text-white text-center"
              style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Full-spectrum SaaS marketing
            </h2>
          </RevealText>

          <div className="dm-grid svc-grid">
            {services.map((service, i) => (
              <RevealText key={service.number} delay={0.08 * (i % 3)} className="dm-card-wrap">
                <article className="dm-card svc-card">
                  <div
                    className="dm-card__bg"
                    style={{ backgroundImage: `url(${service.image})` }}
                    aria-hidden="true"
                  />
                  <div className="dm-card__shade" aria-hidden="true" />
                  <span className="dm-card__badge">{service.number}</span>
                  <div className="dm-card__body">
                    <h3 className="dm-card__title">{service.title}</h3>
                    <ul className="svc-tags">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealText>
            ))}

            <RevealText className="dm-card-wrap svc-wide">
              <article className="dm-card svc-card svc-card--wide">
                <div
                  className="dm-card__bg"
                  style={{ backgroundImage: `url(${growthCatalyst.image})` }}
                  aria-hidden="true"
                />
                <div className="dm-card__shade" aria-hidden="true" />
                <span className="dm-card__badge">{growthCatalyst.number}</span>
                <div className="dm-card__body">
                  <h3 className="dm-card__title svc-wide__title">{growthCatalyst.title}</h3>
                  <ol className="svc-deliverables">
                    {growthCatalyst.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </article>
            </RevealText>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/services-cta-bg.svg" />
        <div className="container-vw relative z-10 text-center flex flex-col items-center">
          <RevealText className="flex flex-col items-center">
            <h2 className="text-display-lg text-white mb-8 max-w-4xl text-center">
              NOT SURE WHERE TO START?
            </h2>
          </RevealText>
          <RevealText delay={0.15} className="flex flex-col items-center">
            <p className="text-editorial text-[var(--color-gray)] max-w-xl mb-10 text-center">
              Book a free strategy call. We&apos;ll audit your current marketing and identify
              the highest-impact opportunities for growth.
            </p>
          </RevealText>
          <RevealText delay={0.3} className="flex flex-col items-center">
            <CalendlyButton className="btn-pill no-underline text-white">
              GET STARTED <span className="arrow-icon">→</span>
            </CalendlyButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
