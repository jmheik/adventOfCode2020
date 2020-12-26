import { loadData20 } from "./utils.ts";

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const range = Array(10).fill(0).map((_, i) => i);
const OPPOSITES = [2, 3, 0, 1];

const matchPattern = [
  '                  # ',
  '#    ##    ##    ###',
  ' #  #  #  #  #  #   ',
].map(line => line.replace(/ /g, '.').split(''));

type Tile = {
  id: number;
  data: string[][];
  neighbors: Array<Tile | undefined>;
  handled?: boolean;
};

function equals(row1: string[], row2: string[]) {
  return row1.every((v, i) => v === row2[i]);
}

function match(pattern: string[], row: string[]) {
  return pattern.every((v, i) => v !== '#' || row[i] === '#');
}

function noop(data: string[][]) {
  return data;
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

function getSide(tile: Tile, side: number) {
  switch (side) {
    case TOP: return tile.data[0];
    case RIGHT: return range.map((i) => tile.data[i][9]);
    case BOTTOM: return tile.data[9];
    case LEFT: return range.map((i) => tile.data[i][0]);
    default: return [];
  }
}

function getAdjacent(tile: Tile, side: number, tiles: Tile[]) {
  const row1 = getSide(tile, side);
  const adjacentSide = OPPOSITES[side];
  return tiles.find(tile2 => {
    if (tile.id === tile2.id) {
      return;
    }
    if (tile2.handled) {
      const row2 = getSide(tile2, adjacentSide);
      return equals(row1, row2);
    }
    return [noop, rotate, rotate, rotate, flip, rotate, rotate, rotate].some(op => {
      tile2.data = op(tile2.data);
      const row2 = getSide(tile2, adjacentSide);
      return equals(row1, row2);
    });
  });
}

function fillNeighbors(tile: Tile, tiles: Tile[]): void  {
  if (tile.handled) {
    return;
  }
  tile.handled = true;
  for (let i=0; i<4; i++) {
    if (!tile.neighbors[i]) {
      const adjacent = getAdjacent(tile, i, tiles);
      if (adjacent) {
        tile.neighbors[i] = adjacent;
        adjacent.neighbors[OPPOSITES[i]] = tile;
        fillNeighbors(adjacent, tiles);
      }
    }
  }
}

function stitchImage(tiles: Tile[]): string[][] {
  const pixels = Math.sqrt(tiles.length) * 8;
  const image: string[][] = Array(pixels).fill(0).map(_ => Array(pixels).fill('.'));
  
  let rowTile = tiles.find(tile =>
    !tile.neighbors[TOP] && !tile.neighbors[LEFT]
  );
  let row = 0;
  while (rowTile) {
    let columnTile = rowTile as Tile | undefined;
    let column = 0;
    while (columnTile) {
      for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
          image[row+i][column+j] = columnTile.data[i+1][j+1];
        }
      }
      columnTile = columnTile.neighbors[RIGHT];
      column += 8;
    }
    rowTile = rowTile.neighbors[BOTTOM];
    row += 8;
  }

  return image;
}

function solvePuzzle1(data: string[]) {
  const tiles = parseTiles(data);
  fillNeighbors(tiles[1], tiles);
  return tiles.reduce((acc, tile) => {
    if (tile.neighbors.filter(Boolean).length === 2) {
      return acc * tile.id;
    }
    return acc;
  }, 1);
}

function findMatches(image: string[][], pattern: string[][]) {
  let matches = 0;
  for (let i=0; i<image.length - pattern.length; i++) {
    for (let j=0; j<image.length - pattern[0].length; j++) {
      if (
        pattern.every((p, pi) => match(p, image[i+pi].slice(j)))
      ) {
        matches++;
      }
    }
  }
  if (matches > 0) {
    const count =
      image.flat().filter(l => l === '#').length -
      (pattern.flat().filter(l => l === '#').length * matches);
    return count;
  }
  return matches;
}

function solvePuzzle2(data: string[]) {
  const tiles = parseTiles(data);
  fillNeighbors(tiles[1], tiles);
  let image = stitchImage(tiles);
  const counts = [noop, rotate, rotate, rotate, flip, rotate, rotate, rotate].map(op => {
    image = op(image);
    return findMatches(image, matchPattern);
  });
  return Math.max(...counts);
}

const data = await loadData20();

const result1 = solvePuzzle1(data);
const result2 = solvePuzzle2(data);

console.log(`RESULT FOR PUZZLE1 ${result1}`);
console.log(`RESULT FOR PUZZLE2 ${result2}`);
