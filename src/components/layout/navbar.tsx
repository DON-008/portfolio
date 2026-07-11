"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/content/data";
import { GithubIcon } from "@/components/ui/icons";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(18, 26, 43, 0.55)", "rgba(18, 26, 43, 0.85)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(36, 48, 73, 0.4)", "rgba(36, 48, 73, 1)"]
  );

  return (
    <motion.nav
      style={{ backgroundColor, borderColor }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex w-fit items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-md sm:gap-2 sm:px-3"
    >
      <ul className="hidden items-center gap-1 sm:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="rounded-full px-3 py-1.5 font-sans text-sm text-muted transition-colors hover:text-text focus-visible:text-text"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Don Davis on GitHub"
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-text focus-visible:text-text"
      >
        <GithubIcon className="h-5 w-5" />
      </a>
    </motion.nav>
  );
}
