import { loadData16 } from "./utils.ts";

type Range = [number, number];
type Field = {
  name: string;
  ranges: [Range, Range];
};
type Ticket = number[];

function getFields(input: string): Field[] {
  const rangesSection = input.split("\nyour ticket:\n")[0];
  return rangesSection.split("\n")
    .filter(Boolean)
    .map((line) => {
      const name = line.split(":")[0];
      const ranges = (line.match(/[\d]*-[\d]*/g) ?? [])
        .map((range) => range.split("-").map((num) => parseInt(num))) as [
          Range,
          Range,
        ];
      return { name, ranges };
    });
}

function getTickets(input: string): Ticket[] {
  const ticketsSection = input.split("nearby tickets:\n")[1];
  return ticketsSection.split("\n")
    .filter(Boolean)
    .map((line) => line.split(",").map((value) => parseInt(value)));
}

function getMyTicket(input: string): Ticket {
  const myTicket = input.split(/your ticket:\n|nearby tickets:/)[1];
  return myTicket.split(",").filter(Boolean).map((value) => parseInt(value));
}

function withinRange(range: Range, value: number) {
  return value >= range[0] && value <= range[1];
}

function findInvalidTicketValues(fields: Field[], tickets: number[][]) {
  return tickets.flat().filter((value) =>
    !fields.some((field) =>
      withinRange(field.ranges[0], value) ||
      withinRange(field.ranges[1], value)
    )
  );
}

function findValidTickets(fields: Field[], tickets: number[][]): Ticket[] {
  return tickets.filter((ticket) =>
    ticket.every((value) =>
      fields.some((field) =>
        withinRange(field.ranges[0], value) ||
        withinRange(field.ranges[1], value)
      )
    )
  );
}

function orderFields(fields: Field[], tickets: number[][]): Field[] {
  let remaining = [...fields];
  const result: Array<Field | undefined> = Array(fields.length).fill(undefined);

  while (remaining.length > 0) {
    fields.some((_, i) => {
      if (result[i]) {
        return false;
      }
      const found = remaining.filter((field) => (
        tickets.every((ticket) =>
          withinRange(field.ranges[0], ticket[i]) ||
          withinRange(field.ranges[1], ticket[i])
        )
      ));
      if (found.length === 1) {
        result[i] = found[0];
        remaining = remaining.filter((f) => f !== found[0]);
        return true;
      }
    });
  }

  return result as Field[];
}

function solvePuzzle1(data: string) {
  const fields = getFields(data);
  const tickets = getTickets(data);
  return findInvalidTicketValues(fields, tickets)
    .reduce((sum, ticket) => sum + ticket, 0);
}

function solvePuzzle2(data: string) {
  const fields = getFields(data);
  const myTicket = getMyTicket(data);
  const tickets = findValidTickets(
    fields,
    getTickets(data),
  );
  const orderedFields = orderFields(
    fields,
    [myTicket, ...tickets],
  );
  return myTicket.reduce(
    (acc, value, i) =>
      orderedFields[i].name.includes("departure") ? acc * value : acc,
    1,
  );
}

const data = await loadData16();
const result1 = solvePuzzle1(data);
const result2 = solvePuzzle2(data);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);
