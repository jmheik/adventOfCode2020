import { loadData19 } from "./utils.ts";

type Rule = "a" | "b" | number[][];
type Rules = {
  [key: number]: Rule;
};

function getRules(lines: string[]) {
  const rules: Rules = {};
  lines.forEach((line) => {
    if (!line.includes(":")) {
      return;
    }
    const [id, rule] = line.split(": ");
    if (rule.startsWith('"')) {
      rules[parseInt(id)] = rule.slice(1, 2) as "a" | "b";
    } else {
      rules[parseInt(id)] = rule.split("|")
        .map((s) =>
          s.split(" ")
            .filter(Boolean)
            .map((s) => parseInt(s))
        );
    }
  });
  return rules;
}

function getInputs(lines: string[]) {
  return lines.filter((line) => /^[ab]+$/.test(line));
}

function match(
  input: string,
  index: number,
  rules: Rules,
  ruleNumber: number,
): number {
  const rule = rules[ruleNumber];
  if (typeof rule === "string") {
    return input[index] === rule ? index + 1 : 0;
  }
  outer:
  for (let i = 0; i < rule.length; i++) {
    const refs = rule[i];
    let nextIndex = index;
    for (let j = 0; j < refs.length; j++) {
      const inc = match(input, nextIndex, rules, refs[j]);
      if (inc === 0) {
        continue outer;
      }
      nextIndex = inc;
    }
    return nextIndex;
  }
  return 0;
}

function match2(
  input: string,
  rules: Rules,
): number {
  // Special casing:
  // - Rule 42 must match N times, N > 0
  // - Rule 31 must match M times, 0 < M < N
  let index = 0;
  let matches42 = 0;
  let matches31 = 0;
  while (true) {
    const nextIndex = match(input, index, rules, 42);
    if (nextIndex === 0) {
      break;
    }
    index = nextIndex;
    matches42++;
  }
  if (index === input.length) {
    return 0;
  }
  while (matches31 < matches42) {
    const nextIndex = match(input, index, rules, 31);
    if (nextIndex === 0) {
      break;
    }
    index = nextIndex;
    matches31++;
  }
  return index;
}

function solvePuzzle1(data: string[]) {
  const rules = getRules(data);
  const inputs = getInputs(data);
  return inputs.filter((line) => match(line, 0, rules, 0) === line.length)
    .length;
}

function solvePuzzle2(data: string[]) {
  const rules = getRules(data);
  const inputs = getInputs(data);
  return inputs.filter((line) => match2(line, rules) === line.length)
    .length;
}

const data = await loadData19();
const result1 = solvePuzzle1(data);
const result2 = solvePuzzle2(data);

console.log(`RESULT FOR PUZZLE1 ${result1}`);
console.log(`RESULT FOR PUZZLE2 ${result2}`);
