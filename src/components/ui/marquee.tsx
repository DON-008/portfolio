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
export function Marquee({ items, duration = 28, className }: MarqueeProps) {
  const track = [...items, ...items];

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
        transition={{ duration, repeat: Infinity, ease: "linear" }}
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
