"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  duration?: number;
  className?: string;
}

// Aceternity-style marquee, adapted to our tokens. Duplicates the item list
// once and loops x from 0% to -50% so the seam is invisible. Pauses under
// reduced motion via the ancestor MotionConfig, same as every other primitive.
// Speed defaults to ~3s of screen time per item so it stays readable however
// many items are passed in, rather than a fixed duration that gets faster
// (and less readable) every time the item list grows.
export function Marquee({ items, duration, className }: MarqueeProps) {
  const track = [...items, ...items];
  const effectiveDuration = duration ?? items.length * 3;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: effectiveDuration, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm uppercase tracking-wide text-muted"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
