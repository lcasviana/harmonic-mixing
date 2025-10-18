const camelotKeysMinor = ["1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "9A", "10A", "11A", "12A"] as const;
type CamelotKeyMinor = (typeof camelotKeysMinor)[number];

const camelotKeysMajor = ["1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B", "11B", "12B"] as const;
type CamelotKeyMajor = (typeof camelotKeysMajor)[number];

type CamelotKey = CamelotKeyMinor | CamelotKeyMajor;

type CamelotWheel = {
  minor: CamelotKeyMinor[];
  major: CamelotKeyMajor[];
};

export const camelotWheel: Readonly<CamelotWheel> = Object.freeze({
  minor: Array.from(camelotKeysMinor),
  major: Array.from(camelotKeysMajor),
});

type KeyHarmonicMixing = {
  perfect: CamelotKey;
  minusOne: CamelotKey;
  plusOne: CamelotKey;
  energyBoost: CamelotKey;
  scaleChange: CamelotKey;
  diagonal: CamelotKey;
  jaws: CamelotKey;
  moodShifter: CamelotKey;
};

export const harmonicMixing: Readonly<Record<CamelotKey, KeyHarmonicMixing>> = Object.freeze({
  "1A": { perfect: "1A", minusOne: "12A", plusOne: "2A", energyBoost: "3A", scaleChange: "1B", diagonal: "12B", jaws: "8A", moodShifter: "4B" },
  "2A": { perfect: "2A", minusOne: "1A", plusOne: "3A", energyBoost: "4A", scaleChange: "2B", diagonal: "1B", jaws: "9A", moodShifter: "5B" },
  "3A": { perfect: "3A", minusOne: "2A", plusOne: "4A", energyBoost: "5A", scaleChange: "3B", diagonal: "2B", jaws: "10A", moodShifter: "6B" },
  "4A": { perfect: "4A", minusOne: "3A", plusOne: "5A", energyBoost: "6A", scaleChange: "4B", diagonal: "3B", jaws: "11A", moodShifter: "7B" },
  "5A": { perfect: "5A", minusOne: "4A", plusOne: "6A", energyBoost: "7A", scaleChange: "5B", diagonal: "4B", jaws: "12A", moodShifter: "8B" },
  "6A": { perfect: "6A", minusOne: "5A", plusOne: "7A", energyBoost: "8A", scaleChange: "6B", diagonal: "5B", jaws: "1A", moodShifter: "9B" },
  "7A": { perfect: "7A", minusOne: "6A", plusOne: "8A", energyBoost: "9A", scaleChange: "7B", diagonal: "6B", jaws: "2A", moodShifter: "10B" },
  "8A": { perfect: "8A", minusOne: "7A", plusOne: "9A", energyBoost: "10A", scaleChange: "8B", diagonal: "7B", jaws: "3A", moodShifter: "11B" },
  "9A": { perfect: "9A", minusOne: "8A", plusOne: "10A", energyBoost: "11A", scaleChange: "9B", diagonal: "8B", jaws: "4A", moodShifter: "12B" },
  "10A": { perfect: "10A", minusOne: "9A", plusOne: "11A", energyBoost: "12A", scaleChange: "10B", diagonal: "9B", jaws: "5A", moodShifter: "1B" },
  "11A": { perfect: "11A", minusOne: "10A", plusOne: "12A", energyBoost: "1A", scaleChange: "11B", diagonal: "10B", jaws: "6A", moodShifter: "2B" },
  "12A": { perfect: "12A", minusOne: "11A", plusOne: "1A", energyBoost: "2A", scaleChange: "12B", diagonal: "11B", jaws: "7A", moodShifter: "3B" },
  "1B": { perfect: "1B", minusOne: "12B", plusOne: "2B", energyBoost: "3B", scaleChange: "1A", diagonal: "2A", jaws: "8B", moodShifter: "10A" },
  "2B": { perfect: "2B", minusOne: "1B", plusOne: "3B", energyBoost: "4B", scaleChange: "2A", diagonal: "3A", jaws: "9B", moodShifter: "11A" },
  "3B": { perfect: "3B", minusOne: "2B", plusOne: "4B", energyBoost: "5B", scaleChange: "3A", diagonal: "4A", jaws: "10B", moodShifter: "12A" },
  "4B": { perfect: "4B", minusOne: "3B", plusOne: "5B", energyBoost: "6B", scaleChange: "4A", diagonal: "5A", jaws: "11B", moodShifter: "1A" },
  "5B": { perfect: "5B", minusOne: "4B", plusOne: "6B", energyBoost: "7B", scaleChange: "5A", diagonal: "6A", jaws: "12B", moodShifter: "2A" },
  "6B": { perfect: "6B", minusOne: "5B", plusOne: "7B", energyBoost: "8B", scaleChange: "6A", diagonal: "7A", jaws: "1B", moodShifter: "3A" },
  "7B": { perfect: "7B", minusOne: "6B", plusOne: "8B", energyBoost: "9B", scaleChange: "7A", diagonal: "8A", jaws: "2B", moodShifter: "4A" },
  "8B": { perfect: "8B", minusOne: "7B", plusOne: "9B", energyBoost: "10B", scaleChange: "8A", diagonal: "9A", jaws: "3B", moodShifter: "5A" },
  "9B": { perfect: "9B", minusOne: "8B", plusOne: "10B", energyBoost: "11B", scaleChange: "9A", diagonal: "10A", jaws: "4B", moodShifter: "6A" },
  "10B": { perfect: "10B", minusOne: "9B", plusOne: "11B", energyBoost: "12B", scaleChange: "10A", diagonal: "11A", jaws: "5B", moodShifter: "7A" },
  "11B": { perfect: "11B", minusOne: "10B", plusOne: "12B", energyBoost: "1B", scaleChange: "11A", diagonal: "12A", jaws: "6B", moodShifter: "8A" },
  "12B": { perfect: "12B", minusOne: "11B", plusOne: "1B", energyBoost: "2B", scaleChange: "12A", diagonal: "1A", jaws: "7B", moodShifter: "9A" },
});

type KeyNotation = {
  short: string;
  long: string;
};

export const keyDictionary: Readonly<Record<CamelotKey, KeyNotation>> = Object.freeze({
  "1A": { short: "1A", long: "A-Flat Minor" },
  "2A": { short: "2A", long: "E-Flat Minor" },
  "3A": { short: "3A", long: "B-Flat Minor" },
  "4A": { short: "4A", long: "F Minor" },
  "5A": { short: "5A", long: "C Minor" },
  "6A": { short: "6A", long: "G Minor" },
  "7A": { short: "7A", long: "D Minor" },
  "8A": { short: "8A", long: "A Minor" },
  "9A": { short: "9A", long: "E Minor" },
  "10A": { short: "10A", long: "B Minor" },
  "11A": { short: "11A", long: "F-Sharp Minor" },
  "12A": { short: "12A", long: "D-Flat Minor" },
  "1B": { short: "1B", long: "B Major" },
  "2B": { short: "2B", long: "F-Sharp Major" },
  "3B": { short: "3B", long: "D-Flat Major" },
  "4B": { short: "4B", long: "A-Flat Major" },
  "5B": { short: "5B", long: "E-Flat Major" },
  "6B": { short: "6B", long: "B-Flat Major" },
  "7B": { short: "7B", long: "F Major" },
  "8B": { short: "8B", long: "C Major" },
  "9B": { short: "9B", long: "G Major" },
  "10B": { short: "10B", long: "D Major" },
  "11B": { short: "11B", long: "A Major" },
  "12B": { short: "12B", long: "E Major" },
});

type ColorOklch = {
  l: number;
  c: number;
  h: number;
};

export const colorDictionary: Readonly<Record<CamelotKey, ColorOklch>> = Object.freeze({
  "1A": { l: 0.75, c: 0.2, h: 150 },
  "2A": { l: 0.75, c: 0.2, h: 120 },
  "3A": { l: 0.75, c: 0.2, h: 90 },
  "4A": { l: 0.75, c: 0.2, h: 60 },
  "5A": { l: 0.75, c: 0.2, h: 30 },
  "6A": { l: 0.75, c: 0.2, h: 0 },
  "7A": { l: 0.75, c: 0.2, h: 330 },
  "8A": { l: 0.75, c: 0.2, h: 300 },
  "9A": { l: 0.75, c: 0.2, h: 270 },
  "10A": { l: 0.75, c: 0.2, h: 240 },
  "11A": { l: 0.75, c: 0.2, h: 210 },
  "12A": { l: 0.75, c: 0.2, h: 180 },
  "1B": { l: 0.65, c: 0.2, h: 150 },
  "2B": { l: 0.65, c: 0.2, h: 120 },
  "3B": { l: 0.65, c: 0.2, h: 90 },
  "4B": { l: 0.65, c: 0.2, h: 60 },
  "5B": { l: 0.65, c: 0.2, h: 30 },
  "6B": { l: 0.65, c: 0.2, h: 0 },
  "7B": { l: 0.65, c: 0.2, h: 330 },
  "8B": { l: 0.65, c: 0.2, h: 300 },
  "9B": { l: 0.65, c: 0.2, h: 270 },
  "10B": { l: 0.65, c: 0.2, h: 240 },
  "11B": { l: 0.65, c: 0.2, h: 210 },
  "12B": { l: 0.65, c: 0.2, h: 180 },
});

/**
 * Converts `ColorOklch` to CSS `oklch()`.
 * @param color `ColorOklch`
 * @returns `"oklch(l c h)"`.
 */
export function oklch({ l, c, h }: ColorOklch): string {
  return `oklch(${l} ${c} ${h})`;
}

/**
 * Converts polar coordinates (angle, radius) to cartesian coordinates (x, y).
 * @param center Center
 * @param angle Angle in *degrees*
 * @param radius Radius
 * @returns Coordinates `{ x, y }`.
 */
function convertPolarToCartesian(center: number, angle: number, radius: number): { x: number; y: number } {
  const radians = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}

// --- 2. SVG CONSTANTS & UTILS ---
const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_SIZE = 600;
const CENTER = SVG_SIZE / 2;
const OUTER_RADIUS = 280;
const INNER_RADIUS = 180;
const CENTER_CIRCLE_RADIUS = 90;
const NUM_SEGMENTS = 12;
const ANGLE_PER_SEGMENT = 360 / NUM_SEGMENTS;
const ANGLE_OFFSET = -15;

let selectedSegment: SVGElement | null = null;

/**
 * Creates the "d" attribute for an SVG path that represents a segment of a ring.
 * @param outerRadius - The outer radius of the ring segment.
 * @param innerRadius - The inner radius of the ring segment.
 * @param startAngle - The starting angle in degrees.
 * @param endAngle - The ending angle in degrees.
 * @returns A string for the "d" attribute of an SVG path.
 */
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

// --- 3. WHEEL CREATION ---

/**
 * Creates a single segment (path and text) for the wheel.
 * @param camelotKey - The data object for the segment.
 * @param index - The index of the segment (0-11).
 * @param isOuter - True if this segment is for the outer ring.
 * @param gradientId - The ID of the gradient to use for the fill.
 * @returns An SVG group element containing the segment.
 */
function createSegment(camelotKey: CamelotKey, isOuter: boolean, gradientId: string): SVGGElement {
  const group = document.createElementNS(SVG_NS, "g");
  group.id = `segment-${camelotKey}`;
  const path = document.createElementNS(SVG_NS, "path");

  const camelotNumber = parseInt(camelotKey);
  const startAngle = camelotNumber * ANGLE_PER_SEGMENT + ANGLE_OFFSET;
  const endAngle = startAngle + ANGLE_PER_SEGMENT;

  const [r1, r2] = isOuter ? [INNER_RADIUS, OUTER_RADIUS] : [CENTER_CIRCLE_RADIUS, INNER_RADIUS];

  path.setAttribute("d", describeArc(r2, r1, startAngle, endAngle));
  path.setAttribute("fill", `url(#${gradientId})`);
  path.setAttribute("stroke", "#333");
  path.setAttribute("stroke-width", "1");

  const textAngle = startAngle + ANGLE_PER_SEGMENT / 2;

  // Camelot Key Text (e.g., 12A)
  const camelotKeyText = document.createElementNS(SVG_NS, "text");
  const camelotKeyRadius = isOuter ? INNER_RADIUS + 25 : CENTER_CIRCLE_RADIUS + 25;
  const camelotKeyPos = convertPolarToCartesian(CENTER, textAngle, camelotKeyRadius);
  camelotKeyText.setAttribute("x", String(camelotKeyPos.x));
  camelotKeyText.setAttribute("y", String(camelotKeyPos.y));
  camelotKeyText.setAttribute("text-anchor", "middle");
  camelotKeyText.setAttribute("dominant-baseline", "middle");
  camelotKeyText.setAttribute("font-size", "28");
  camelotKeyText.setAttribute("font-weight", "bold");
  camelotKeyText.setAttribute("fill", "#fff");
  camelotKeyText.setAttribute("pointer-events", "none"); // Make text non-interactive
  camelotKeyText.textContent = camelotKey;

  // Musical Key Text (e.g., D-Flat Minor)
  const musicalKeyText = document.createElementNS(SVG_NS, "text");
  const musicalKeyRadius = isOuter ? INNER_RADIUS + 65 : CENTER_CIRCLE_RADIUS + 60;
  const musicalKeyPos = convertPolarToCartesian(CENTER, textAngle, musicalKeyRadius);
  musicalKeyText.setAttribute("x", String(musicalKeyPos.x));
  musicalKeyText.setAttribute("y", String(musicalKeyPos.y));
  musicalKeyText.setAttribute("text-anchor", "middle");
  musicalKeyText.setAttribute("dominant-baseline", "middle");
  musicalKeyText.setAttribute("font-size", "14");
  musicalKeyText.setAttribute("fill", "#fff");
  musicalKeyText.setAttribute("pointer-events", "none");
  musicalKeyText.textContent = keyDictionary[camelotKey].long;

  group.appendChild(path);
  group.appendChild(camelotKeyText);
  group.appendChild(musicalKeyText);

  group.addEventListener("mouseenter", () => {
    group.dispatchEvent(new CustomEvent("highlight-key", { detail: { key: camelotKey }, bubbles: true, composed: true }));
  });

  group.addEventListener("mouseleave", () => {
    group.dispatchEvent(new CustomEvent("unhighlight-key", { bubbles: true, composed: true }));
  });

  return group;
}

// --- 4. INITIALIZATION ---

/**
 * Main function to generate and mount the wheel.
 */
function initializeWheel() {
  const container = document.getElementById("camelot-wheel");
  if (!container) {
    console.error("Container element #camelot-wheel not found.");
    return;
  }
  // Clear previous SVG if any
  container.innerHTML = "";

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", String(SVG_SIZE));
  svg.setAttribute("height", String(SVG_SIZE));
  svg.setAttribute("viewBox", `0 0 ${SVG_SIZE} ${SVG_SIZE}`);
  svg.setAttribute("aria-label", "Camelot Wheel for harmonic mixing");

  const defs = document.createElementNS(SVG_NS, "defs");
  svg.appendChild(defs);

  // Reorder data so it's drawn in visual clockwise order starting from the top
  const outerRingData = camelotWheel.major;
  const innerRingData = camelotWheel.minor;

  // Create gradients and segments for both rings
  [outerRingData, innerRingData].forEach((ringData, ringIndex) => {
    const isOuter = ringIndex === 0;
    const [r1, r2] = isOuter ? [INNER_RADIUS, OUTER_RADIUS] : [CENTER_CIRCLE_RADIUS, INNER_RADIUS];

    ringData.forEach((camelotKey, i) => {
      const gradientId = `grad-${camelotKey}`;
      const gradient = document.createElementNS(SVG_NS, "linearGradient");
      gradient.setAttribute("id", gradientId);
      gradient.setAttribute("gradientUnits", "userSpaceOnUse");

      const camelotNumber = parseInt(camelotKey);
      const startAngle = camelotNumber * ANGLE_PER_SEGMENT + ANGLE_OFFSET;
      const endAngle = startAngle + ANGLE_PER_SEGMENT;
      const midRadius = (r1 + r2) / 2;

      const p1 = convertPolarToCartesian(CENTER, startAngle, midRadius);
      const p2 = convertPolarToCartesian(CENTER, endAngle, midRadius);

      gradient.setAttribute("x1", String(p1.x));
      gradient.setAttribute("y1", String(p1.y));
      gradient.setAttribute("x2", String(p2.x));
      gradient.setAttribute("y2", String(p2.y));

      const color = colorDictionary[camelotKey];
      const stops = [
        { offset: "0%", color: oklch({ ...color, h: (color.h + 15) % 360 }) },
        { offset: "50%", color: oklch(color) },
        { offset: "100%", color: oklch({ ...color, h: (color.h - 15) % 360 }) },
      ];

      stops.forEach((stopInfo) => {
        const stop = document.createElementNS(SVG_NS, "stop");
        stop.setAttribute("offset", stopInfo.offset);
        stop.setAttribute("stop-color", stopInfo.color);
        gradient.appendChild(stop);
      });

      defs.appendChild(gradient);
      svg.appendChild(createSegment(camelotKey, isOuter, gradientId));
    });
  });

  container.appendChild(svg);
}

// Run the initialization function when the DOM is ready.
document.addEventListener("DOMContentLoaded", initializeWheel);
