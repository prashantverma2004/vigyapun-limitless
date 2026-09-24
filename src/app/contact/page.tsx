"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendlyButton from "@/components/CalendlyButton";
import RevealText from "@/components/RevealText";
import SectionBackground from "@/components/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
    website: "", // honeypot, hidden from real visitors
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "We couldn't send your message. Please check your connection and try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ─── Hero / Form Section ─── */}
      <section
        className="section-dark contact-dark min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          paddingTop: "calc(var(--header-height) + clamp(4rem, 9vw, 7rem))",
          paddingBottom: "clamp(5rem, 9vw, 7.5rem)",
        }}
      >
        <SectionBackground src="/images/contact-bg.svg" />
        <div className="container-vw relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
          {/* ─── Hero CTA Text ─── */}
          <div ref={heroTextRef} className="text-center flex flex-col items-center justify-center w-full">
            <div className="hero-line w-full text-center flex flex-col items-center">
              <p
                className="text-label text-[var(--color-gray)] tracking-[0.3em] text-center"
                style={{ marginBottom: "1.5rem" }}
              >
                GET IN TOUCH
              </p>
            </div>
            <div className="hero-line w-full text-center flex flex-col items-center">
              <h1
                className="text-white text-center w-full"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 6vw, 5rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  textTransform: "uppercase",
                }}
              >
                LET&apos;S TALK GROWTH
              </h1>
            </div>
            <div
              className="hero-line w-full text-center flex flex-col items-center"
              style={{ marginTop: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              <p className="text-editorial text-[var(--color-gray)] max-w-lg text-center mx-auto">
                Tell us about your SaaS brand and growth goals.
                We&apos;ll get back within 24 hours with a tailored perspective.
              </p>
            </div>

            <div
              className="hero-line w-full flex flex-col items-center"
              style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}
            >
              <div
                className="flex flex-col sm:flex-row items-center sm:items-start justify-center text-center"
                style={{ gap: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                <div className="text-center">
                  <p className="text-tag text-[var(--color-gray)] text-center" style={{ marginBottom: "0.875rem" }}>EMAIL</p>
                  <a
                    href="mailto:workwithvigyapun@gmail.com"
                    className="contact-email text-white no-underline text-center"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.125rem, 2vw, 1.35rem)",
                      fontWeight: 500,
                    }}
                  >
                    workwithvigyapun@gmail.com
                  </a>
                </div>
                <div className="text-center">
                  <p className="text-tag text-[var(--color-gray)] text-center" style={{ marginBottom: "0.875rem" }}>SOCIAL</p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    {[
                      { href: "https://www.linkedin.com/company/vigyapun/", label: "LinkedIn" },
                      { href: "https://www.instagram.com/vigyapunofficial/", label: "Instagram" },
                      { href: "https://www.youtube.com/@vigyapunofficial", label: "YouTube" },
                    ].map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-social text-tag no-underline"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Form ─── */}
          <div
            className="w-full"
            style={{ maxWidth: "720px", marginTop: "clamp(3.5rem, 7vw, 5rem)" }}
          >
            {submitted ? (
              <RevealText>
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <h2 className="text-display-sm text-white mb-4 text-center">
                    Thank you!
                  </h2>
                  <p className="text-editorial text-[var(--color-gray)] mb-8 text-center">
                    We&apos;ve received your message and will be in touch within 24 hours.
                  </p>
                  <CalendlyButton
                    className="btn-pill no-underline text-white mx-auto"
                    id="book-call-thankyou"
                  >
                    BOOK A CALL NOW <span className="arrow-icon">→</span>
                  </CalendlyButton>
                </div>
              </RevealText>
            ) : (
              <RevealText delay={0.3}>
                <form onSubmit={handleSubmit} className="w-full text-center">
                  <div className="form-field text-center">
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      placeholder=" "
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="contact-name">Your Name</label>
                  </div>

                  <div className="form-field text-center">
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      placeholder=" "
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="contact-email">Email Address</label>
                  </div>

                  <div className="form-field text-center">
                    <input
                      type="text"
                      name="company"
                      id="contact-company"
                      placeholder=" "
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <label htmlFor="contact-company">Company</label>
                  </div>

                  <div className="form-field text-center">
                    <input
                      type="text"
                      name="budget"
                      id="contact-budget"
                      placeholder=" "
                      value={formData.budget}
                      onChange={handleChange}
                    />
                    <label htmlFor="contact-budget">Monthly Budget (optional)</label>
                  </div>

                  <div className="form-field text-center">
                    <textarea
                      name="message"
                      id="contact-message"
                      rows={4}
                      placeholder=" "
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <label htmlFor="contact-message">Tell us about your project</label>
                  </div>

                  {/* Honeypot: hidden from people, catches spam bots */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                    <label htmlFor="contact-website">Website</label>
                    <input
                      type="text"
                      name="website"
                      id="contact-website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-center" style={{ marginTop: "2.75rem" }}>
                    <button
                      type="submit"
                      className="btn-pill text-white mx-auto"
                      id="contact-submit"
                      disabled={sending}
                      aria-busy={sending}
                      style={sending ? { opacity: 0.6, cursor: "wait" } : undefined}
                    >
                      {sending ? "SENDING…" : "SEND MESSAGE"} <span className="arrow-icon">→</span>
                    </button>
                  </div>
                  {error && (
                    <p
                      role="alert"
                      className="text-sm text-center"
                      style={{ color: "#F3D39A", marginTop: "1rem" }}
                    >
                      {error}{" "}
                      <a href="mailto:workwithvigyapun@gmail.com" className="text-white">
                        workwithvigyapun@gmail.com
                      </a>
                    </p>
                  )}
                </form>
              </RevealText>
            )}

            {/* ─── Calendly CTA ─── */}
            {!submitted && (
              <RevealText delay={0.5}>
                <div
                  className="border-t border-white/10 text-center flex flex-col items-center"
                  style={{ marginTop: "clamp(3.5rem, 7vw, 5rem)", paddingTop: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  <p className="text-label text-[var(--color-gray)] text-center" style={{ marginBottom: "1.25rem" }}>
                    PREFER A LIVE CONVERSATION?
                  </p>
                  <CalendlyButton
                    className="btn-pill btn-pill--large no-underline text-white mx-auto"
                    id="book-call-cta"
                  >
                    BOOK A CALL <span className="arrow-icon">→</span>
                  </CalendlyButton>
                  <p className="text-sm text-[var(--color-gray)] text-center max-w-sm" style={{ marginTop: "1.25rem" }}>
                    30-minute strategy call. No obligations. We&apos;ll discuss your growth
                    goals and share our honest assessment.
                  </p>
                </div>
              </RevealText>
            )}
          </div>
        </div>
      </section>

      {/* ─── Map / Visual Section ─── */}
      <section className="section-dark section-spacing">
        <div className="container-vw text-center">
          <RevealText>
            <p className="text-label text-[var(--color-accent)] mb-6">
              GLOBAL REACH
            </p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-display-md text-white mb-8">
              Remote-first. Results everywhere.
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-editorial text-[var(--color-light-gray)] max-w-2xl mx-auto">
              Based in India with team members across the US, UK, and Southeast Asia.
              We work across time zones so your growth never sleeps.
            </p>
          </RevealText>
        </div>
      </section>
    </>
  );
}
