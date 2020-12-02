import { loadData3 } from './common.mjs'

function validate(password, letter, lowerBound, upperBound) {
  const matches = password.split('').filter(l => l === letter).length
  return matches >= lowerBound && matches <= upperBound
}

function parseData(data) {
  return data.map(line => {
    const [policy, password] = line.split(': ')
    const [range, letter] = policy.split(' ')
    const [lowerBound, upperBound] = line.split('-')
    return [password, letter, parseInt(lowerBound), parseInt(upperBound)]
  })
}

const data = await loadData3()
const parsedData = parseData(data)
const validPasswordCount = parsedData.reduce((count, dataRow) => {
  return validate(...dataRow) ? count + 1 : count
}, 0)

console.log("RESULT", validPasswordCount)
