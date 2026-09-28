"use client";

import { useEffect, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import LogoSymbol from "@/components/LogoSymbol";

/* ────────────────────────────────────────────────────────────────────────────
 * Home hero: a continuous ~13s motion-graphics loop (Framer Motion only).
 * Scenes cycle GOT A SAAS IDEA? → YOUR NEXT / GROWTH / STARTS HERE. →
 * READY TO SCALE? → back to the first scene. Every ambient layer loops on its
 * own period, so there is never a visible restart.
 * ──────────────────────────────────────────────────────────────────────────── */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.55, 0, 1, 0.45] as const;

/** How long each scene stays up (ms) before the next one starts. */
const SCENE_HOLD = [3000, 4400, 3400];

const phrase: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.96, filter: "blur(14px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 1.1, ease: EASE_OUT } },
  exit: { opacity: 0, y: -18, filter: "blur(12px)", transition: { duration: 0.7, ease: EASE_IN } },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.5 } },
  exit: { transition: { staggerChildren: 0.06 } },
};

const growth: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.94, filter: "blur(16px)", letterSpacing: "0.3em" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    letterSpacing: "0.01em",
    transition: { duration: 1.4, ease: EASE_OUT },
  },
  exit: phrase.exit,
};

/* Deterministic PRNG so server and client render identical particles. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(20240917);
const PARTICLES = Array.from({ length: 36 }, () => ({
  left: rand() * 100,
  top: 20 + rand() * 85,
  size: 1 + rand() * 2.2,
  alpha: 0.25 + rand() * 0.55,
  duration: 9 + rand() * 9,
  delay: rand() * 6,
  drift: (rand() - 0.5) * 40,
}));

/* Two shapes per flowing line; mirrored back and forth for a seamless wave. */
const LINES = [
  ["M-100 620 C 240 520, 520 760, 820 610 S 1320 470, 1560 560", "M-100 580 C 260 660, 560 540, 860 640 S 1300 560, 1560 500"],
  ["M-100 700 C 300 600, 600 820, 900 690 S 1340 560, 1560 650", "M-100 720 C 280 780, 620 640, 900 740 S 1320 640, 1560 700"],
  ["M-100 330 C 260 420, 560 250, 860 350 S 1320 420, 1560 300", "M-100 360 C 300 300, 600 420, 880 320 S 1300 280, 1560 360"],
  ["M-100 780 C 360 700, 700 880, 1000 770 S 1380 700, 1560 760", "M-100 800 C 340 860, 680 740, 1000 820 S 1360 780, 1560 740"],
];

function useLayer(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return { x, y };
}

export default function HomeHeroLoop() {
  const reduced = useReducedMotion();
  const [scene, setScene] = useState(0);

  // Scene clock — runs for as long as the hero is mounted.
  useEffect(() => {
    const id = setTimeout(() => setScene((s) => (s + 1) % SCENE_HOLD.length), SCENE_HOLD[scene]);
    return () => clearTimeout(id);
  }, [scene]);

  // Pointer parallax (springs keep it soft; touch devices simply stay centred).
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 40, damping: 18, mass: 0.8 });
  const my = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.8 });
  const back = useLayer(mx, my, -10);
  const mid = useLayer(mx, my, -22);
  const front = useLayer(mx, my, -38);
  const content = useLayer(mx, my, 8);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const loop = (duration: number, extra: object = {}) =>
    reduced ? { duration: 0 } : { duration, repeat: Infinity, ease: "linear" as const, ...extra };

  return (
    <section
      className="hl-hero"
      id="hero"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <h1 className="sr-only">
        Vigyapun Limitless — we make SaaS brands impossible to ignore
      </h1>

      {/* ── Ambient backdrop ── */}
      <div className="hl-bg" aria-hidden="true">
        <motion.div
          className="hl-glow hl-glow--a"
          animate={reduced ? undefined : { x: ["0vw", "6vw", "0vw"], y: ["0vh", "-5vh", "0vh"], opacity: [0.8, 1, 0.8] }}
          transition={loop(14, { ease: "easeInOut" })}
        />
        <motion.div
          className="hl-glow hl-glow--b"
          animate={reduced ? undefined : { x: ["0vw", "-5vw", "0vw"], y: ["0vh", "4vh", "0vh"], opacity: [0.7, 1, 0.7] }}
          transition={loop(14, { ease: "easeInOut" })}
        />

        {/* Flowing gold lines */}
        <motion.svg
          className="hl-lines"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          style={back}
        >
          <defs>
            <linearGradient id="hl-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#D9B37A" stopOpacity="0" />
              <stop offset="0.35" stopColor="#D9B37A" stopOpacity="0.55" />
              <stop offset="0.7" stopColor="#F3E3BF" stopOpacity="0.35" />
              <stop offset="1" stopColor="#D9B37A" stopOpacity="0" />
            </linearGradient>
          </defs>
          {LINES.map(([a, b], i) => (
            <motion.path
              key={i}
              d={a}
              fill="none"
              stroke="url(#hl-line)"
              strokeWidth={i === 0 ? 1.4 : 1}
              strokeDasharray="6 14"
              initial={{ d: a, strokeDashoffset: 0 }}
              animate={reduced ? undefined : { d: [a, b, a], strokeDashoffset: [0, -400] }}
              transition={
                reduced
                  ? undefined
                  : {
                      d: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                      strokeDashoffset: { duration: 14, repeat: Infinity, ease: "linear" },
                    }
              }
              style={{ opacity: 0.35 + (i === 0 ? 0.35 : 0.15) }}
            />
          ))}
        </motion.svg>

        {/* Particles */}
        <div className="hl-particles">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="hl-particle"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
              initial={{ opacity: 0 }}
              animate={
                reduced
                  ? { opacity: p.alpha * 0.6 }
                  : { y: [0, -260], x: [0, p.drift], opacity: [0, p.alpha, p.alpha, 0] }
              }
              transition={reduced ? { duration: 0 } : { duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear", times: [0, 0.2, 0.75, 1] }}
            />
          ))}
        </div>
      </div>

      {/* ── 3D orbits ── */}
      <motion.div className="hl-orbits" style={mid} aria-hidden="true">
        {[
          { size: "min(92vmin, 880px)", dur: 42, tilt: 72, dot: 0 },
          { size: "min(70vmin, 660px)", dur: 28, tilt: 68, dot: 120 },
          { size: "min(50vmin, 460px)", dur: 21, tilt: 64, dot: 240 },
        ].map((o, i) => (
          <div key={i} className="hl-orbit-wrap" style={{ width: o.size, height: o.size }}>
            <motion.div
              className="hl-orbit"
              style={{ rotateX: o.tilt, rotateZ: o.dot }}
              animate={reduced ? undefined : { rotateZ: [o.dot, o.dot + 360] }}
              transition={loop(o.dur)}
            >
              <span className="hl-orbit__dot" />
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* ── Floating data elements ── */}
      <motion.div className="hl-cards" style={front} aria-hidden="true">
        <motion.div
          className="hl-card hl-card--bars"
          animate={reduced ? undefined : { y: [0, -12, 0] }}
          transition={loop(7, { ease: "easeInOut" })}
        >
          <span className="hl-card__label">PIPELINE</span>
          <div className="hl-bars">
            {[0.35, 0.5, 0.42, 0.62, 0.74, 0.9].map((h, i) => (
              <motion.i
                key={i}
                style={{ height: `${h * 100}%` }}
                animate={reduced ? undefined : { scaleY: [0.55, 1, 0.55] }}
                transition={loop(3.5, { ease: "easeInOut", delay: i * 0.18 })}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hl-card hl-card--spark"
          animate={reduced ? undefined : { y: [0, 10, 0] }}
          transition={loop(7, { ease: "easeInOut" })}
        >
          <span className="hl-card__label">GROWTH</span>
          <svg viewBox="0 0 160 60" className="hl-spark">
            <motion.path
              d="M4 52 C 30 48, 40 36, 60 38 S 92 22, 108 24 S 140 8, 156 6"
              fill="none"
              stroke="#D9B37A"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={reduced ? undefined : { pathLength: [0, 1, 1, 0] }}
              transition={loop(7, { ease: "easeInOut", times: [0, 0.45, 0.85, 1] })}
            />
          </svg>
        </motion.div>

        <motion.div
          className="hl-card hl-card--donut"
          animate={reduced ? undefined : { y: [0, -9, 0], rotate: [0, 1.5, 0] }}
          transition={loop(7, { ease: "easeInOut", delay: 1.2 })}
        >
          <span className="hl-card__label">CONVERSION</span>
          <svg viewBox="0 0 64 64" className="hl-donut">
            <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <motion.circle
              cx="32"
              cy="32"
              r="24"
              fill="none"
              stroke="url(#hl-donut-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
              initial={{ pathLength: 0.7 }}
              animate={reduced ? undefined : { pathLength: [0.25, 0.78, 0.25] }}
              transition={loop(7, { ease: "easeInOut" })}
            />
            <defs>
              <linearGradient id="hl-donut-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#F3E3BF" />
                <stop offset="1" stopColor="#B8914F" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="hl-card hl-card--reach"
          animate={reduced ? undefined : { y: [0, 11, 0] }}
          transition={loop(7, { ease: "easeInOut", delay: 2 })}
        >
          <span className="hl-card__label">REACH</span>
          <div className="hl-dots">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.i
                key={i}
                animate={reduced ? undefined : { opacity: [0.15, 1, 0.15] }}
                transition={loop(3.5, { ease: "easeInOut", delay: (i % 6) * 0.25 + Math.floor(i / 6) * 0.4 })}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Logo + phrases ── */}
      <motion.div className="hl-content" style={content}>
        <motion.div
          className="hl-logo"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <motion.div
            className="hl-logo__halo"
            aria-hidden="true"
            animate={reduced ? undefined : { opacity: [0.45, 0.9, 0.45], scale: [0.92, 1.06, 0.92] }}
            transition={loop(6.5, { ease: "easeInOut" })}
          />
          <motion.div
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={loop(6.5, { ease: "easeInOut" })}
          >
            <LogoSymbol className="hl-logo__mark" />
          </motion.div>
          <span className="hl-logo__word">
            VIGYAPUN <span>LIMITLESS</span>
          </span>
        </motion.div>

        <div className="hl-stage" aria-hidden="true">
          <AnimatePresence mode="wait" initial={true}>
            {scene === 0 && (
              <motion.p key="s0" className="hl-phrase" variants={phrase} initial="hidden" animate="show" exit="exit">
                GOT A SAAS IDEA?
              </motion.p>
            )}
            {scene === 1 && (
              <motion.div key="s1" className="hl-stack" variants={group} initial="hidden" animate="show" exit="exit">
                <motion.p className="hl-phrase hl-phrase--small" variants={phrase}>
                  YOUR NEXT
                </motion.p>
                <motion.p className="hl-phrase hl-phrase--gold" variants={growth}>
                  GROWTH
                </motion.p>
                <motion.p className="hl-phrase hl-phrase--small" variants={phrase}>
                  STARTS HERE.
                </motion.p>
              </motion.div>
            )}
            {scene === 2 && (
              <motion.p key="s2" className="hl-phrase" variants={phrase} initial="hidden" animate="show" exit="exit">
                READY TO <span className="hl-gold-text">SCALE?</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="hl-scroll" aria-hidden="true">
        <span>SCROLL</span>
        <motion.i
          animate={reduced ? undefined : { scaleY: [0, 1, 1], originY: [0, 0, 1], opacity: [0, 1, 0] }}
          transition={loop(2.4, { ease: "easeInOut", times: [0, 0.5, 1] })}
        />
      </div>
    </section>
  );
}
