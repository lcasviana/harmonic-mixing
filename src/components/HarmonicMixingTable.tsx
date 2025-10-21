import { Component, For, createMemo } from "solid-js";

import { harmonicMixing } from "~/data/harmonic-mixing";
import { keyColors } from "~/data/key-colors";
import { keyNotation } from "~/data/key-notation";
import { camelotKeys } from "~/models/camelot-key";
import { HarmonicMixing, HarmonicMixingProps } from "~/models/harmonic-mixing";
import { oklch } from "~/utils/color-util";

export const HarmonicMixingTable: Component<HarmonicMixingProps> = (props) => {
  const headers = ["Key", "-1", "+1", "Energy Boost", "Scale Change", "Diagonal", "Jaws", "Mood Shifter"];
  const mixTypes: (keyof HarmonicMixing)[] = ["minusOne", "plusOne", "energyBoost", "scaleChange", "diagonal", "jaws", "moodShifter"];

  return (
    <table class="w-full border-collapse text-left">
      <thead>
        <tr>
          <For each={headers}>{(header) => <th class="border-b border-neutral-800 p-2">{header}</th>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={camelotKeys}>
          {(key) => {
            const mix = harmonicMixing[key];
            const isRowHighlighted = createMemo(() => props.highlightedKey() === key);
            const isFaded = createMemo(() => props.highlightedKey() && !isRowHighlighted());

            return (
              <tr
                onMouseEnter={() => props.setHighlightKey(key)}
                onMouseLeave={() => props.setHighlightKey(null)}
                class="cursor-pointer hover:bg-neutral-800"
                style={{ opacity: isFaded() ? 0.3 : 1, transition: "opacity 0.2s" }}
              >
                <td
                  class="p-2 font-bold"
                  style={{
                    "background-color": isRowHighlighted() ? oklch(keyColors[key]) : "transparent",
                    "color": isRowHighlighted() ? "white" : oklch(keyColors[key]),
                  }}
                >
                  {key} <span class={`text-sm font-normal ${isRowHighlighted() ? "" : "text-neutral-400"}`}>({keyNotation[key].long})</span>
                </td>
                <For each={mixTypes}>
                  {(mixType) => {
                    const mixKey = mix[mixType];
                    return (
                      <td
                        class="p-2"
                        style={{
                          "background-color": isRowHighlighted() ? oklch(keyColors[mixKey]) : "transparent",
                          "color": isRowHighlighted() ? "white" : oklch(keyColors[mixKey]),
                        }}
                      >
                        {mixKey}{" "}
                        <span class={`text-sm font-normal ${isRowHighlighted() ? "" : "text-neutral-400"}`}>({keyNotation[mixKey].long})</span>
                      </td>
                    );
                  }}
                </For>
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};
