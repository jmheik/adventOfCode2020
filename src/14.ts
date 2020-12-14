import { loadData14 } from "./utils.ts";

function applyMask(value: number, mask: string) {
  const binary = value.toString(2).padStart(36, "0").split("");
  const masked = Array.from(mask)
    .map((char, i) => char === "X" ? binary[i] : char)
    .join("");
  return parseInt(masked, 2);
}

function applyMask2(address: number, mask: string) {
  let addresses = [address.toString(2).padStart(36, "0").split("")];
  Array.from(mask).forEach((char, i) => {
    addresses.forEach((addr) => {
      if (char === "1") {
        addr[i] = "1";
      }
      if (char === "X") {
        const newAddr = [...addr];
        addr[i] = "0";
        newAddr[i] = "1";
        addresses.push(newAddr);
      }
    });
  });
  return addresses.map((addr) => parseInt(addr.join(""), 2));
}

function decode1(program: string[]) {
  const mem: { [key: string]: number } = {};
  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  program.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.replace("mask = ", "");
    } else {
      const [, key, value] = line.match(/mem\[([0-9]+)\] = ([0-9]+)/)!;
      mem[key] = applyMask(parseInt(value), mask);
    }
  });

  return Object.values(mem).reduce((sum, v) => sum + v, 0);
}

function decode2(program: string[]) {
  const mem: { [key: number]: number } = {};
  let mask = "000000000000000000000000000000000000";

  program.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.replace("mask = ", "");
    } else {
      const [, key, value] = line.match(/mem\[([0-9]+)\] = ([0-9]+)/)!;
      const addresses = applyMask2(parseInt(key), mask);
      addresses.forEach((addr) => mem[addr] = parseInt(value));
    }
  });

  return Object.values(mem).reduce((sum, v) => sum + v, 0);
}

const data = await loadData14();
const result1 = decode1(data);
const result2 = decode2(data);

console.log(`RESULT PUZZLE 1: ${result1}`);
console.log(`RESULT PUZZLE 2: ${result2}`);
