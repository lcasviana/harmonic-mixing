import { createMemo, For, type Component } from "solid-js";

import { harmonicMixing } from "~/data/harmonic-mixing";
import { keyColors } from "~/data/key-colors";
import { keyNotation } from "~/data/key-notation";
import { camelotKeys, camelotKeysMajor, camelotKeysMinor } from "~/models/camelot-key";
import { HarmonicMixingProps } from "~/models/harmonic-mixing";
import { oklch } from "~/utils/color-util";

function convertPolarToCartesian(center: number, angle: number, radius: number): { x: number; y: number } {
  const radians = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}

function describeArc(outerRadius: number, innerRadius: number, startAngle: number, endAngle: number): string {
  const outerStart = convertPolarToCartesian(CENTER, endAngle, outerRadius);
  const outerEnd = convertPolarToCartesian(CENTER, startAngle, outerRadius);
  const innerStart = convertPolarToCartesian(CENTER, endAngle, innerRadius);
  const innerEnd = convertPolarToCartesian(CENTER, startAngle, innerRadius);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    outerStart.x,
    outerStart.y,
    "A",
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    0,
    outerEnd.x,
    outerEnd.y,
    "L",
    innerEnd.x,
    innerEnd.y,
    "A",
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    innerStart.x,
    innerStart.y,
    "L",
    outerStart.x,
    outerStart.y,
    "Z",
  ].join(" ");
}

const SVG_SIZE = 600;
const CENTER = SVG_SIZE / 2;
const OUTER_RADIUS = 280;
const INNER_RADIUS = 180;
const CENTER_CIRCLE_RADIUS = 90;
const NUM_SEGMENTS = 12;
const ANGLE_PER_SEGMENT = 360 / NUM_SEGMENTS;
const ANGLE_OFFSET = -15;

export const CamelotWheel: Component<HarmonicMixingProps> = (props) => {
  const keysToHighlight = createMemo(() => {
    const key = props.highlightedKey();
    if (!key) return null;
    const mix = harmonicMixing[key];
    return [key, ...Object.values(mix)];
  });

  const rings = [
    { data: camelotKeysMajor, isOuter: true },
    { data: camelotKeysMinor, isOuter: false },
  ];

  return (
    <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} aria-label="Camelot Wheel for harmonic mixing">
      <defs>
        <For each={camelotKeys}>
          {(key) => {
            const color = keyColors[key];
            const camelotNumber = parseInt(key);
            const startAngle = camelotNumber * ANGLE_PER_SEGMENT + ANGLE_OFFSET;
            const endAngle = startAngle + ANGLE_PER_SEGMENT;
            const isOuter = key.endsWith("B");
            const [r1, r2] = isOuter ? [INNER_RADIUS, OUTER_RADIUS] : [CENTER_CIRCLE_RADIUS, INNER_RADIUS];
            const midRadius = (r1 + r2) / 2;
            const p1 = convertPolarToCartesian(CENTER, startAngle, midRadius);
            const p2 = convertPolarToCartesian(CENTER, endAngle, midRadius);

            return (
              <linearGradient id={`grad-${key}`} gradientUnits="userSpaceOnUse" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}>
                <stop offset="0%" stop-color={oklch({ ...color, h: (color.h + 15) % 360 })} />
                <stop offset="50%" stop-color={oklch(color)} />
                <stop offset="100%" stop-color={oklch({ ...color, h: (color.h - 15 + 360) % 360 })} />
              </linearGradient>
            );
          }}
        </For>
      </defs>
      <For each={rings}>
        {({ data, isOuter }) => (
          <For each={data}>
            {(key) => {
              const camelotNumber = parseInt(key);
              const startAngle = camelotNumber * ANGLE_PER_SEGMENT + ANGLE_OFFSET;
              const endAngle = startAngle + ANGLE_PER_SEGMENT;
              const [r1, r2] = isOuter ? [INNER_RADIUS, OUTER_RADIUS] : [CENTER_CIRCLE_RADIUS, INNER_RADIUS];
              const pathD = describeArc(r2, r1, startAngle, endAngle);

              const textAngle = startAngle + ANGLE_PER_SEGMENT / 2;
              const camelotKeyRadius = isOuter ? INNER_RADIUS + 25 : CENTER_CIRCLE_RADIUS + 25;
              const camelotKeyPos = convertPolarToCartesian(CENTER, textAngle, camelotKeyRadius);
              const musicalKeyRadius = isOuter ? INNER_RADIUS + 65 : CENTER_CIRCLE_RADIUS + 60;
              const musicalKeyPos = convertPolarToCartesian(CENTER, textAngle, musicalKeyRadius);

              const isHighlighted = createMemo(() => {
                const toHighlight = keysToHighlight();
                return !toHighlight || toHighlight.includes(key);
              });

              return (
                <g
                  id={`segment-${key}`}
                  onMouseEnter={() => props.setHighlightKey(key)}
                  onMouseLeave={() => props.setHighlightKey(null)}
                  style={{ opacity: isHighlighted() ? 1 : 0.3, transition: "opacity 0.2s" }}
                >
                  <path d={pathD} fill={`url(#grad-${key})`} stroke="#333" stroke-width="1" />
                  <text
                    x={camelotKeyPos.x}
                    y={camelotKeyPos.y}
                    text-anchor="middle"
                    dominant-baseline="middle"
                    font-size="28"
                    font-weight="bold"
                    fill="#fff"
                    pointer-events="none"
                  >
                    {key}
                  </text>
                  <text
                    x={musicalKeyPos.x}
                    y={musicalKeyPos.y}
                    text-anchor="middle"
                    dominant-baseline="middle"
                    font-size="14"
                    fill="#fff"
                    pointer-events="none"
                  >
                    {keyNotation[key].long}
                  </text>
                </g>
              );
            }}
          </For>
        )}
      </For>
    </svg>
  );
};
