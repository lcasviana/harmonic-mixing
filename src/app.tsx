import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import { CamelotWheel } from "./components/CamelotWheel";
import { HarmonicMixingTable } from "./components/HarmonicMixingTable";
import { CamelotKey } from "./models/camelot-key";

import "./app.css";

const App: Component = () => {
  const [highlightedKey, setHighlightedKey] = createSignal<CamelotKey | null>(null);
  return (
    <main class="flex h-full flex-wrap justify-center gap-4 overflow-auto p-4">
      <h1 class="flex basis-full justify-center gap-6 text-5xl font-black">
        <i class="bg-conic-camelot-wheel inline-block aspect-square size-12 rounded-full"></i>
        Harmonic Mixing
      </h1>
      <CamelotWheel highlightedKey={highlightedKey} setHighlightKey={(key) => setHighlightedKey(key)} />
      <HarmonicMixingTable highlightedKey={highlightedKey} setHighlightKey={(key) => setHighlightedKey(key)} />
    </main>
  );
};

export default App;
