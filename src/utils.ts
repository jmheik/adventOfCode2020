async function readDataFile(dataFileName: string) {
  return Deno.readTextFile(`./src/data/${dataFileName}`);
}

async function dataFileAsLines(dataFileName: string) {
  const data = await readDataFile(dataFileName);
  return data.split("\n").filter(Boolean);
}

export async function loadData1() {
  const lines = await dataFileAsLines("1.txt");
  return lines.map((line) => parseInt(line, 10));
}

export async function loadData2() {
  return dataFileAsLines("2.txt");
}

export async function loadData3() {
  return dataFileAsLines("3.txt");
}

export async function loadData4() {
  return readDataFile("4.txt");
}

export async function loadData5() {
  return dataFileAsLines("5.txt");
}

export async function loadData6() {
  return readDataFile("6.txt");
}

export async function loadData7() {
  return dataFileAsLines("7.txt");
}

export async function loadData8() {
  return dataFileAsLines("8.txt");
}

export async function loadData9() {
  const lines = await dataFileAsLines("9.txt");
  return lines.map((line) => parseInt(line, 10));
}
