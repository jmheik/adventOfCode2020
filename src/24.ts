import { loadData24 } from "./utils.ts";

type Side = "e" | "se" | "sw" | "w" | "nw" | "ne";
const sides: Side[] = ["e", "se", "sw", "w", "nw", "ne"];

type Tile = {
  color: "WHITE" | "BLACK";
  x: number;
  y: number;
};

function parse(line: string) {
  const directions: Side[] = [];
  while (line.length > 0) {
    sides.some((side) => {
      if (line.startsWith(side)) {
        directions.push(side);
        line = line.slice(side.length);
        return true;
      }
    });
  }
  return directions;
}

function getNeighborCoord(tile: Tile, side: Side) {
  let { x, y } = tile;
  switch (side) {
    case "ne":
      x += 1;
      y -= 1;
      break;
    case "e":
      x += 2;
      break;
    case "se":
      x += 1;
      y += 1;
      break;
    case "sw":
      x -= 1;
      y += 1;
      break;
    case "w":
      x -= 2;
      break;
    case "nw":
      x -= 1;
      y -= 1;
      break;
  }
  return { x, y };
}

function flipTile(directions: Side[], tiles: Map<string, Tile>) {
  const getTile = (x: number, y: number) => {
    const key = `${x},${y}`;
    let tile = tiles.get(key);
    if (!tile) {
      tile = { color: "WHITE", x, y };
      tiles.set(key, tile);
    }
    return tile;
  };

  let tile = getTile(0, 0);
  directions.forEach((side) => {
    const { x, y } = getNeighborCoord(tile, side);
    tile = getTile(x, y);
  });

  tile.color = tile.color === "WHITE" ? "BLACK" : "WHITE";
}

function nextTile(tile: Tile, tiles: Map<string, Tile>): Tile {
  const adjacentBlacks = sides.filter((side) => {
    const { x, y } = getNeighborCoord(tile, side);
    const neighbor = tiles.get(`${x},${y}`);
    return neighbor?.color === "BLACK";
  }).length;
  switch (adjacentBlacks) {
    case 1:
      return tile;
    case 2:
      return { ...tile, color: "BLACK" };
    default:
      return { ...tile, color: "WHITE" };
  }
}

function solvePuzzle1(directions: Side[][]) {
  const tiles = new Map<string, Tile>();
  directions.forEach((dirs) => flipTile(dirs, tiles));
  return Array.from(tiles.values())
    .filter((tile) => tile.color === "BLACK")
    .length;
}

function solvePuzzle2(directions: Side[][], days: number) {
  let tiles = new Map<string, Tile>();
  directions.forEach((dirs) => flipTile(dirs, tiles));

  for (let day = 0; day < days; day++) {
    let newTiles = new Map<string, Tile>();
    Array.from(tiles.values()).forEach((tile) => {
      newTiles.set(`${tile.x},${tile.y}`, nextTile(tile, tiles));
      sides.forEach((side) => {
        const { x, y } = getNeighborCoord(tile, side);
        const key = `${x},${y}`;
        if (tiles.has(key) || newTiles.has(key)) {
          return;
        }
        newTiles.set(key, nextTile({ x, y, color: "WHITE" }, tiles));
      });
    });
    tiles = newTiles;
  }

  return Array.from(tiles.values())
    .filter((tile) => tile.color === "BLACK")
    .length;
}

const data = await loadData24();
const directions = data.map(parse);

const result1 = solvePuzzle1(directions);
const result2 = solvePuzzle2(directions, 100);

console.log(`RESULT FOR PUZZLE 1: ${result1}`);
console.log(`RESULT FOR PUZZLE 2: ${result2}`);
