import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import { CamelotWheel } from "./components/CamelotWheel";
import { HarmonicMixingTable } from "./components/HarmonicMixingTable";
import { CamelotKey } from "./models/camelot-key";

import "./app.css";

const App: Component = () => {
  const [highlightedKey, setHighlightedKey] = createSignal<CamelotKey | null>(null);
  return (
    <main class="flex h-full flex-wrap">
      <h1 class="basis-full text-center text-5xl">Harmonic Mixing</h1>
      <CamelotWheel highlightedKey={highlightedKey} setHighlightKey={(key) => setHighlightedKey(key)} />
      <HarmonicMixingTable highlightedKey={highlightedKey} setHighlightKey={(key) => setHighlightedKey(key)} />
    </main>
  );
};

export default App;
