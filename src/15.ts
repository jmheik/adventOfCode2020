// Brute force, there must be faster algorithm for this
function iterate(input: number[], turns: number) {
  let lastIndices = input.reduce<{ [key: number]: number }>((acc, num, i) => ({
    ...acc,
    [num]: i,
  }), {});
  let current = 0;
  for (let i = input.length; i < turns - 1; i++) {
    const lastIndexOfCurrent = lastIndices[current];
    lastIndices[current] = i;
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
