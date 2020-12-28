const data = [18499292, 8790390];

function transform(subject: number, loopSize: number) {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value *= subject;
    value %= 20201227;
  }
  return value;
}

function findLoopSize(publicKey: number) {
  let loopSize = 1;
  let value = 1;
  while (true) {
    value = (value * 7) % 20201227;
    if (value === publicKey) {
      return loopSize;
    }
    loopSize++;
  }
}

function solvePuzzle1() {
  const [cardPublicKey, doorPublicKey] = data;
  const cardLoopSize = findLoopSize(cardPublicKey);
  const encryptionKey = transform(doorPublicKey, cardLoopSize);
  return encryptionKey;
}

const result1 = solvePuzzle1();
const result2 = "";

console.log(`RESULT FOR PUZZLE 1: ${result1}`);
console.log(`RESULT FOR PUZZLE 2: ${result2}`);

export {};
