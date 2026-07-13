"use client";

import { motion, useReducedMotion } from "motion/react";

interface ConstellationNode {
  id: string;
  x: number;
  y: number;
  angle: number;
  color: "teal" | "indigo";
  label: string;
}

// Nodes sit on a true circle, connected by arcs along that same circle
// (not straight chords) so the silhouette actually reads as a sphere/orbit
// instead of the square a diamond of straight lines would trace.
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
  { id: "template", angle: -90, ...onOrbit(-90), color: "teal", label: "template" },
  { id: "store", angle: 0, ...onOrbit(0), color: "indigo", label: "store" },
  { id: "effect", angle: 90, ...onOrbit(90), color: "teal", label: "effect" },
  { id: "api", angle: 180, ...onOrbit(180), color: "indigo", label: "api" },
];

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

// A quarter-circle arc along the shared orbit between two adjacent nodes
// (SVG elliptical-arc command), not a straight chord between them.
function arcPath(fromId: string, toId: string) {
  const from = nodeById(fromId);
  const to = nodeById(toId);
  return `M ${from.x} ${from.y} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 1 ${to.x} ${to.y}`;
}

// Sample points along that same arc for the traveling pulse dot, so it
// follows the curve rather than cutting straight across the circle.
function arcPoints(fromAngle: number, toAngle: number, steps = 12) {
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = ((fromAngle + ((toAngle - fromAngle) * i) / steps) * Math.PI) / 180;
    x.push(Math.round(CENTER.x + ORBIT_RADIUS * Math.cos(angle)));
    y.push(Math.round(CENTER.y + ORBIT_RADIUS * Math.sin(angle)));
  }
  return { x, y };
}

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

  const backLabelAngle = ((180 + 270) / 2) * (Math.PI / 180);
  const backLabel = {
    x: CENTER.x + (ORBIT_RADIUS + 26) * Math.cos(backLabelAngle),
    y: CENTER.y + (ORBIT_RADIUS + 26) * Math.sin(backLabelAngle),
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

      {/* Static orbit ring — makes the sphere/circle shape unmistakable
          at a glance, independent of whether the edges have drawn in. */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={ORBIT_RADIUS}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={1}
        strokeOpacity={isStandalone ? 0.35 : 0.25}
      />

      {EDGES.map(([fromId, toId], index) => (
        <motion.path
          key={`${fromId}-${toId}`}
          d={arcPath(fromId, toId)}
          fill="none"
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
      ))}

      {/* Periodic pulses of light traveling along an edge's arc, per §4.5 */}
      {animated &&
        EDGES.map(([fromId, toId], index) => {
          const from = nodeById(fromId);
          const to = nodeById(toId);
          const pulse = arcPoints(from.angle, to.angle);
          return (
            <motion.circle
              key={`pulse-${fromId}-${toId}`}
              r={4}
              className="fill-teal"
              initial={{ cx: from.x, cy: from.y, opacity: 0 }}
              animate={{ cx: pulse.x, cy: pulse.y, opacity: [0, 1, 1, 1, 0] }}
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
        x={backLabel.x}
        y={backLabel.y}
        textAnchor="middle"
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
