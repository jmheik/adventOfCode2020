import { loadData3 } from './common.mjs'

function countTrees(terrain, slope) {
  return terrain.reduce((count, row, i) => {
    const pos = (i * slope) % row.length
    return count + (row[pos] === '#' ? 1 : 0)
  }, 0)
}

const data = await loadData3()
const treeCount = countTrees(data, 3)

console.log("RESULT", treeCount)
