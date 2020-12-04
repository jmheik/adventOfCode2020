import { loadData1 } from './utils.ts'

function findTripletWithSum(numbers: number[], sum: number) {
  const sorted = numbers.sort()
  for (let i=0; i<sorted.length; i++) {
    for (let j=i+1; j<sorted.length; j++) {
      for (let k=j+1; k<sorted.length; k++) {
        const sum = numbers[i] + numbers[j] + numbers[k]
        if (sum === 2020) {
          return [numbers[i], numbers[j], numbers[k]]
        } else if (sum > 2020) {
          break
        }
      }
    }
  }
}

const numbers = await loadData1()
const result = findTripletWithSum(numbers, 2020)

if (result) {
  console.log("RESULT", `${result[0] * result[1] * result[2]}`)
} else {
  console.log("NO RESULT FOUND")
}
