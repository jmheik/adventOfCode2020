import { loadData8 } from "./utils.ts";

type Instruction = {
  op: string;
  arg: number;
};

function parseInstruction(instruction: string): Instruction {
  const [op, argument] = instruction.split(" ");
  return { op, arg: parseInt(argument) };
}

function run(program: Instruction[]) {
  let accumulator = 0;
  let pointer = 0;
  const loopGuard = new Set<number>();
  while (pointer < program.length) {
    if (loopGuard.has(pointer)) {
      // Loop detected
      return { accumulator, exitCode: "ERROR" };
    }
    loopGuard.add(pointer);

    const { op, arg } = program[pointer];
    switch (op) {
      case "acc":
        accumulator += arg;
        pointer++;
        break;
      case "jmp":
        pointer += arg;
        break;
      case "nop":
        pointer++;
        break;
      default:
        throw Error("Unknown operation " + op);
    }
  }

  return { accumulator, exitCode: "SUCCESS" };
}

function patchInstruction({ op, arg }: Instruction) {
  switch (op) {
    case "jmp":
      return { op: "nop", arg };
    case "nop":
      return { op: "jmp", arg };
    default:
      return { op, arg };
  }
}

function fixProgram(program: Instruction[]) {
  let fixedProgram: Instruction[] = [];
  program.some((instruction, i, arr) => {
    const programCandidate = [...arr];
    programCandidate[i] = patchInstruction(instruction);
    if (run(programCandidate).exitCode === "SUCCESS") {
      fixedProgram = programCandidate;
    }
  });
  return fixedProgram;
}

const data = await loadData8();
const program = data.map(parseInstruction);
const result1 = run(program);

const fixedProgram = fixProgram(program);
const result2 = run(fixedProgram);

console.log(`RESULT PUZZLE 1: ${result1.accumulator}`);
console.log(`RESULT PUZZLE 2: ${result2.accumulator}`);
