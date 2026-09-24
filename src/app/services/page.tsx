"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendlyButton from "@/components/CalendlyButton";
import RevealText from "@/components/RevealText";
import ServiceAccordion from "@/components/ServiceAccordion";
import SectionBackground from "@/components/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Demand Generation",
    description:
      "We build full-funnel pipeline machines that turn cold audiences into qualified opportunities. Our demand gen strategies are designed specifically for long B2B sales cycles with multiple decision-makers.",
    details: [
      "ABM Campaigns",
      "Paid Media (LinkedIn, Google, Meta)",
      "Content Syndication",
      "Email Nurture Sequences",
      "Webinar Programs",
      "Intent Data Activation",
    ],
  },
  {
    number: "02",
    title: "Paid Media & Performance",
    description:
      "Precision-targeted advertising that reaches your ICP where they live. We manage multi-channel paid programs with relentless focus on pipeline contribution, not vanity metrics.",
    details: [
      "LinkedIn Ads",
      "Google Ads (Search, Display, YouTube)",
      "Meta Ads",
      "Programmatic Display",
      "Retargeting & ABM Display",
      "Landing Page Optimization",
    ],
  },
  {
    number: "03",
    title: "Content Strategy & SEO",
    description:
      "Thought leadership content and organic growth strategies that establish your brand as the authority in your category. We create content that ranks, converts, and builds trust.",
    details: [
      "Content Strategy & Calendar",
      "SEO Audits & Optimization",
      "Blog & Long-Form Content",
      "Case Studies & Whitepapers",
      "Video Content Strategy",
      "Podcast Production",
    ],
  },
  {
    number: "04",
    title: "Brand Strategy & Creative",
    description:
      "From positioning to visual identity, we craft brands that create instant recognition and emotional connection. Your brand is your most valuable asset — we treat it that way.",
    details: [
      "Brand Positioning & Messaging",
      "Visual Identity Design",
      "Website Design & Development",
      "Sales Collateral",
      "Presentation Design",
      "Brand Guidelines",
    ],
  },
  {
    number: "05",
    title: "Growth & Conversion Optimization",
    description:
      "Data-driven experimentation across every conversion point. We optimize the entire journey from first click to closed-won, maximizing the ROI of every marketing dollar.",
    details: [
      "Conversion Rate Optimization",
      "A/B Testing Programs",
      "Funnel Analysis",
      "Product-Led Growth",
      "Pricing Strategy",
      "Onboarding Optimization",
    ],
  },
  {
    number: "06",
    title: "Analytics & Revenue Operations",
    description:
      "We build measurement frameworks that connect marketing activity to revenue. Full visibility from impression to closed-won, with attribution models that actually make sense.",
    details: [
      "Marketing Analytics Setup",
      "Attribution Modeling",
      "Revenue Dashboard Design",
      "CRM Optimization",
      "Marketing Automation",
      "Data Integration",
    ],
  },
  {
    number: "07",
    title: "Web Development",
    description:
      "High-performance marketing websites built to convert. Fast, SEO-ready and easy for your team to update, engineered to turn traffic into pipeline.",
    details: [
      "Marketing Website Builds",
      "Next.js & Headless CMS",
      "Landing Page Systems",
      "Performance & Core Web Vitals",
      "Technical SEO",
      "Analytics & CRM Integration",
    ],
  },
];

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

          <ServiceAccordion services={services} theme="dark" />
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
