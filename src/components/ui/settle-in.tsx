"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SettleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Starting vertical offset in px before settling to rest. */
  yOffset?: number;
}

/**
 * Drift-in-and-settle scroll reveal: starts offset + transparent, springs
 * to rest with a slight overshoot (once), like an object coming to rest
 * in orbit. Inert under reduced motion via the ancestor MotionConfig.
 */
export function SettleIn({ children, className, delay = 0, yOffset = 24 }: SettleInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay }}
    >
      {children}
    </motion.div>
  );
}
