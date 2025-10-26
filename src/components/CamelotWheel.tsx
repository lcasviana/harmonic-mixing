import { createMemo, For, type Component } from "solid-js";

import { harmonicMixing } from "~/data/harmonic-mixing";
import { keyColors } from "~/data/key-colors";
import { keyNotation } from "~/data/key-notation";
import { camelotKeys } from "~/models/camelot-key";
import { HarmonicMixingProps } from "~/models/harmonic-mixing";
import { oklch } from "~/utils/color-util";
import { convertPolarToCartesian } from "~/utils/math-util";
import { describeArcPath } from "~/utils/svg-util";

const SVG_SIZE = 600;
const CENTER = SVG_SIZE / 2;
const OUTER_RADIUS = 280;
const INNER_RADIUS = 180;
const CENTER_CIRCLE_RADIUS = 90;
const NUM_SEGMENTS = 12;
const ANGLE_PER_SEGMENT = 360 / NUM_SEGMENTS;
const ANGLE_OFFSET = -15;

export const CamelotWheel: Component<HarmonicMixingProps> = (props) => {
  const keysToHighlight = () => {
    const key = props.highlightedKey();
    if (!key) return null;
    const mix = harmonicMixing[key];
    return [key, ...Object.values(mix)];
  };
  const wheelSegments = createMemo(() => {
    return camelotKeys.map((key) => {
      const color = keyColors[key];
      const camelotNumber = parseInt(key);
      const isOuter = key.endsWith("B");
      const startAngle = camelotNumber * ANGLE_PER_SEGMENT + ANGLE_OFFSET;
      const endAngle = startAngle + ANGLE_PER_SEGMENT;
      const [r1, r2] = isOuter ? [INNER_RADIUS, OUTER_RADIUS] : [CENTER_CIRCLE_RADIUS, INNER_RADIUS];
      const pathD = describeArcPath(CENTER, r2, r1, startAngle, endAngle);
      const midRadius = (r1 + r2) / 2;
      const p1 = convertPolarToCartesian(CENTER, startAngle, midRadius);
      const p2 = convertPolarToCartesian(CENTER, endAngle, midRadius);
      const gradientColors = {
        start: oklch({ ...color, h: (color.h + 15) % 360 }),
        mid: oklch(color),
        end: oklch({ ...color, h: (color.h - 15 + 360) % 360 }),
      };
      const textAngle = startAngle + ANGLE_PER_SEGMENT / 2;
      const camelotKeyRadius = isOuter ? INNER_RADIUS + 25 : CENTER_CIRCLE_RADIUS + 25;
      const camelotKeyPos = convertPolarToCartesian(CENTER, textAngle, camelotKeyRadius);
      const musicalKeyRadius = isOuter ? INNER_RADIUS + 65 : CENTER_CIRCLE_RADIUS + 60;
      const musicalKeyPos = convertPolarToCartesian(CENTER, textAngle, musicalKeyRadius);
      return {
        key,
        pathD,
        gradient: {
          id: `grad-${key}`,
          p1,
          p2,
          colors: gradientColors,
        },
        camelotKeyPos,
        musicalKeyText: keyNotation[key].long,
        musicalKeyPos,
      };
    });
  });
  return (
    <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} aria-label="Camelot Wheel for harmonic mixing">
      <defs>
        <For each={wheelSegments()}>
          {(segment) => (
            <linearGradient
              id={segment.gradient.id}
              gradientUnits="userSpaceOnUse"
              x1={segment.gradient.p1.x}
              y1={segment.gradient.p1.y}
              x2={segment.gradient.p2.x}
              y2={segment.gradient.p2.y}
            >
              <stop offset="0%" stop-color={segment.gradient.colors.start} />
              <stop offset="50%" stop-color={segment.gradient.colors.mid} />
              <stop offset="100%" stop-color={segment.gradient.colors.end} />
            </linearGradient>
          )}
        </For>
      </defs>
      <For each={wheelSegments()}>
        {(segment) => {
          const isHighlighted = () => {
            const toHighlight = keysToHighlight();
            return !toHighlight || toHighlight.includes(segment.key);
          };
          return (
            <g
              id={`segment-${segment.key}`}
              onMouseEnter={() => props.setHighlightKey(segment.key)}
              onMouseLeave={() => props.setHighlightKey(null)}
              style={{ opacity: isHighlighted() ? 1 : 0.3, transition: "opacity 0.2s" }}
            >
              <path d={segment.pathD} fill={`url(#${segment.gradient.id})`} stroke="#333" stroke-width="1" />
              <text
                x={segment.camelotKeyPos.x}
                y={segment.camelotKeyPos.y}
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="36"
                font-weight="bold"
                fill="#fff"
                pointer-events="none"
              >
                {segment.key}
              </text>
              <text
                x={segment.musicalKeyPos.x}
                y={segment.musicalKeyPos.y}
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="12"
                fill="#fff"
                pointer-events="none"
              >
                {segment.musicalKeyText}
              </text>
            </g>
          );
        }}
      </For>
    </svg>
  );
};
