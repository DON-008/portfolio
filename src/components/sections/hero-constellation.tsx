"use client";

import { motion, useReducedMotion } from "motion/react";

interface ConstellationNode {
  id: string;
  x: number;
  y: number;
  color: "teal" | "indigo";
  label: string;
}

// Nodes sit on a true circle (equidistant from center) for a spherical,
// orbit-like silhouette rather than a stretched diamond.
const CENTER = { x: 400, y: 230 };
const ORBIT_RADIUS = 165;

function onOrbit(angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(CENTER.x + ORBIT_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER.y + ORBIT_RADIUS * Math.sin(angle)),
  };
}

const NODES: ConstellationNode[] = [
  { id: "template", ...onOrbit(-90), color: "teal", label: "template" },
  { id: "store", ...onOrbit(0), color: "indigo", label: "store" },
  { id: "effect", ...onOrbit(90), color: "teal", label: "effect" },
  { id: "api", ...onOrbit(180), color: "indigo", label: "api" },
];

// Deterministic (no Math.random — SSR/hydration-safe) circular drift path,
// sampled at enough points that linear interpolation reads as a smooth
// orbit rather than a boxy back-and-forth.
function orbitalDrift(radius: number, steps = 12) {
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    x.push(Number((radius * Math.cos(angle)).toFixed(2)));
    y.push(Number((radius * Math.sin(angle)).toFixed(2)));
  }
  return { x, y };
}

// template -> store -> effect -> api -> (back) -> template, per tech doc §4.5
const EDGES: [string, string][] = [
  ["template", "store"],
  ["store", "effect"],
  ["effect", "api"],
  ["api", "template"],
];

function nodeById(id: string): ConstellationNode {
  return NODES.find((n) => n.id === id)!;
}

interface HeroConstellationProps {
  /** "background" (default): faint, full-bleed, animated hero backdrop.
   *  "standalone": brighter, normal-flow, always static — for embedding
   *  in the ESMP case-study page per tech doc §5.2. */
  variant?: "background" | "standalone";
}

export function HeroConstellation({ variant = "background" }: HeroConstellationProps) {
  const reducedMotion = useReducedMotion();
  const isStandalone = variant === "standalone";
  const animated = !isStandalone && !reducedMotion;

  const backMidpoint = {
    x: (nodeById("api").x + nodeById("template").x) / 2 - 24,
    y: (nodeById("api").y + nodeById("template").y) / 2 - 8,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 460"
      className={
        isStandalone
          ? "mx-auto h-64 w-full max-w-2xl"
          : "pointer-events-none h-72 w-full max-w-md shrink-0 sm:h-80 lg:h-[26rem] lg:max-w-lg"
      }
    >
      <defs>
        <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {EDGES.map(([fromId, toId], index) => {
        const from = nodeById(fromId);
        const to = nodeById(toId);
        return (
          <motion.line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--color-line)"
            strokeWidth={1.5}
            strokeOpacity={isStandalone ? 0.8 : 0.65}
            initial={animated ? { pathLength: 0 } : undefined}
            animate={animated ? { pathLength: 1 } : undefined}
            transition={
              animated
                ? { duration: 1, delay: 0.3 + index * 0.4, ease: "easeInOut" }
                : undefined
            }
          />
        );
      })}

      {/* Periodic pulses of light traveling along an edge, per §4.5 */}
      {animated &&
        EDGES.map(([fromId, toId], index) => {
          const from = nodeById(fromId);
          const to = nodeById(toId);
          return (
            <motion.circle
              key={`pulse-${fromId}-${toId}`}
              r={4}
              className="fill-teal"
              initial={{ cx: from.x, cy: from.y, opacity: 0 }}
              animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 3 + index * 1.5,
                delay: 2.5 + index * 1.6,
                ease: "easeInOut",
              }}
            />
          );
        })}

      <text
        x={backMidpoint.x}
        y={backMidpoint.y}
        className="fill-muted font-mono text-[20px] uppercase tracking-wide"
        opacity={0.65}
      >
        back
      </text>

      {NODES.map((node, index) => {
        const drift = orbitalDrift(4 + (index % 2));
        return (
          <motion.g
            key={node.id}
            animate={animated ? { x: drift.x, y: drift.y } : undefined}
            transition={
              animated
                ? {
                    duration: 9 + (index % 3) * 2,
                    delay: index * 0.6,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : undefined
            }
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={7}
              fill={`var(--color-${node.color})`}
              filter="url(#node-glow)"
              opacity={0.85}
            />
            <text
              x={node.x}
              y={node.y - 26}
              textAnchor="middle"
              className="fill-muted font-mono text-[22px] uppercase tracking-wide"
              opacity={isStandalone ? 0.9 : 0.8}
            >
              {node.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
