type FeetAndInches = {
  feet: number;
  inches: number;
};

const lbsToKg = (lbs: number) => {
  return lbs * 0.45359237;
};

const kgToLbs = (kg: number) => {
  return kg / 0.45359237;
};

const feetAndInchesToCm = (feet: number, inches: number) => {
  return (feet * 12 + inches) * 2.54;
};

const cmToFeetAndInches = (cm: number): FeetAndInches => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
};

export { lbsToKg, kgToLbs, feetAndInchesToCm, cmToFeetAndInches };
