"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  number: string;
  title: string;
  description: string;
  details?: string[];
}

interface ServiceAccordionProps {
  services: Service[];
  className?: string;
  theme?: "dark" | "light";
}

export default function ServiceAccordion({
  services,
  className = "",
  theme = "light",
}: ServiceAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".service-item");

    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const textColor = theme === "dark" ? "text-white" : "text-[var(--color-black)]";
  const borderStyle = theme === "dark"
    ? { borderColor: "rgba(255,255,255,0.1)" }
    : { borderColor: "rgba(0,0,0,0.1)" };

  return (
    <div
      ref={containerRef}
      className={`max-w-4xl mx-auto w-full ${className}`}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      {services.map((service, i) => (
        <div
          key={i}
          className="service-item"
          style={borderStyle}
        >
          <div
            className="service-item__header"
            onClick={() => toggleItem(i)}
            role="button"
            tabIndex={0}
            aria-expanded={openIndex === i}
            id={`service-item-${i}`}
          >
            <span className={`service-item__number ${theme === "dark" ? "text-[var(--color-gray)]" : ""}`}>
              {service.number}
            </span>
            <span className={`service-item__title ${textColor}`}>
              {service.title}
            </span>
            <span
              className={`service-item__toggle ${textColor} ${openIndex === i ? "is-open" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`service-item__body ${openIndex === i ? "is-open" : ""}`}
          >
            <div className="service-item__body-inner text-center flex flex-col items-center">
              <p
                className={`text-editorial ${theme === "dark" ? "text-[var(--color-light-gray)]" : "text-[var(--color-gray)]"} max-w-2xl mx-auto text-center`}
              >
                {service.description}
              </p>
              {service.details && (
                <ul
                  className="flex flex-wrap gap-3 justify-center"
                  style={{ marginTop: "1.25rem", listStyle: "none" }}
                >
                  {service.details.map((detail, j) => (
                    <li
                      key={j}
                      style={{ padding: "0.5rem 1rem" }}
                      className={`text-tag px-4 py-2 rounded-full border text-center ${
                        theme === "dark"
                          ? "border-white/10 text-[var(--color-light-gray)]"
                          : "border-black/10 text-[var(--color-gray)]"
                      }`}
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
