"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionBackgroundProps {
  src: string;
}

/**
 * Full-bleed decorative background for a section. The image zooms in as the
 * section scrolls through the viewport, using the same scrubbed scale(1.1 → 1.3)
 * animation as the Home page ScrollShowcase images. A shared dark cinematic
 * overlay keeps text readable. The parent section must be
 * `relative overflow-hidden`, and its content `relative z-10`.
 */
export default function SectionBackground({ src }: SectionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    gsap.set(image, { scale: 1.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(image, { scale: 1.3 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={imageRef}
        className="absolute bg-cover bg-center will-change-transform"
        style={{
          top: "-5%",
          left: "-5%",
          width: "110%",
          height: "110%",
          backgroundImage: `url(${src})`,
        }}
      />
      {/* Shared dark cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 45%, rgba(10,10,10,0.6) 100%), radial-gradient(ellipse at center, rgba(10,10,10,0) 40%, rgba(10,10,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
