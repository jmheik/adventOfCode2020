import { loadData20 } from "./utils.ts";

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

type Tile = {
  id: number;
  data: string[][];
  neighbors: number[];
};

function equals(row1: string[], row2: string[]) {
  return row1.every((v, i) => v === row2[i]);
}

function flip(data: string[][]) {
  return data.map((row) => Array.from(row).reverse());
}

function rotate(data: string[][]) {
  return data.map((row, i, arr) =>
    row.map((_, j) => arr[j][arr.length - 1 - i])
  );
}

function parseTiles(data: string[]): Tile[] {
  let tiles: Tile[] = [];
  for (let i = 0; i < data.length; i += 11) {
    tiles.push({
      id: parseInt(data[i].slice(5, 9)),
      data: data.slice(i + 1, i + 11).map((row) => Array.from(row)),
      neighbors: [],
    });
  }
  return tiles;
}

function fillNeighbors(tile1: Tile, tile2: Tile) {
  const range = Array(10).fill(0).map((_, i) => i);
  const sides = [tile1, tile2].map((tile) => ([
    tile.data[0],
    range.map((i) => tile.data[i][0]),
    tile.data[9],
    range.map((i) => tile.data[i][9]),
  ]));
  const match = sides[0].find((side1) =>
    sides[1].some((side2) => (
      equals(side1, side2) ||
      equals(Array.from(side2).reverse(), side1)
    ))
  );
  if (match) {
    tile1.neighbors.push(tile2.id);
    tile2.neighbors.push(tile1.id);
  }
}

function getTileRight(tile: Tile, tiles: Tile[]) {
}

function getTileBelow(tile: Tile, tiles: Tile[]) {
}

function stitchImage(initial: Tile, tiles: Tile[]) {
  const image: string[][] = [];
  let currentRowFirst = initial;
  let currentRowTile = initial;
  while (currentRowFirst) {
    currentRowTile = currentRowFirst;
    let imageRow: string[];
    while (currentRowTile) {
      currentRowTile = getTileRight(currentRowTile, tiles);
    }
    currentRowFirst = getTileBelow(currentRowFirst, tiles);
  }
}

function solvePuzzle1(data: string[]) {
  const tiles = parseTiles(data);
  tiles.forEach((tile1, i, arr) => {
    arr.slice(i + 1).forEach((tile2) => {
      fillNeighbors(tile1, tile2);
    });
  });
  return tiles.reduce((acc, tile) => {
    if (tile.neighbors.length === 2) {
      return acc * tile.id;
    }
    return acc;
  }, 1);
}

const data = await loadData20();

const result1 = solvePuzzle1(data);
const result2 = 1;

console.log(`RESULT FOR PUZZLE1 ${result1}`);
console.log(`RESULT FOR PUZZLE2 ${result2}`);
