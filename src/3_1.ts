import { loadData3 } from './utils.ts'

function countTrees(terrain: string[], slope: number) {
  return terrain.reduce((count, row, i) => {
    const pos = (i * slope) % row.length
    return count + (row[pos] === '#' ? 1 : 0)
  }, 0)
}

const data = await loadData3()
const treeCount = countTrees(data, 3)

console.log("RESULT", treeCount)
