import { loadData4 } from "./utils.ts";

type Dictionary = Partial<{ [key: string]: string }>;

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

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function isValid(passport: Dictionary) {
  return requiredFields.every((field) => passport[field] !== undefined);
}

const data = await loadData4();
const passports = parseData(data);
const validPassports = passports.filter(isValid);

console.log("RESULT", validPassports.length);
