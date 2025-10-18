import { camelotWheel, colorDictionary, harmonicMixing, keyDictionary, oklch } from "./camelot-wheel";

let tbody: HTMLTableSectionElement;

function initializeTable() {
  const container = document.getElementById("harmonic-mixing-table");
  if (!container) {
    console.error("Container element #harmonic-mixing-table not found.");
    return;
  }

  const table = document.createElement("table");
  table.className = "w-full text-left border-collapse";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Key", "Perfect", "-1", "+1", "Energy Boost", "Scale Change", "Diagonal", "Jaws", "Mood Shifter"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.className = "p-2 border-b border-neutral-800";
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  tbody = document.createElement("tbody");
  const allKeys = [...camelotWheel.minor, ...camelotWheel.major];

  allKeys.forEach((key) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-neutral-800 cursor-pointer";

    row.addEventListener("mouseenter", () => highlight(key));
    row.addEventListener("mouseleave", () => unhighlight());

    const keyCell = document.createElement("td");
    keyCell.className = "p-2 font-bold";
    keyCell.dataset.key = key;
    const keyColor = colorDictionary[key];
    keyCell.style.backgroundColor = "transparent";
    keyCell.style.color = oklch(keyColor);
    keyCell.innerHTML = `${key} <span class="text-sm font-normal text-neutral-400">(${keyDictionary[key].long})</span>`;
    row.appendChild(keyCell);

    const mix = harmonicMixing[key];
    const mixTypes: (keyof typeof mix)[] = ["perfect", "minusOne", "plusOne", "energyBoost", "scaleChange", "diagonal", "jaws", "moodShifter"];

    mixTypes.forEach((mixType) => {
      const cell = document.createElement("td");
      cell.className = "p-2";
      const mixKey = mix[mixType];
      cell.dataset.key = mixKey;
      const mixColor = colorDictionary[mixKey];
      cell.style.backgroundColor = "transparent";
      cell.style.color = oklch(mixColor);
      cell.innerHTML = `${mixKey} <span class="text-sm font-normal text-neutral-400">(${keyDictionary[mixKey].long})</span>`;
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

function highlight(key: keyof typeof harmonicMixing) {
  // Highlight wheel
  const mix = harmonicMixing[key];
  const keysToHighlight: string[] = [key, ...Object.values(mix)];
  const allSegments = document.querySelectorAll('[id^="segment-"]');
  allSegments.forEach((segment) => {
    const segmentKey = segment.id.replace("segment-", "");
    if (!keysToHighlight.includes(segmentKey)) {
      (segment as HTMLElement).style.opacity = "0.3";
    }
  });

  // Highlight table
  if (tbody) {
    const allRows = tbody.querySelectorAll("tr");
    allRows.forEach((r) => {
      const rowKey = (r.querySelector("td") as HTMLElement).dataset.key;
      if (rowKey === key) {
        r.querySelectorAll("td").forEach((cell) => {
          const cellKey = (cell as HTMLElement).dataset.key as keyof typeof colorDictionary;
          const color = colorDictionary[cellKey];
          cell.style.backgroundColor = oklch(color);
          cell.style.color = "white";
          cell.innerHTML = `${cellKey} <span class="text-sm font-normal">(${keyDictionary[cellKey].long})</span>`;
        });
      } else {
        (r as HTMLElement).style.opacity = "0.3";
      }
    });
  }
}

function unhighlight() {
  // Un-highlight wheel
  const allSegments = document.querySelectorAll('[id^="segment-"]');
  allSegments.forEach((segment) => {
    (segment as HTMLElement).style.opacity = "1";
  });

  // Un-highlight table
  if (tbody) {
    const allRows = tbody.querySelectorAll("tr");
    allRows.forEach((r) => {
      (r as HTMLElement).style.opacity = "1";
      r.querySelectorAll("td").forEach((cell) => {
        const cellKey = (cell as HTMLElement).dataset.key as keyof typeof colorDictionary;
        const color = colorDictionary[cellKey];
        cell.style.backgroundColor = "transparent";
        cell.style.color = oklch(color);
        cell.innerHTML = `${cellKey} <span class="text-sm font-normal text-neutral-400">(${keyDictionary[cellKey].long})</span>`;
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTable();

  document.addEventListener("highlight-key", (event) => {
    const key = (event as CustomEvent).detail.key;
    if (key) {
      highlight(key);
    }
  });

  document.addEventListener("unhighlight-key", () => {
    unhighlight();
  });
});
