import { CamelotKey } from "~/models/camelot-key";
import { KeyNotation } from "~/models/key-notation";

export const keyNotation: Readonly<Record<CamelotKey, KeyNotation>> = Object.freeze({
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
