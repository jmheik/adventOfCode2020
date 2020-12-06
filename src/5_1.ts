import { loadData5 } from "./utils.ts";

function toBits(str: string) {
  return Array.from(str).map((char) => (char === "B" || char === "R") ? 1 : 0);
}

function toNumber(bitArray: number[]) {
  return bitArray.reduce((acc, bit) => (
    (acc << 1) | bit
  ), 0);
}

function parseSeat(pass: string) {
  const row = pass.slice(0, 7);
  const column = pass.slice(7, 10);

  const rowNumber = toNumber(toBits(row));
  const seatNumber = toNumber(toBits(column));
  const seatId = rowNumber * 8 + seatNumber;

  return [rowNumber, seatNumber, seatId];
}

const data = await loadData5();
const seats = data.map(parseSeat);
const highestSeatId = Math.max(...seats.map((s) => s[2]));

console.log("RESULT", highestSeatId);
