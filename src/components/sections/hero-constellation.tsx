// Stubbed static per tech doc Step 5 — correct nodes/edges/labels, faint,
// no draw/pulse/drift animation yet (that lands in Step 10).

interface ConstellationNode {
  id: string;
  x: number;
  y: number;
  color: "teal" | "indigo";
  label: string;
}

const NODES: ConstellationNode[] = [
  { id: "template", x: 400, y: 90, color: "teal", label: "template" },
  { id: "store", x: 640, y: 230, color: "indigo", label: "store" },
  { id: "effect", x: 400, y: 370, color: "teal", label: "effect" },
  { id: "api", x: 160, y: 230, color: "indigo", label: "api" },
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

export function HeroConstellation() {
  const backMidpoint = {
    x: (nodeById("api").x + nodeById("template").x) / 2 - 24,
    y: (nodeById("api").y + nodeById("template").y) / 2 - 8,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 460"
      className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-4xl"
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

      {EDGES.map(([fromId, toId]) => {
        const from = nodeById(fromId);
        const to = nodeById(toId);
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--color-line)"
            strokeWidth={1}
            strokeOpacity={0.5}
          />
        );
      })}

      <text
        x={backMidpoint.x}
        y={backMidpoint.y}
        className="fill-muted font-mono text-[10px] uppercase tracking-wide"
        opacity={0.5}
      >
        back
      </text>

      {NODES.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={4}
            fill={`var(--color-${node.color})`}
            filter="url(#node-glow)"
            opacity={0.7}
          />
          <text
            x={node.x}
            y={node.y - 18}
            textAnchor="middle"
            className="fill-muted font-mono text-[10px] uppercase tracking-wide"
            opacity={0.55}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
