import { data, State } from "./data/17.ts";

function countActiveNeighbours(
  cubes: Map<string, State>,
  x: number,
  y: number,
  z: number,
) {
  let count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        if (i === x && j === y && k === z) {
          continue;
        } else if (cubes.get(`${i}-${j}-${k}`) === "#") {
          count++;
        }
      }
    }
  }
  return count;
}

function countActiveNeighbours2(
  cubes: Map<string, State>,
  x: number,
  y: number,
  z: number,
  w: number,
) {
  let count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let l = w - 1; l <= w + 1; l++) {
          if (i === x && j === y && k === z && l === w) {
            continue;
          } else if (cubes.get(`${i}-${j}-${k}-${l}`) === "#") {
            count++;
          }
        }
      }
    }
  }
  return count;
}

function boot(initial: State[][], cycles: number) {
  const cubes = new Map<string, State>();
  for (let x = 0; x < initial.length; x++) {
    for (let y = 0; y < initial[x].length; y++) {
      cubes.set(`${x}-${y}-${0}`, initial[x][y]);
    }
  }
  const x = initial.length, y = initial.length, z = 1;
  for (let i = 1; i <= cycles; i++) {
    const preCycleCubes = new Map(cubes);
    for (let x2 = -i; x2 < x + i; x2++) {
      for (let y2 = -i; y2 < y + i; y2++) {
        for (let z2 = -i; z2 < z + i; z2++) {
          const key = `${x2}-${y2}-${z2}`;
          const count = countActiveNeighbours(preCycleCubes, x2, y2, z2);
          let state = preCycleCubes.get(key) ?? ".";
          if (state === "#" && (count < 2 || count > 3)) {
            cubes.set(key, ".");
            state = ".";
          } else if (state === "." && count === 3) {
            cubes.set(key, "#");
            state = "#";
          }
        }
      }
    }
  }

  return Array.from(cubes.values()).filter((state) => state === "#").length;
}

function boot2(initial: State[][], cycles: number) {
  const cubes = new Map<string, State>();
  for (let x = 0; x < initial.length; x++) {
    for (let y = 0; y < initial[x].length; y++) {
      cubes.set(`${x}-${y}-${0}-${0}`, initial[x][y]);
    }
  }
  const x = initial.length, y = initial.length, z = 1, w = 1;
  for (let i = 1; i <= cycles; i++) {
    const preCycleCubes = new Map(cubes);
    for (let x2 = -i; x2 < x + i; x2++) {
      for (let y2 = -i; y2 < y + i; y2++) {
        for (let z2 = -i; z2 < z + i; z2++) {
          for (let w2 = -i; w2 < w + i; w2++) {
            const key = `${x2}-${y2}-${z2}-${w2}`;
            const count = countActiveNeighbours2(preCycleCubes, x2, y2, z2, w2);
            let state = preCycleCubes.get(key) ?? ".";
            if (state === "#" && (count < 2 || count > 3)) {
              cubes.set(key, ".");
              state = ".";
            } else if (state === "." && count === 3) {
              cubes.set(key, "#");
              state = "#";
            }
          }
        }
      }
    }
  }

  return Array.from(cubes.values()).filter((state) => state === "#").length;
}

const result1 = boot(data, 6);
const result2 = boot2(data, 6);

console.log(`RESULT FOR PUZZLE1 ${result1}`);
console.log(`RESULT FOR PUZZLE2 ${result2}`);
