"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  image: string;
  category: string;
  title: string;
  description: string;
  href?: string;
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === card) t.kill();
      });
    };
  }, [index]);

  const content = (
    <div ref={cardRef} className="case-card group">
      <div
        className="case-card__image"
        style={{ backgroundImage: `url(${study.image})` }}
      />
      <div className="case-card__overlay text-center flex flex-col items-center justify-center">
        <p className="text-tag text-[var(--color-accent)] mb-1 text-center">
          {study.category}
        </p>
        <h3
          className="text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {study.title}
        </h3>
        <p className="text-sm text-[var(--color-light-gray)] mt-2 text-center max-w-sm mx-auto">
          {study.description}
        </p>
      </div>
    </div>
  );

  if (study.href) {
    return (
      <Link href={study.href} className="no-underline block">
        {content}
      </Link>
    );
  }

  return content;
}

interface CaseStudyGridProps {
  studies: CaseStudy[];
  className?: string;
}

export default function CaseStudyGrid({
  studies,
  className = "",
}: CaseStudyGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full ${className}`}
    >
      {studies.map((study, i) => (
        <CaseStudyCard key={i} study={study} index={i} />
      ))}
    </div>
  );
}
