"use client";

import { motion } from "motion/react";

// Two tiled dot-field layers (different density/size) built from stacked
// radial-gradient point-lights, repeated via background-size — no canvas,
// no per-frame redraw, purely compositor-friendly.
const STARFIELD_NEAR = [
  "radial-gradient(1px 1px at 20px 30px, rgba(232,237,247,0.9), transparent)",
  "radial-gradient(1px 1px at 90px 120px, rgba(232,237,247,0.7), transparent)",
  "radial-gradient(1.5px 1.5px at 150px 60px, rgba(232,237,247,0.8), transparent)",
  "radial-gradient(1px 1px at 60px 170px, rgba(232,237,247,0.6), transparent)",
  "radial-gradient(1px 1px at 180px 190px, rgba(232,237,247,0.7), transparent)",
].join(", ");

const STARFIELD_FAR = [
  "radial-gradient(1px 1px at 40px 60px, rgba(232,237,247,0.5), transparent)",
  "radial-gradient(1px 1px at 200px 40px, rgba(232,237,247,0.4), transparent)",
  "radial-gradient(1px 1px at 260px 220px, rgba(232,237,247,0.45), transparent)",
  "radial-gradient(1px 1px at 100px 260px, rgba(232,237,247,0.35), transparent)",
].join(", ");

interface TwinkleStar {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

// Hand-placed (not random) so server/client render output stays identical.
const TWINKLE_STARS: TwinkleStar[] = [
  { top: "12%", left: "18%", size: 1.4, duration: 4.2, delay: 0 },
  { top: "22%", left: "72%", size: 1.8, duration: 5.6, delay: 0.8 },
  { top: "8%", left: "48%", size: 1.2, duration: 3.8, delay: 1.6 },
  { top: "34%", left: "85%", size: 1.6, duration: 6.4, delay: 0.3 },
  { top: "48%", left: "10%", size: 1.3, duration: 4.8, delay: 2.1 },
  { top: "60%", left: "60%", size: 1.7, duration: 5.2, delay: 1.1 },
  { top: "70%", left: "30%", size: 1.2, duration: 4.4, delay: 2.6 },
  { top: "80%", left: "78%", size: 1.5, duration: 6.0, delay: 0.6 },
  { top: "88%", left: "22%", size: 1.3, duration: 3.6, delay: 1.9 },
  { top: "40%", left: "35%", size: 1.4, duration: 5.8, delay: 3.0 },
  { top: "16%", left: "92%", size: 1.6, duration: 4.6, delay: 2.4 },
  { top: "94%", left: "55%", size: 1.2, duration: 5.4, delay: 0.2 },
];

export function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* Nebula glow blobs — static, off-center, heavily blurred */}
      <div className="absolute -top-1/4 -left-1/4 h-[60vw] w-[60vw] rounded-full bg-indigo opacity-[0.08] blur-3xl" />
      <div className="absolute top-1/3 -right-1/4 h-[50vw] w-[50vw] rounded-full bg-teal opacity-[0.07] blur-3xl" />
      <div className="absolute -bottom-1/4 left-1/3 h-[45vw] w-[45vw] rounded-full bg-indigo opacity-[0.06] blur-3xl" />

      {/* Starfield — two static tiled layers, different density */}
      <div
        className="absolute inset-0 opacity-70"
        style={{ backgroundImage: STARFIELD_NEAR, backgroundSize: "220px 220px" }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: STARFIELD_FAR, backgroundSize: "320px 320px" }}
      />

      {/* Twinkling stars — compositor-only opacity animation via Motion,
          respects MotionConfig reducedMotion="user" automatically */}
      <svg className="absolute inset-0 h-full w-full">
        {TWINKLE_STARS.map((star, i) => (
          <motion.circle
            key={i}
            cx={star.left}
            cy={star.top}
            r={star.size}
            className="fill-text"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
