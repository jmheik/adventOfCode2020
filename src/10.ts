import { loadData10 } from "./utils.ts";

function countJoltDiffs(data: number[]) {
  const diffs = [0, 0, 0, 1]; // Device adapter is +3
  const sorted = [...data].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    const diff = sorted[i] - (i > 0 ? sorted[i - 1] : 0);
    diffs[diff]++;
  }
  return diffs[1] * diffs[3];
}

function countValidArrangements(data: number[]) {
  const last = Math.max(...data);
  const jolts = new Set(data).add(0);
  const cache: { [key: number]: number } = {};

  const countRecursively = (current: number): number => {
    if (current in cache) {
      return cache[current];
    }
    if (current === last) {
      return 1;
    }
    if (!jolts.has(current)) {
      return 0;
    }
    const count = countRecursively(current + 1) +
      countRecursively(current + 2) +
      countRecursively(current + 3);

    return cache[current] = count;
  };

  return countRecursively(0);
}

const data = await loadData10();
const result1 = countJoltDiffs(data);
const result2 = countValidArrangements(data);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);
