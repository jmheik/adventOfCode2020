import { loadData2 } from "./utils.ts";

function validate(
  password: string,
  letter: string,
  firstPos: number,
  secondPos: number,
) {
  const firstMatch = password[firstPos - 1] === letter;
  const secondMatch = password[secondPos - 1] === letter;
  return firstMatch ? !secondMatch : secondMatch;
}

function parseData(data: string[]): Array<[string, string, number, number]> {
  return data.map((line) => {
    const [policy, password] = line.split(": ");
    const [range, letter] = policy.split(" ");
    const [firstPos, secondPos] = line.split("-");
    return [password, letter, parseInt(firstPos), parseInt(secondPos)];
  });
}

const data = await loadData2();
const parsedData = parseData(data);
const validPasswordCount = parsedData.reduce((count, dataRow) => {
  return validate(...dataRow) ? count + 1 : count;
}, 0);

console.log("RESULT", validPasswordCount);
