import { loadData12 } from "./utils.ts";

type Direction = "N" | "W" | "S" | "E";
type Turn = "L" | "R";
type Action = Direction | Turn | "F";
type Directions = Record<Direction, {
  L: Direction;
  R: Direction;
  X: number;
  Y: number;
}>;

const directions: Directions = {
  N: { L: "W", R: "E", X: 0, Y: 1 },
  E: { L: "N", R: "S", X: 1, Y: 0 },
  S: { L: "E", R: "W", X: 0, Y: -1 },
  W: { L: "S", R: "N", X: -1, Y: 0 },
};

function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [Math.round(nx), Math.round(ny)];
}

function navigate(instructions: [string, number][]) {
  let facing: Direction = "E", posX = 0, posY = 0;
  instructions.forEach(([action, value]) => {
    if (action === "L" || action === "R") {
      for (let v = value; v > 0; v -= 90) {
        facing = directions[facing][action];
      }
      return;
    }
    const dir = action === "F" ? facing : action as Direction;
    posX += value * directions[dir].X;
    posY += value * directions[dir].Y;
  });

  return Math.abs(posX) + Math.abs(posY);
}

function navigateWaypoint(instructions: [string, number][]) {
  let shipX = 0, shipY = 0, waypointX = 10, waypointY = 1;
  instructions.forEach(([action, value]) => {
    if (action === "L" || action === "R") {
      const angle = value * (action === "L" ? -1 : 1);
      const [newX, newY] = rotate(0, 0, waypointX, waypointY, angle);
      waypointX = newX;
      waypointY = newY;
      return;
    }
    if (action === "F") {
      shipX += value * waypointX;
      shipY += value * waypointY;
      return;
    }
    waypointX += value * directions[action as Direction].X;
    waypointY += value * directions[action as Direction].Y;
  });

  return Math.abs(shipX) + Math.abs(shipY);
}

const data = await loadData12();
const result1 = navigate(data);
const result2 = navigateWaypoint(data);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);
