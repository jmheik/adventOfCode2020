import { loadData3 } from "./utils.ts";

function countTrees(terrain: string[], slopeRight: number, slopeDown: number) {
  let x = 0, y = 0, count = 0;
  do {
    const row = terrain[y];
    const pos = x % row.length;
    count += (row[pos] === "#" ? 1 : 0);
    x += slopeRight;
    y += slopeDown;
  } while (y < terrain.length);
  return count;
}

const slopes: Array<[number, number]> = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const data = await loadData3();
const treeCountBySlope = slopes.map((slope) => countTrees(data, ...slope));
const multipliedCounts = treeCountBySlope.reduce(
  (acc, count) => acc * count,
  1,
);

console.log("RESULT", multipliedCounts);
