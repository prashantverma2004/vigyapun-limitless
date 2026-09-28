"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendlyButton from "@/components/CalendlyButton";
import RevealText from "@/components/RevealText";
import SectionBackground from "@/components/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

// Card photos: Unsplash (free commercial use, https://unsplash.com/license) —
// social 1596742578443-7682ef5251cd, performance 1526628953301-3e589a6a8b74,
// seo 1608222351212-18fe0ec7b13b, branding 1636247499734-893da2bcfc1c,
// web 1542393545-10f5cde2c810, product 1502982720700-bfff97f2ecac.
const services = [
  {
    number: "01",
    title: "Social Media Management",
    description:
      "Platform-native content and community management that grows your audience and turns followers into customers.",
    image: "/images/digital-marketing/social.jpg",
  },
  {
    number: "02",
    title: "Performance Marketing",
    description:
      "Meta and Google ad campaigns built around measurable results: qualified leads and sales, not just clicks.",
    image: "/images/digital-marketing/performance.jpg",
  },
  {
    number: "03",
    title: "SEO & Content Marketing",
    description:
      "Search visibility and content that earns trust, so people find your brand and have a reason to choose you.",
    image: "/images/digital-marketing/seo.jpg",
  },
  {
    number: "04",
    title: "Branding & Creative",
    description:
      "Distinctive visuals and messaging that make your brand recognizable everywhere it shows up.",
    image: "/images/digital-marketing/branding.jpg",
  },
  {
    number: "05",
    title: "Web Development",
    description:
      "Fast, modern websites and landing pages designed to convert visitors into enquiries and customers.",
    image: "/images/digital-marketing/web.jpg",
  },
  {
    number: "06",
    title: "Product Shoot",
    description:
      "Studio-quality product photos and videos that make your products stand out online.",
    image: "/images/digital-marketing/product.jpg",
  },
];

export default function DigitalMarketing() {
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
        className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden section-dark text-center"
        style={{ paddingTop: "calc(var(--header-height) + 3rem)", paddingBottom: "clamp(4rem, 10vw, 8rem)" }}
      >
        <SectionBackground src="/images/home-services-bg.svg" />
        <div ref={heroTextRef} className="container-vw relative z-10 text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className="hero-line w-full text-center flex flex-col items-center">
            <p
              className="text-label text-[var(--color-accent)] tracking-[0.3em] text-center"
              style={{ marginBottom: "1.5rem" }}
            >
              WHAT WE DO
            </p>
          </div>
          <div className="hero-line w-full text-center flex flex-col items-center">
            <h1 className="text-display-xl text-white text-center w-full">DIGITAL MARKETING</h1>
          </div>
          <div
            className="hero-line w-full text-center flex flex-col items-center"
            style={{ marginTop: "1.5rem" }}
          >
            <p className="text-editorial text-[var(--color-light-gray)] max-w-xl text-center mx-auto">
              Social, performance, content and creative marketing for ambitious brands,
              built to grow reach, engagement and revenue.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/services-capabilities-bg.svg" />
        <div className="container-vw relative z-10 text-center flex flex-col items-center">
          <RevealText className="flex flex-col items-center">
            <p
              className="text-label text-[var(--color-accent)] text-center"
              style={{ marginBottom: "1rem" }}
            >
              OUR SERVICES
            </p>
          </RevealText>
          <RevealText delay={0.1} className="flex flex-col items-center">
            <h2 className="text-display-md text-white text-center" style={{ marginBottom: "1.25rem" }}>
              FULL-FUNNEL DIGITAL MARKETING
            </h2>
          </RevealText>
          <RevealText delay={0.2} className="flex flex-col items-center">
            <p
              className="text-editorial text-[var(--color-light-gray)] text-center"
              style={{ maxWidth: "640px", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Strategy, content, performance and creative — everything you need to build a
              strong digital presence and drive real business growth.
            </p>
          </RevealText>

          <div className="dm-grid">
            {services.map((service, i) => (
              <RevealText key={service.number} delay={0.08 * i} className="dm-card-wrap">
                <article className="dm-card">
                  <div
                    className="dm-card__bg"
                    style={{ backgroundImage: `url(${service.image})` }}
                    aria-hidden="true"
                  />
                  <div className="dm-card__shade" aria-hidden="true" />
                  <span className="dm-card__badge">{service.number}</span>
                  <div className="dm-card__body">
                    <h3 className="dm-card__title">{service.title}</h3>
                    <p className="dm-card__desc">{service.description}</p>
                  </div>
                </article>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-dark section-spacing relative overflow-hidden">
        <SectionBackground src="/images/saas-cta-bg.svg" />
        <div className="container-vw relative z-10 text-center flex flex-col items-center">
          <RevealText className="flex flex-col items-center">
            <h2 className="text-display-lg text-white mb-8 max-w-4xl text-center">
              READY TO GROW ONLINE?
            </h2>
          </RevealText>
          <RevealText delay={0.15} className="flex flex-col items-center">
            <p
              className="text-editorial text-[var(--color-gray)] max-w-xl text-center"
              style={{ marginBottom: "2.5rem" }}
            >
              Book a free strategy call and we&apos;ll map out the digital marketing plan
              that fits your brand and goals.
            </p>
          </RevealText>
          <RevealText delay={0.3} className="flex flex-col items-center">
            <CalendlyButton className="btn-pill no-underline text-white">
              BOOK A CALL <span className="arrow-icon">→</span>
            </CalendlyButton>
          </RevealText>
        </div>
      </section>
    </>
  );
}
