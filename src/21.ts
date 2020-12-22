import { loadData21 } from "./utils.ts";

type Line = { ingredients: string[]; allergens: string[] };

function intersection(input1: string[], input2: string[]) {
  return input1.filter((v) => input2.includes(v));
}

function parseData(data: string[]): Line[] {
  return data.map((line) => line.match(/^([a-z ]+) \(contains ([a-z, ]+)/))
    .map((matches) => ({
      ingredients: matches![1].split(" "),
      allergens: matches![2].split(", "),
    }));
}

function getAllergens(lines: Line[]) {
  return lines.map((line) => line.allergens)
    .flat()
    .filter((v, i, arr) => arr.lastIndexOf(v) === i);
}

function getIngredients(lines: Line[]) {
  return lines.map((line) => line.ingredients)
    .flat()
    .filter((v, i, arr) => arr.lastIndexOf(v) === i);
}

function solvePuzzle1(lines: Line[]) {
  let allergens = getAllergens(lines);
  const matched = new Set<string>();
  while (allergens.length > 0) {
    allergens = allergens.filter((allergen) => {
      const ingredients = lines.filter((line) =>
        line.allergens.includes(allergen)
      ).reduce<string[]>(
        (acc, line, i) =>
          i === 0 ? line.ingredients : intersection(acc, line.ingredients),
        [],
      ).filter((ingredient) => !matched.has(ingredient));
      if (ingredients.length === 1) {
        matched.add(ingredients[0]);
        return false;
      }
      return true;
    });
  }

  const nonAllergic = getIngredients(lines).filter((i) => !matched.has(i));
  return lines.reduce(
    (acc, line) =>
      acc + line.ingredients.filter((i) => nonAllergic.includes(i)).length,
    0,
  );
}

function solvePuzzle2(lines: Line[]) {
  let allergens = getAllergens(lines);
  const matched = new Set<string>();
  const mapping = new Map<string, string>();
  while (allergens.length > 0) {
    allergens = allergens.filter((allergen) => {
      const ingredients = lines.filter((line) =>
        line.allergens.includes(allergen)
      ).reduce<string[]>(
        (acc, line, i) =>
          i === 0 ? line.ingredients : intersection(acc, line.ingredients),
        [],
      ).filter((ingredient) => !matched.has(ingredient));
      if (ingredients.length === 1) {
        matched.add(ingredients[0]);
        mapping.set(allergen, ingredients[0]);
        return false;
      }
      return true;
    });
  }
  return Array.from(mapping.entries())
    .sort((a, b) => a[0] > b[0] ? 1 : -1)
    .map(([, value]) => value)
    .join(",");
}

const data = await loadData21();
const lines = parseData(data);
const result1 = solvePuzzle1(lines);
const result2 = solvePuzzle2(lines);

console.log(`RESULT FOR PUZZLE1: ${result1}`);
console.log(`RESULT FOR PUZZLE2: ${result2}`);
