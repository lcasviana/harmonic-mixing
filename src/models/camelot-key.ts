export const camelotKeysMinor = ["1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "9A", "10A", "11A", "12A"] as const;
export type CamelotKeyMinor = (typeof camelotKeysMinor)[number];

export const camelotKeysMajor = ["1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B", "11B", "12B"] as const;
export type CamelotKeyMajor = (typeof camelotKeysMajor)[number];

export type CamelotKey = CamelotKeyMinor | CamelotKeyMajor;
export const camelotKeys: ReadonlyArray<CamelotKey> = Object.freeze(Array.of(...camelotKeysMinor, ...camelotKeysMajor));
