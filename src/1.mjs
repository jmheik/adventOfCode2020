import { loadData1 } from './common.mjs'

function findPairWithSum(numbers, sum) {
  return numbers.reduce((pair, num1, i) => {
    if (pair) {
      return pair
    }
    const found = numbers.slice(0 + 1).find(num2 => num1 + num2 === sum)
    return found ? [num1, found] : null
  }, null)
}

const numbers = await loadData1()
const result = findPairWithSum(numbers, 2020)

if (result) {
  console.log("RESULT", `${result[0] * result[1]}`)
} else {
  console.log("NO RESULT FOUND")
}
