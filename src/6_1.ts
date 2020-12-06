import { loadData6 } from './utils.ts';

const data = await loadData6();
const groups = data.split('\n\n');
const groupAnswers = groups.map((group) => {
  const letters = group.replace(/\s/g, '');
  return (new Set(letters)).size;
});
const sum = groupAnswers.reduce((acc, answers) => 
  acc + answers,
  0
);

console.log("RESULT", sum);
