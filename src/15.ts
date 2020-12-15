function iterate(input: number[], turns: number) {
  const lastIndices = new Map(input.map((value, index) => [value, index]));
  let current = 0;
  for (let i = input.length; i < turns - 1; i++) {
    const lastIndexOfCurrent = lastIndices.get(current);
    lastIndices.set(current, i);
    current = lastIndexOfCurrent === undefined ? 0 : i - lastIndexOfCurrent;
  }
  return current;
}

const data = [14, 1, 17, 0, 3, 20];

const result1 = iterate(data, 2020);
const result2 = iterate(data, 30000000);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);

export {};
