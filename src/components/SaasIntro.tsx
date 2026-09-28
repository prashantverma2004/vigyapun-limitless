"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SEEN_KEY = "vl-saas-intro-seen";

interface SaasIntroProps {
  /** Called once when the intro starts handing off (or is skipped / not shown). */
  onComplete: () => void;
}

/**
 * ~11s motion-graphics intro over the SaaS hero: phrases with blur/scale/fade
 * transitions, soft gold glows and drifting particles, then a crossfade into
 * the hero. Plays once per browser session and never with reduced motion.
 */
export default function SaasIntro({ onComplete }: SaasIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const [active, setActive] = useState(true);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      // Marked here, not on start, so an interrupted/remounted intro still plays.
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      onCompleteRef.current();
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      finish();
      setActive(false);
      return;
    }

    /* ── Particles (canvas, stops when the intro ends) ── */
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = root.clientWidth;
      h = root.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = w < 640 ? 28 : 56;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.25 + 0.06),
      vx: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.5 + 0.15,
      tw: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(222, 196, 140, ${alpha})`;
        ctx.shadowColor = "rgba(222, 196, 140, 0.8)";
        ctx.shadowBlur = p.r * 4;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    /* ── Timeline ── */
    const q = gsap.utils.selector(root);
    const inFrom = { opacity: 0, y: 24, scale: 0.96, filter: "blur(14px)" };
    const inTo = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" };
    const outTo = { opacity: 0, y: -18, filter: "blur(12px)", duration: 0.8, ease: "power2.in" };

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(raf);
        setActive(false);
      },
    });
    tlRef.current = tl;

    tl.set(q(".si-phrase"), inFrom)
      // ambient build
      .fromTo(q(".si-glow"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2.4, ease: "sine.out", stagger: 0.3 }, 0)
      .to(q(".si-glow--a"), { x: "8vw", y: "-4vh", duration: 11, ease: "sine.inOut" }, 0)
      .to(q(".si-glow--b"), { x: "-6vw", y: "5vh", duration: 11, ease: "sine.inOut" }, 0)
      .fromTo(q(".si-ring"), { opacity: 0, scale: 0.85, rotate: -20 }, { opacity: 1, scale: 1.1, rotate: 25, duration: 11, ease: "none" }, 0)
      .fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.2)

      // 1 — GOT A SAAS IDEA?
      .to(q(".si-p1"), inTo, 0.5)
      .fromTo(q(".si-line"), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.2, ease: "power3.inOut" }, 0.9)
      .to(q(".si-p1"), outTo, 2.7)

      // 2 — YOUR NEXT / GROWTH / STARTS HERE.
      .to(q(".si-p2"), inTo, 3.4)
      .fromTo(q(".si-p3"), { ...inFrom, letterSpacing: "0.3em" }, { ...inTo, letterSpacing: "0.02em", duration: 1.4 }, 3.9)
      .to(q(".si-line"), { opacity: 0, duration: 0.5 }, 4.4)
      .to(q(".si-p4"), inTo, 4.7)
      .to(q(".si-group"), { ...outTo, stagger: 0.08 }, 7.0)

      // 3 — READY TO SCALE?
      .to(q(".si-p5"), { ...inTo, duration: 1.3 }, 7.8)
      .to(q(".si-line"), { opacity: 1, duration: 0.8 }, 8.3)
      .to(q(".si-line"), { opacity: 0, duration: 0.6 }, 9.6)

      // hand-off into the hero
      .to(q(".si-p5"), { opacity: 0, scale: 1.08, filter: "blur(16px)", duration: 1, ease: "power2.in" }, 9.8)
      .add(finish, 10.3)
      .to(root, { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 10.2);

    const onVisibility = () => (document.hidden ? tl.pause() : tl.resume());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      tl.kill();
    };
  }, []);

  const skip = () => {
    const tl = tlRef.current;
    if (!tl) return;
    // Jump to the hand-off so the hero still crossfades in.
    tl.seek(10.15);
  };

  if (!active) return null;

  return (
    <div ref={rootRef} className="saas-intro">
      <div className="si-glow si-glow--a" aria-hidden="true" />
      <div className="si-glow si-glow--b" aria-hidden="true" />
      <div className="si-ring" aria-hidden="true" />
      <canvas ref={canvasRef} className="si-particles" aria-hidden="true" />

      <div className="si-stage" aria-hidden="true">
        <p className="si-phrase si-p1">GOT A SAAS IDEA?</p>

        <div className="si-stack">
          <p className="si-phrase si-group si-p2 si-small">YOUR NEXT</p>
          <p className="si-phrase si-group si-p3 si-gold">GROWTH</p>
          <p className="si-phrase si-group si-p4 si-small">STARTS HERE.</p>
        </div>

        <p className="si-phrase si-p5">
          READY TO <span className="si-gold-text">SCALE?</span>
        </p>

        <span className="si-line" />
      </div>

      <button type="button" className="si-skip" onClick={skip}>
        SKIP INTRO
      </button>
    </div>
  );
}
