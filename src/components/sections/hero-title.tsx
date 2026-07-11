"use client";

import { motion } from "motion/react";

interface HeroTitleProps {
  name: string;
  role: string;
}

// Transform-only entrance (no opacity change) so the H1 — the LCP element —
// paints immediately and full-opacity; only its y-position settles.
export function HeroTitle({ name, role }: HeroTitleProps) {
  return (
    <motion.h1
      initial={{ y: 16 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="font-display text-4xl font-semibold text-text sm:text-6xl"
    >
      {name}
      <span className="mt-2 block text-2xl font-normal text-muted sm:text-3xl">
        {role}
      </span>
    </motion.h1>
  );
}
