import { Component, createMemo, createSignal, For } from "solid-js";

import { harmonicMixing } from "~/data/harmonic-mixing";
import { keyColors } from "~/data/key-colors";
import { keyNotation } from "~/data/key-notation";
import { camelotKeys } from "~/models/camelot-key";
import { harmonicMixingLabels, HarmonicMixingProps, HarmonicMixingType, harmonicMixingTypes } from "~/models/harmonic-mixing";
import { oklch } from "~/utils/color-util";

export const HarmonicMixingTable: Component<HarmonicMixingProps> = ({ highlightedKey, setHighlightKey }) => {
  const [highlightedMix, setHighlightedMix] = createSignal<HarmonicMixingType | null>(null);
  return (
    <table class="w-full table-fixed border-collapse text-left">
      <thead>
        <tr>
          <For each={harmonicMixingTypes}>
            {(mix) => {
              const highlightTh = createMemo(() => highlightedMix() === mix);
              const fadeTh = createMemo(() => !!highlightedMix() && !highlightTh());
              const textColor = createMemo(() => {
                const key = highlightedKey();
                return key ? oklch(keyColors[harmonicMixing[key][mix]]) : "white";
              });
              return (
                <th
                  style={{ color: textColor() }}
                  class="p-2 text-xs transition-all duration-200 ease-out md:text-sm lg:text-base"
                  classList={{ "font-normal opacity-75": fadeTh() }}
                  scope="col"
                >
                  {harmonicMixingLabels[mix]}
                </th>
              );
            }}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={camelotKeys}>
          {(key) => {
            const highlightRow = createMemo(() => highlightedKey() === key);
            const fadeRow = createMemo(() => !!highlightedKey() && !highlightRow());
            return (
              <tr
                class="outline-0 transition-all duration-200 ease-out"
                tabindex="0"
                onMouseEnter={() => setHighlightKey(key)}
                onMouseLeave={() => setHighlightKey(null)}
                onFocus={() => setHighlightKey(key)}
                onBlur={() => setHighlightKey(null)}
              >
                <For each={harmonicMixingTypes}>
                  {(mix) => {
                    const mixKey = harmonicMixing[key][mix];
                    const backgroundColor = createMemo(() => (highlightRow() ? oklch(keyColors[mixKey]) : "transparent"));
                    const fontWeight = createMemo(() => (highlightRow() && highlightedMix() === mix ? "bold" : "normal"));
                    const textColor = createMemo(() => (highlightRow() ? "white" : oklch(keyColors[mixKey])));
                    const fadeTd = createMemo(() => {
                      if (!fadeRow()) return false;
                      const key = highlightedKey();
                      const mix = highlightedMix();
                      if (!mix && key) return mixKey !== key;
                      return key && mix ? mixKey !== harmonicMixing[key][mix] : false;
                    });
                    return (
                      <td
                        style={{ "background-color": backgroundColor(), "color": textColor(), "font-weight": fontWeight() }}
                        class="p-2 transition-all duration-200 ease-out"
                        classList={{ "opacity-25": fadeTd() }}
                        onMouseEnter={() => setHighlightedMix(mix)}
                        onMouseLeave={() => setHighlightedMix(null)}
                      >
                        {mixKey}&nbsp;
                        <span class="hidden text-sm font-normal lg:inline" classList={{ "text-neutral-400": !highlightRow() }}>
                          ({keyNotation[mixKey].long})
                        </span>
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
