"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DriftProps {
  children: React.ReactNode;
  className?: string;
  /** Oscillation amplitude in px. Spec ceiling: 8. */
  amplitude?: number;
  /** Full oscillation cycle length in seconds. Spec range: 6-12. */
  duration?: number;
  /** Phase offset in seconds so siblings desync. */
  delay?: number;
  /** Whether hover/focus docks the element (cards: yes; decorative stars: no). */
  dockable?: boolean;
}

/**
 * Zero-gravity float wrapper: oscillates transform-only around a fixed
 * resting position, then docks (offset -> 0, holds, glows) on hover/focus.
 * Inert under reduced motion via the ancestor MotionConfig.
 */
export function Drift({
  children,
  className,
  amplitude = 6,
  duration = 8,
  delay = 0,
  dockable = true,
}: DriftProps) {
  const [docked, setDocked] = useState(false);

  const floating = {
    y: [0, -amplitude, 0, amplitude, 0],
    x: [0, amplitude / 2, 0, -amplitude / 2, 0],
  };

  return (
    <motion.div
      className={cn(dockable && docked && "border-indigo shadow-glow-indigo", className)}
      animate={docked ? { y: 0, x: 0 } : floating}
      transition={
        docked
          ? { duration: 0.3, ease: "easeOut" }
          : { duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
      }
      onHoverStart={() => dockable && setDocked(true)}
      onHoverEnd={() => dockable && setDocked(false)}
      onFocus={() => dockable && setDocked(true)}
      onBlur={() => dockable && setDocked(false)}
    >
      {children}
    </motion.div>
  );
}
