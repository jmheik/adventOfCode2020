import { loadData11 } from "./utils.ts";

function equals(arr1: string[][], arr2: string[][]) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function canSeeOccupied(
  seatMap: string[][],
  i: number,
  j: number,
  stepI: number,
  stepJ: number,
): boolean {
  switch (seatMap[i + stepI]?.[j + stepJ]) {
    case "#":
      return true;
    case ".":
      return canSeeOccupied(seatMap, i + stepI, j + stepJ, stepI, stepJ);
    default:
      return false;
  }
}

function countVisibleSeats(seatMap: string[][], i: number, j: number) {
  return [
    canSeeOccupied(seatMap, i, j, -1, -1),
    canSeeOccupied(seatMap, i, j, -1, 0),
    canSeeOccupied(seatMap, i, j, -1, 1),
    canSeeOccupied(seatMap, i, j, 0, -1),
    canSeeOccupied(seatMap, i, j, 0, 1),
    canSeeOccupied(seatMap, i, j, 1, -1),
    canSeeOccupied(seatMap, i, j, 1, 0),
    canSeeOccupied(seatMap, i, j, 1, 1),
  ].filter(Boolean).length;
}

function arrange(seatMap: string[][]): string[][] {
  return seatMap.map((row, i) => {
    return row.map((char, j) => {
      if (char === ".") {
        return char;
      }
      const adjacentOccupiedCount = [
        seatMap[i - 1]?.[j - 1],
        seatMap[i - 1]?.[j],
        seatMap[i - 1]?.[j + 1],
        seatMap[i][j - 1],
        seatMap[i][j + 1],
        seatMap[i + 1]?.[j - 1],
        seatMap[i + 1]?.[j],
        seatMap[i + 1]?.[j + 1],
      ].filter((seat) => seat === "#").length;
      if (char === "#" && adjacentOccupiedCount > 3) {
        return "L";
      }
      if (char === "L" && adjacentOccupiedCount === 0) {
        return "#";
      }
      return char;
    });
  });
}

function arrange2(seatMap: string[][]): string[][] {
  return seatMap.map((row, i) => {
    return row.map((char, j) => {
      if (char === ".") {
        return char;
      }
      const visibleSeats = countVisibleSeats(seatMap, i, j);
      if (char === "#" && visibleSeats > 4) {
        return "L";
      }
      if (char === "L" && visibleSeats === 0) {
        return "#";
      }
      return char;
    });
  });
}

function arrangeUntilSettled(seatMap: string[][]): string[][] {
  const arranged = arrange(seatMap);
  return equals(arranged, seatMap) ? arranged : arrangeUntilSettled(arranged);
}

function arrangeUntilSettled2(seatMap: string[][]): string[][] {
  const arranged = arrange2(seatMap);
  return equals(arranged, seatMap) ? arranged : arrangeUntilSettled2(arranged);
}

function countOccupiedSeats(seatMap: string[][]) {
  return seatMap.reduce(
    (acc, row) => acc + row.filter((seat) => seat === "#").length,
    0,
  );
}

const data = await loadData11();
const arrangedSeatMap = arrangeUntilSettled(data);
const arrangedSeatMap2 = arrangeUntilSettled2(data);
const result1 = countOccupiedSeats(arrangedSeatMap);
const result2 = countOccupiedSeats(arrangedSeatMap2);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);
