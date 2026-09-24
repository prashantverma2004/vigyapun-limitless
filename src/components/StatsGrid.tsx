"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
  theme?: "dark" | "light";
}

export default function StatsGrid({
  stats,
  className = "",
  theme = "dark",
}: StatsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll(".stat-item");

    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate numbers
    items.forEach((item) => {
      const numEl = item.querySelector(".stat-number") as HTMLElement;
      if (!numEl) return;
      const raw = numEl.dataset.value || "0";
      const numericVal = parseFloat(raw.replace(/[^0-9.]/g, ""));
      const isDecimal = raw.includes(".");

      gsap.fromTo(
        { val: 0 },
        { val: 0 },
        {
          val: numericVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: function () {
            const current = this.targets()[0].val;
            numEl.textContent = isDecimal
              ? current.toFixed(1)
              : Math.round(current).toString();
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (grid.contains(t.trigger as Element)) t.kill();
      });
    };
  }, [stats]);

  const textColor = theme === "dark" ? "text-white" : "text-[var(--color-black)]";
  const labelColor = theme === "dark" ? "text-[var(--color-gray)]" : "text-[var(--color-gray)]";

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 ${className}`}
    >
      {stats.map((stat, i) => (
        <div key={i} className="stat-item text-center flex flex-col items-center justify-center">
          <div className="flex items-baseline justify-center">
            <span className={`stat-number ${textColor}`} data-value={stat.value}>
              0
            </span>
            {stat.suffix && (
              <span
                className={`stat-number ${textColor}`}
                style={{ fontSize: "0.6em" }}
              >
                {stat.suffix}
              </span>
            )}
          </div>
          <p className={`stat-label ${labelColor}`}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
