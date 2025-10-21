import { CamelotKey } from "~/models/camelot-key";
import { HarmonicMixing } from "~/models/harmonic-mixing";

export const harmonicMixing: Readonly<Record<CamelotKey, HarmonicMixing>> = Object.freeze({
  "1A": { minusOne: "12A", plusOne: "2A", energyBoost: "3A", scaleChange: "1B", diagonal: "12B", jaws: "8A", moodShifter: "4B" },
  "2A": { minusOne: "1A", plusOne: "3A", energyBoost: "4A", scaleChange: "2B", diagonal: "1B", jaws: "9A", moodShifter: "5B" },
  "3A": { minusOne: "2A", plusOne: "4A", energyBoost: "5A", scaleChange: "3B", diagonal: "2B", jaws: "10A", moodShifter: "6B" },
  "4A": { minusOne: "3A", plusOne: "5A", energyBoost: "6A", scaleChange: "4B", diagonal: "3B", jaws: "11A", moodShifter: "7B" },
  "5A": { minusOne: "4A", plusOne: "6A", energyBoost: "7A", scaleChange: "5B", diagonal: "4B", jaws: "12A", moodShifter: "8B" },
  "6A": { minusOne: "5A", plusOne: "7A", energyBoost: "8A", scaleChange: "6B", diagonal: "5B", jaws: "1A", moodShifter: "9B" },
  "7A": { minusOne: "6A", plusOne: "8A", energyBoost: "9A", scaleChange: "7B", diagonal: "6B", jaws: "2A", moodShifter: "10B" },
  "8A": { minusOne: "7A", plusOne: "9A", energyBoost: "10A", scaleChange: "8B", diagonal: "7B", jaws: "3A", moodShifter: "11B" },
  "9A": { minusOne: "8A", plusOne: "10A", energyBoost: "11A", scaleChange: "9B", diagonal: "8B", jaws: "4A", moodShifter: "12B" },
  "10A": { minusOne: "9A", plusOne: "11A", energyBoost: "12A", scaleChange: "10B", diagonal: "9B", jaws: "5A", moodShifter: "1B" },
  "11A": { minusOne: "10A", plusOne: "12A", energyBoost: "1A", scaleChange: "11B", diagonal: "10B", jaws: "6A", moodShifter: "2B" },
  "12A": { minusOne: "11A", plusOne: "1A", energyBoost: "2A", scaleChange: "12B", diagonal: "11B", jaws: "7A", moodShifter: "3B" },
  "1B": { minusOne: "12B", plusOne: "2B", energyBoost: "3B", scaleChange: "1A", diagonal: "2A", jaws: "8B", moodShifter: "10A" },
  "2B": { minusOne: "1B", plusOne: "3B", energyBoost: "4B", scaleChange: "2A", diagonal: "3A", jaws: "9B", moodShifter: "11A" },
  "3B": { minusOne: "2B", plusOne: "4B", energyBoost: "5B", scaleChange: "3A", diagonal: "4A", jaws: "10B", moodShifter: "12A" },
  "4B": { minusOne: "3B", plusOne: "5B", energyBoost: "6B", scaleChange: "4A", diagonal: "5A", jaws: "11B", moodShifter: "1A" },
  "5B": { minusOne: "4B", plusOne: "6B", energyBoost: "7B", scaleChange: "5A", diagonal: "6A", jaws: "12B", moodShifter: "2A" },
  "6B": { minusOne: "5B", plusOne: "7B", energyBoost: "8B", scaleChange: "6A", diagonal: "7A", jaws: "1B", moodShifter: "3A" },
  "7B": { minusOne: "6B", plusOne: "8B", energyBoost: "9B", scaleChange: "7A", diagonal: "8A", jaws: "2B", moodShifter: "4A" },
  "8B": { minusOne: "7B", plusOne: "9B", energyBoost: "10B", scaleChange: "8A", diagonal: "9A", jaws: "3B", moodShifter: "5A" },
  "9B": { minusOne: "8B", plusOne: "10B", energyBoost: "11B", scaleChange: "9A", diagonal: "10A", jaws: "4B", moodShifter: "6A" },
  "10B": { minusOne: "9B", plusOne: "11B", energyBoost: "12B", scaleChange: "10A", diagonal: "11A", jaws: "5B", moodShifter: "7A" },
  "11B": { minusOne: "10B", plusOne: "12B", energyBoost: "1B", scaleChange: "11A", diagonal: "12A", jaws: "6B", moodShifter: "8A" },
  "12B": { minusOne: "11B", plusOne: "1B", energyBoost: "2B", scaleChange: "12A", diagonal: "1A", jaws: "7B", moodShifter: "9A" },
});
