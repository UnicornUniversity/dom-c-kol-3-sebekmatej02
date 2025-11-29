/**
 * Generuje náhodný seznam zaměstnanců.
 * @param {object} dtoIn Vstupní objekt obsahující: count (počet zaměstnanců), age {min, max} (věkové rozpětí).
 * @returns {Array} Pole zaměstnanců.
 */
export function main(dtoIn) {
  const employees = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const employee = generateEmployee(dtoIn.age.min, dtoIn.age.max);
    employees.push(employee);
  }

  return employees;
}

// Datová pole
const maleNames = [
  "Jan",
  "Petr",
  "Pavel",
  "Tomáš",
  "Jiří",
  "Josef",
  "Martin",
  "Jaroslav",
  "Miroslav",
  "František",
];

const femaleNames = [
  "Jana",
  "Marie",
  "Eva",
  "Anna",
  "Hana",
  "Věra",
  "Lenka",
  "Petra",
  "Lucie",
  "Kateřina",
];

const maleSurnames = [
  "Novák",
  "Svoboda",
  "Novotný",
  "Dvořák",
  "Černý",
  "Procházka",
  "Kučera",
  "Veselý",
  "Horák",
  "Němec",
];

const femaleSurnames = [
  "Nováková",
  "Svobodová",
  "Novotná",
  "Dvořáková",
  "Černá",
  "Procházková",
  "Kučerová",
  "Veselá",
  "Horáková",
  "Němcová",
];

const workloads = [10, 20, 30, 40];

/**
 * Vygeneruje náhodného zaměstnance.
 * @param {number} minAge Minimální věk zaměstnance.
 * @param {number} maxAge Maximální věk zaměstnance.
 * @returns {object} Objekt zaměstnance s vlastnostmi name, surname, gender, birthdate, workload.
 */
function generateEmployee(minAge, maxAge) {
  const gender = Math.random() < 0.5 ? "male" : "female";

  let name, surname;
  if (gender === "male") {
    name = maleNames[Math.floor(Math.random() * maleNames.length)];
    surname = maleSurnames[Math.floor(Math.random() * maleSurnames.length)];
  } else {
    name = femaleNames[Math.floor(Math.random() * femaleNames.length)];
    surname = femaleSurnames[Math.floor(Math.random() * femaleSurnames.length)];
  }

  const birthdate = generateBirthdate(minAge, maxAge);
  const workload = workloads[Math.floor(Math.random() * workloads.length)];

  return {
    name: name,
    surname: surname,
    gender: gender,
    birthdate: birthdate,
    workload: workload,
  };
}

/**
 * Vygeneruje náhodné datum narození tak, aby věk byl v intervalu minAge až maxAge.
 * @param {number} minAge Minimální věk.
 * @param {number} maxAge Maximální věk.
 * @returns {string} Datum narození ve formátu ISO 8601.
 */
function generateBirthdate(minAge, maxAge) {
  const now = new Date();

  // Přibližný počet milisekund v roce (365.25 dne)
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;

  // Nejstarší možné datum narození (pro maximální věk)
  const oldestDate = now.getTime() - maxAge * msPerYear;

  // Nejmladší možné datum narození (pro minimální věk)
  const youngestDate = now.getTime() - minAge * msPerYear;

  // Vygenerujeme náhodný timestamp mezi těmito hranicemi
  const randomTimestamp =
    oldestDate + Math.random() * (youngestDate - oldestDate);

  // Vytvoříme datum a vrátíme ve formátu ISO
  const birthdate = new Date(randomTimestamp);

  return birthdate.toISOString();
}
