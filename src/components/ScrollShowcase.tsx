"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  image: string;
  label: string;
  title: string;
  description?: string;
}

interface ScrollShowcaseProps {
  slides: Slide[];
}

export default function ScrollShowcase({ slides }: ScrollShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const slideEls = pin.querySelectorAll<HTMLElement>(".showcase-slide");
    const bgEls = pin.querySelectorAll<HTMLElement>(".showcase-slide-bg");
    const totalSlides = slides.length;

    // Set initial states: first slide visible, rest hidden
    gsap.set(slideEls[0], { opacity: 1 });
    gsap.set(bgEls[0], { scale: 1.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalSlides * 100}%`,
        scrub: 1,
        pin: pin,
        anticipatePin: 1,
      },
    });

    // For each slide transition
    for (let i = 0; i < totalSlides - 1; i++) {
      const progress = i / (totalSlides - 1);
      const nextProgress = (i + 1) / (totalSlides - 1);

      // Zoom in current bg, fade out current slide
      tl.to(
        bgEls[i],
        { scale: 1.3, duration: 0.5 },
        progress
      );
      tl.to(
        slideEls[i],
        { opacity: 0, duration: 0.3 },
        progress + 0.2
      );

      // Fade in next slide, set initial zoom for next bg
      tl.fromTo(
        slideEls[i + 1],
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        progress + 0.3
      );
      tl.fromTo(
        bgEls[i + 1],
        { scale: 1.2 },
        { scale: 1.1, duration: 0.5 },
        progress + 0.2
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [slides]);

  return (
    <div ref={sectionRef} className="scroll-showcase">
      <div ref={pinRef} className="scroll-showcase__pin">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="showcase-slide scroll-showcase__slide"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* Background image */}
            <div
              className="showcase-slide-bg scroll-showcase__slide-bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-[1]" />

            {/* Content */}
            <div className="scroll-showcase__slide-content justify-center text-center">
              <div className="text-center mx-auto flex flex-col items-center">
                <p className="text-label text-[var(--color-accent)] mb-2 text-center">
                  {slide.label}
                </p>
                <h3
                  className="text-white text-center"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {slide.title}
                </h3>
                {slide.description && (
                  <p className="text-[var(--color-light-gray)] mt-2 text-sm max-w-md text-center mx-auto">
                    {slide.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Counter */}
        <div className="scroll-showcase__counter">
          <span>01 — {String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
