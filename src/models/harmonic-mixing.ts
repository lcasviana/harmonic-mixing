import { CamelotKey } from "./camelot-key";

export type HarmonicMixing = {
  minusOne: CamelotKey;
  plusOne: CamelotKey;
  energyBoost: CamelotKey;
  scaleChange: CamelotKey;
  diagonal: CamelotKey;
  jaws: CamelotKey;
  moodShifter: CamelotKey;
};

export type HarmonicMixingProps = {
  highlightedKey: () => CamelotKey | null;
  setHighlightKey: (key: CamelotKey | null) => void;
};
