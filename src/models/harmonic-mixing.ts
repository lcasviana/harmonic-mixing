import { CamelotKey } from "./camelot-key";

export const harmonicMixingTypes = ["key", "minusOne", "plusOne", "energyBoost", "scaleChange", "diagonal", "jaws", "moodShifter"] as const;
export type HarmonicMixingType = (typeof harmonicMixingTypes)[number];

export const harmonicMixingLabels: Record<HarmonicMixingType, string> = {
  key: "Key",
  minusOne: "-1",
  plusOne: "+1",
  energyBoost: "Energy Boost",
  scaleChange: "Scale Change",
  diagonal: "Diagonal",
  jaws: "Jaws",
  moodShifter: "Mood Shifter",
};

export type HarmonicMixing = Record<HarmonicMixingType, CamelotKey>;

export type HarmonicMixingProps = {
  highlightedKey: () => CamelotKey | null;
  setHighlightKey: (key: CamelotKey | null) => void;
};
