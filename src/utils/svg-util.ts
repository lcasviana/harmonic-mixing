import { convertPolarToCartesian } from "./math-util";

export function describeArcPath(center: number, outerRadius: number, innerRadius: number, startAngle: number, endAngle: number): string {
  const outerStart = convertPolarToCartesian(center, endAngle, outerRadius);
  const outerEnd = convertPolarToCartesian(center, startAngle, outerRadius);
  const innerStart = convertPolarToCartesian(center, endAngle, innerRadius);
  const innerEnd = convertPolarToCartesian(center, startAngle, innerRadius);
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
