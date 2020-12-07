import { loadData7 } from "./utils.ts";

type Content = { name: string; amount: number };
type Bags = {
  [name: string]: Content[];
};

function parseBagRule(rule: string) {
  const [, amount, name] = rule.match(/([0-9])+ ([a-z]+ [a-z]+)/) ?? [];
  return { name, amount: parseInt(amount) };
}

function parseBagRules(data: string[]): Bags {
  return data.reduce((acc, line) => {
    const [key, value] = line.split(" bags contain ");
    return {
      ...acc,
      [key]: value !== "no other bags."
        ? value.split(", ").map(parseBagRule)
        : [],
    };
  }, {});
}

function canContain(bag: string, target: string, bags: Bags): boolean {
  return bags[bag].some((contentBag) =>
    contentBag.name === target ||
    canContain(contentBag.name, target, bags)
  );
}

function countBagsInside(bag: string, bags: Bags): number {
  return bags[bag].reduce(
    (acc, { name, amount }) => acc + amount * countBagsInside(name, bags),
    1,
  );
}

const data = await loadData7();
const bagRules = parseBagRules(data);
const bagsCanContainShinyGold = Object.keys(bagRules).map((key) =>
  canContain(key, "shiny gold", bagRules)
).filter(Boolean);
const bagsInsideShinyGold = countBagsInside("shiny gold", bagRules) - 1;

console.log(`RESULT PUZZLE 1: ${bagsCanContainShinyGold.length}`);
console.log(`RESULT PUZZLE 2: ${bagsInsideShinyGold}`);
