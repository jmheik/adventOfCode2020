import { loadData2 } from './utils.ts'

function validate(password: string, letter: string, lowerBound: number, upperBound: number) {
  const matches = password.split('').filter(l => l === letter).length
  return matches >= lowerBound && matches <= upperBound
}

function parseData(data: string[]): Array<[string, string, number, number]> {
  return data.map(line => {
    const [policy, password] = line.split(': ')
    const [range, letter] = policy.split(' ')
    const [lowerBound, upperBound] = line.split('-')
    return [password, letter, parseInt(lowerBound), parseInt(upperBound)]
  })
}

const data = await loadData2()
const parsedData = parseData(data)
const validPasswordCount = parsedData.reduce((count, dataRow) => {
  return validate(...dataRow) ? count + 1 : count
}, 0)

console.log("RESULT", validPasswordCount)
