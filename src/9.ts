import { loadData9 } from "./utils.ts";

function validate(numArray: number[], index: number) {
  const value = numArray[index];
  for (let i = index - 25; i < index; i++) {
    for (let j = i + 1; j < index; j++) {
      if (numArray[i] + numArray[j] === value) {
        return { value, isValid: true };
      }
    }
  }
  return { value, isValid: false };
}

function findSubArrayWithSum(numArray: number[], targetSum: number) {
  for (let i = 0; i < numArray.length; i++) {
    let sum = numArray[i];
    for (let j = i + 1; j < numArray.length; j++) {
      sum += numArray[j];
      if (sum > targetSum) {
        break;
      }
      if (sum === targetSum) {
        return numArray.slice(i, j + 1);
      }
    }
  }
  return [];
}

function sumOfMinAndMax(numArray: number[]) {
  return Math.min(...numArray) + Math.max(...numArray);
}

const data = await loadData9();
const result1 = data.find((_, i) => i > 24 && !validate(data, i).isValid);

const range = findSubArrayWithSum(data, result1!);
const result2 = sumOfMinAndMax(range);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);
