import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import { CamelotWheel } from "./components/CamelotWheel";
import { HarmonicMixingTable } from "./components/HarmonicMixingTable";
import { CamelotKey } from "./models/camelot-key";

import "./app.css";

const App: Component = () => {
  const [highlightedKey, setHighlightedKey] = createSignal<CamelotKey | null>(null);
  return (
    <main>
      <h1>Harmonic Mixing</h1>
      <div style={{ "display": "flex", "justify-content": "center", "margin-bottom": "2rem" }}>
        <CamelotWheel highlightedKey={highlightedKey} setHighlightKey={(key) => setHighlightedKey(key)} />
      </div>
      <HarmonicMixingTable highlightedKey={highlightedKey} setHighlightKey={(key) => setHighlightedKey(key)} />
    </main>
  );
};

export default App;
