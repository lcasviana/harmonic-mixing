// --- 1. TYPES & DATA ---
interface HSLColor {
  h: number;
  s: number;
  l: number;
}

interface WheelSegment {
  camelot: string;
  key: string;
  color: HSLColor;
}

/**
 * Converts an HSL color object to a CSS hsl() string.
 * @param color - The HSL color object.
 * @returns A string in the format "hsl(h s% l%)".
 */
function hslToString(color: HSLColor): string {
  return `hsl(${color.h} ${color.s}% ${color.l}%)`;
}

// Data for each segment of the Camelot Wheel.
const wheelData: WheelSegment[] = [
  // Outer Ring (Major Keys)
  { camelot: "1B", key: "B Major", color: { h: 150, s: 75, l: 50 } },
  { camelot: "2B", key: "F-Sharp Major", color: { h: 120, s: 75, l: 50 } },
  { camelot: "3B", key: "D-Flat Major", color: { h: 90, s: 75, l: 50 } },
  { camelot: "4B", key: "A-Flat Major", color: { h: 60, s: 75, l: 50 } },
  { camelot: "5B", key: "E-Flat Major", color: { h: 30, s: 75, l: 50 } },
  { camelot: "6B", key: "B-Flat Major", color: { h: 0, s: 75, l: 50 } },
  { camelot: "7B", key: "F Major", color: { h: 330, s: 75, l: 50 } },
  { camelot: "8B", key: "C Major", color: { h: 300, s: 75, l: 50 } },
  { camelot: "9B", key: "G Major", color: { h: 270, s: 75, l: 50 } },
  { camelot: "10B", key: "D Major", color: { h: 240, s: 75, l: 50 } },
  { camelot: "11B", key: "A Major", color: { h: 210, s: 75, l: 50 } },
  { camelot: "12B", key: "E Major", color: { h: 180, s: 75, l: 50 } },
  // Inner Ring (Minor Keys)
  { camelot: "1A", key: "A-Flat Minor", color: { h: 150, s: 50, l: 60 } },
  { camelot: "2A", key: "E-Flat Minor", color: { h: 120, s: 50, l: 60 } },
  { camelot: "3A", key: "B-Flat Minor", color: { h: 90, s: 50, l: 60 } },
  { camelot: "4A", key: "F Minor", color: { h: 60, s: 50, l: 60 } },
  { camelot: "5A", key: "C Minor", color: { h: 30, s: 50, l: 60 } },
  { camelot: "6A", key: "G Minor", color: { h: 0, s: 50, l: 60 } },
  { camelot: "7A", key: "D Minor", color: { h: 330, s: 50, l: 60 } },
  { camelot: "8A", key: "A Minor", color: { h: 300, s: 50, l: 60 } },
  { camelot: "9A", key: "E Minor", color: { h: 270, s: 50, l: 60 } },
  { camelot: "10A", key: "B Minor", color: { h: 240, s: 50, l: 60 } },
  { camelot: "11A", key: "F-Sharp Minor", color: { h: 210, s: 50, l: 60 } },
  { camelot: "12A", key: "D-Flat Minor", color: { h: 180, s: 50, l: 60 } },
];

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
 * Converts polar coordinates (angle, radius) to Cartesian coordinates (x, y).
 * @param radius - The radius from the center.
 * @param angleInDegrees - The angle in degrees.
 * @returns An object with x and y properties.
 */
function polarToCartesian(radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: CENTER + radius * Math.cos(angleInRadians),
    y: CENTER + radius * Math.sin(angleInRadians),
  };
}

/**
 * Creates the "d" attribute for an SVG path that represents a segment of a ring.
 * @param outerRadius - The outer radius of the ring segment.
 * @param innerRadius - The inner radius of the ring segment.
 * @param startAngle - The starting angle in degrees.
 * @param endAngle - The ending angle in degrees.
 * @returns A string for the "d" attribute of an SVG path.
 */
function describeArc(outerRadius: number, innerRadius: number, startAngle: number, endAngle: number): string {
  const outerStart = polarToCartesian(outerRadius, endAngle);
  const outerEnd = polarToCartesian(outerRadius, startAngle);
  const innerStart = polarToCartesian(innerRadius, endAngle);
  const innerEnd = polarToCartesian(innerRadius, startAngle);

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
 * @param segmentData - The data object for the segment.
 * @param index - The index of the segment (0-11).
 * @param isOuter - True if this segment is for the outer ring.
 * @param gradientId - The ID of the gradient to use for the fill.
 * @returns An SVG group element containing the segment.
 */
function createSegment(segmentData: WheelSegment, isOuter: boolean, gradientId: string): SVGGElement {
  const group = document.createElementNS(SVG_NS, "g");
  const path = document.createElementNS(SVG_NS, "path");

  const camelotNumber = parseInt(segmentData.camelot);
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
  const camelotKeyPos = polarToCartesian(camelotKeyRadius, textAngle);
  camelotKeyText.setAttribute("x", String(camelotKeyPos.x));
  camelotKeyText.setAttribute("y", String(camelotKeyPos.y));
  camelotKeyText.setAttribute("text-anchor", "middle");
  camelotKeyText.setAttribute("dominant-baseline", "middle");
  camelotKeyText.setAttribute("font-size", "28");
  camelotKeyText.setAttribute("font-weight", "bold");
  camelotKeyText.setAttribute("fill", "#fff");
  camelotKeyText.setAttribute("pointer-events", "none"); // Make text non-interactive
  camelotKeyText.textContent = segmentData.camelot;

  // Musical Key Text (e.g., D-Flat Minor)
  const musicalKeyText = document.createElementNS(SVG_NS, "text");
  const musicalKeyRadius = isOuter ? INNER_RADIUS + 65 : CENTER_CIRCLE_RADIUS + 60;
  const musicalKeyPos = polarToCartesian(musicalKeyRadius, textAngle);
  musicalKeyText.setAttribute("x", String(musicalKeyPos.x));
  musicalKeyText.setAttribute("y", String(musicalKeyPos.y));
  musicalKeyText.setAttribute("text-anchor", "middle");
  musicalKeyText.setAttribute("dominant-baseline", "middle");
  musicalKeyText.setAttribute("font-size", "14");
  musicalKeyText.setAttribute("fill", "#fff");
  musicalKeyText.setAttribute("pointer-events", "none");
  musicalKeyText.textContent = segmentData.key;

  group.appendChild(path);
  group.appendChild(camelotKeyText);
  group.appendChild(musicalKeyText);

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
  const outerRingData = wheelData.slice(0, 12).sort((a, b) => parseInt(a.camelot) - parseInt(b.camelot));
  const innerRingData = wheelData.slice(12).sort((a, b) => parseInt(a.camelot) - parseInt(b.camelot));

  // Create gradients and segments for both rings
  [outerRingData, innerRingData].forEach((ringData, ringIndex) => {
    const isOuter = ringIndex === 0;
    const [r1, r2] = isOuter ? [INNER_RADIUS, OUTER_RADIUS] : [CENTER_CIRCLE_RADIUS, INNER_RADIUS];

    ringData.forEach((data, i) => {
      const gradientId = `grad-${data.camelot}`;
      const gradient = document.createElementNS(SVG_NS, "linearGradient");
      gradient.setAttribute("id", gradientId);
      gradient.setAttribute("gradientUnits", "userSpaceOnUse");

      const camelotNumber = parseInt(data.camelot);
      const startAngle = camelotNumber * ANGLE_PER_SEGMENT + ANGLE_OFFSET;
      const endAngle = startAngle + ANGLE_PER_SEGMENT;
      const midRadius = (r1 + r2) / 2;

      const p1 = polarToCartesian(midRadius, startAngle);
      const p2 = polarToCartesian(midRadius, endAngle);

      gradient.setAttribute("x1", String(p1.x));
      gradient.setAttribute("y1", String(p1.y));
      gradient.setAttribute("x2", String(p2.x));
      gradient.setAttribute("y2", String(p2.y));

      const stops = [
        { offset: "0%", color: hslToString({ ...data.color, h: (data.color.h + 15) % 360 }) },
        { offset: "50%", color: hslToString(data.color) },
        { offset: "100%", color: hslToString({ ...data.color, h: (data.color.h - 15) % 360 }) },
      ];

      stops.forEach((stopInfo) => {
        const stop = document.createElementNS(SVG_NS, "stop");
        stop.setAttribute("offset", stopInfo.offset);
        stop.setAttribute("stop-color", stopInfo.color);
        gradient.appendChild(stop);
      });

      defs.appendChild(gradient);
      svg.appendChild(createSegment(data, isOuter, gradientId));
    });
  });

  container.appendChild(svg);
}

// Run the initialization function when the DOM is ready.
document.addEventListener("DOMContentLoaded", initializeWheel);
