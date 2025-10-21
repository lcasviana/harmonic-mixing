import { ColorOklch } from "~/models/color-oklch";

export function oklch({ l, c, h }: ColorOklch): string {
  return `oklch(${l} ${c} ${h})`;
}
