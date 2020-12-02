import fs from 'node:fs/promises'
import path from 'node:path'

async function readDataFile(relativePath) {
  const dataUrl = new URL(relativePath, import.meta.url)
  return await fs.readFile(dataUrl, 'utf8')
}

export async function loadData1() {
  const input = await readDataFile('./data/1.txt')
  return input.split('\n').filter(Boolean).map(line => parseInt(line, 10))
}

export async function loadData3() {
  const input = await readDataFile('./data/3.txt')
  return input.split('\n').filter(Boolean)
}
