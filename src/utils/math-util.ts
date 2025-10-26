export function convertPolarToCartesian(center: number, angle: number, radius: number): { x: number; y: number } {
  const radians = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}
