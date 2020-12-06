import { loadData4 } from "./utils.ts";

type Dictionary<T> = Partial<{ [key: string]: T }>;
type Validator = (value: string) => boolean;

function isWithin(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

function parseData(data: string) {
  const passports = data.split("\n\n");
  return passports.map((passport) => {
    const fields = passport.split(/[ \n/]+/);
    return fields.reduce((acc, field) => {
      const [key, value] = field.split(":");
      return {
        ...acc,
        [key]: value,
      };
    }, {});
  });
}

const numberValidator = (min: number, max: number) =>
  (value: string) => {
    const int = parseInt(value);
    return isFinite(int) && isWithin(int, min, max);
  };
const validators: Dictionary<Validator> = {
  byr: numberValidator(1920, 2002),
  iyr: numberValidator(2010, 2020),
  eyr: numberValidator(2020, 2030),
  hgt: (value) => {
    const matches = value.match(/([0-9]+)(cm|in)/);
    if (!matches || matches.length !== 3) {
      return false;
    }
    const height = parseInt(matches[1]);
    if (matches[2] === "cm") {
      return isWithin(height, 150, 193);
    } else {
      return isWithin(height, 59, 76);
    }
  },
  hcl: (value) => /^#[0-9a-f]{6}$/.test(value),
  ecl: (value) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value),
  pid: (value) => /^[0-9]{9}$/.test(value),
  cid: () => true,
};
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function isValid(passport: Dictionary<string>) {
  return requiredFields.every((field) => {
    const value = passport[field];
    if (value === undefined) {
      return false;
    }
    return validators[field]?.(value) ?? false;
  });
}

const data = await loadData4();
const passports = parseData(data);
const validPassports = passports.filter(isValid);

console.log("RESULT", validPassports.length);
