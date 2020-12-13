import { loadData13 } from "./utils.ts";

function parseData(rows: string[]) {
  const [time, buses] = rows;
  return {
    time: parseInt(time),
    buses: buses.split(",").filter((id) => id !== "x").map((id) =>
      parseInt(id)
    ),
  };
}

function parseData2(rows: string[]) {
  return rows[1].split(",").map((id) => id === "x" ? 1 : parseInt(id));
}

function firstAfterTime(time: number, buses: number[]) {
  let bestId = buses[0];
  let bestWaitingTime = bestId - time % bestId;
  buses.forEach((id) => {
    const waitingTime = id - time % id;
    if (waitingTime < bestWaitingTime) {
      bestId = id;
      bestWaitingTime = waitingTime;
    }
  });
  return bestId * bestWaitingTime;
}

function findPuzzle2Solution(buses: number[]) {
  return buses.map((id, offset) => ([id, offset]))
    .filter(([id]) => id > 1)
    .reduce(([timestamp, step], bus) => {
      const [id, offset] = bus;
      while (true) {
        if ((timestamp + offset) % id === 0) {
          step *= id;
          break;
        }
        timestamp += step;
      }
      return [timestamp, step];
    }, [0, 1])[0];
}

const data = await loadData13();
const { time, buses } = parseData(data);
const buses2 = parseData2(data);

const result1 = firstAfterTime(time, buses);
const result2 = findPuzzle2Solution(buses2);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);
