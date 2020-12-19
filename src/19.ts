import { loadData19 } from "./utils.ts";

const testInput = [
  "42: 9 14 | 10 1",
  "9: 14 27 | 1 26",
  "10: 23 14 | 28 1",
  '1: "a"',
  "11: 42 31",
  "5: 1 14 | 15 1",
  "19: 14 1 | 14 14",
  "12: 24 14 | 19 1",
  "16: 15 1 | 14 14",
  "31: 14 17 | 1 13",
  "6: 14 14 | 1 14",
  "2: 1 24 | 14 4",
  "0: 8 11",
  "13: 14 3 | 1 12",
  "15: 1 | 14",
  "17: 14 2 | 1 7",
  "23: 25 1 | 22 14",
  "28: 16 1",
  "4: 1 1",
  "20: 14 14 | 1 15",
  "3: 5 14 | 16 1",
  "27: 1 6 | 14 18",
  '14: "b"',
  "21: 14 1 | 1 14",
  "25: 1 1 | 1 14",
  "22: 14 14",
  "8: 42",
  "26: 14 22 | 1 20",
  "18: 15 15",
  "7: 14 5 | 1 21",
  "24: 14 1",
  "",
  "abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa",
  "bbabbbbaabaabba",
  "babbbbaabbbbbabbbbbbaabaaabaaa",
  "aaabbbbbbaaaabaababaabababbabaaabbababababaaa",
  "bbbbbbbaaaabbbbaaabbabaaa",
  "bbbababbbbaaaaaaaabbababaaababaabab",
  "ababaaaaaabaaab",
  "ababaaaaabbbaba",
  "baabbaaaabbaaaababbaababb",
  "abbbbabbbbaaaababbbbbbaaaababb",
  "aaaaabbaabaaaaababaa",
  "aaaabbaaaabbaaa",
  "aaaabbaabbaaaaaaabbbabbbaaabbaabaaa",
  "babaaabbbaaabaababbaabababaaab",
  "aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba",
];

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

function patchRules(rules: Rules) {
  return {
    ...rules,
    8: [[42], [42, 8]],
    11: [[42, 31], [42, 11, 31]],
  };
}

function solvePuzzle1(data: string[]) {
  const rules = getRules(data);
  const inputs = getInputs(data);
  return inputs.filter((line) => match(line, 0, rules, 0) === line.length)
    .length;
}

function solvePuzzle2(data: string[]) {
  // match handles patched rules wrong
  const rules = getRules(data);
  const patchedRules = patchRules(rules);
  const inputs = getInputs(data);
  return inputs.filter((line) =>
    match(line, 0, patchedRules, 0) === line.length
  ).length;
}

const data = await loadData19();
const result1 = solvePuzzle1(data);
const result2 = solvePuzzle2(data);

console.log(`RESULT FOR PUZZLE1 ${result1}`);
console.log(`RESULT FOR PUZZLE2 ${result2}`);
