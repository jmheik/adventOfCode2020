async function readDataFile(dataFileName: string) {
  return Deno.readTextFile(`./src/data/${dataFileName}`);
}

export async function loadData1() {
  const input = await readDataFile('1.txt')
  return input.split('\n').filter(Boolean).map(line => parseInt(line, 10))
}

export async function loadData2() {
  const input = await readDataFile('2.txt')
  return input.split('\n').filter(Boolean)
}

export async function loadData3() {
  const input = await readDataFile('3.txt')
  return input.split('\n').filter(Boolean)
}
