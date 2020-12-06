import { loadData6 } from "./utils.ts";

function countAnswersIntersection(answers: string[]) {
  return answers.reduce<string[]>((acc, answer, i) => {
    const letters = Array.from(answer);
    return i === 0 ? letters : acc.filter((letter) => letters.includes(letter));
  }, []).length;
}

const data = await loadData6();
const answersByGroup = data.split("\n\n").map((group) => group.split("\n"));
const sum = answersByGroup.reduce(
  (acc, answers) => acc + countAnswersIntersection(answers),
  0,
);

console.log("RESULT", sum);
