import { loadData18 } from "./utils.ts";

type Calculation = {
  result: number;
  index: number;
};

function calculate(input: string, i = 0): Calculation {
  let result = 0;
  let operator: "+" | "*" | undefined;
  while (i < input.length) {
    const char = input[i];
    let num = 0;
    switch (char) {
      case " ":
        break;
      case "+":
      case "*":
        operator = char;
        break;
      case "(": {
        const subresult = calculate(input, i + 1);
        i = subresult.index;
        num = subresult.result;
        break;
      }
      case ")":
        return { result, index: i };
      default:
        num = parseInt(char);
        break;
    }
    i++;
    if (!num) {
      continue;
    }
    if (operator === "+") {
      result += num;
    } else if (operator === "*") {
      result *= num;
    } else {
      result = num;
    }
  }
  return { result, index: i };
}

function calculate2(input: string, i = 0): Calculation {
  let result = 0;
  let operator: "+" | "*" | undefined;
  while (i < input.length) {
    const char = input[i];
    let num = 0;
    switch (char) {
      case " ":
        break;
      case "+":
        operator = char;
        break;
      case "*": {
        const subresult = calculate2(input, i + 1);
        i = subresult.index - 1;
        num = subresult.result;
        operator = char;
        break;
      }
      case "(": {
        const subresult = calculate2(input, i + 1);
        i = subresult.index;
        num = subresult.result;
        break;
      }
      case ")":
        return { result, index: i };
      default:
        num = parseInt(char);
        break;
    }
    i++;
    if (!num) {
      continue;
    }
    if (operator === "+") {
      result += num;
    } else if (operator === "*") {
      result *= num;
    } else {
      result = num;
    }
  }
  return { result, index: i };
}

function sumOfResults(data: string[]) {
  return data.map((line) => calculate(line).result)
    .reduce((acc, v) => acc + v, 0);
}

function sumOfResults2(data: string[]) {
  return data.map((line) => calculate2(line).result)
    .reduce((acc, v) => acc + v, 0);
}

const data = await loadData18();
const result1 = sumOfResults(data);
const result2 = sumOfResults2(data);

console.log(`RESULT FOR PUZZLE1 ${result1}`);
console.log(`RESULT FOR PUZZLE2 ${result2}`);
