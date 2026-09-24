"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** How far the parallax moves (default 20%) */
  speed?: number;
  /** Enable zoom on scroll (Mubien-style) */
  zoom?: boolean;
  overlay?: boolean;
  aspectRatio?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 20,
  zoom = true,
  overlay = true,
  aspectRatio = "16 / 9",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.fromTo(
      image,
      { y: -speed, scale: zoom ? 1.15 : 1 },
      { y: speed, scale: zoom ? 1 : 1 }
    );

    return () => {
      tl.kill();
    };
  }, [speed, zoom]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <div
        ref={imageRef}
        className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      )}
    </div>
  );
}
