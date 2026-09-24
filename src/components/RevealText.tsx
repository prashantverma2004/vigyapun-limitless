"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, stagger]);

  return (
    <div ref={ref} className={`w-full text-center ${className}`} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
