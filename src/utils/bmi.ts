const calculateBmi = (
  weightKg: number | null,
  heightCm: number | null,
): number | null => {
  if (weightKg === null || heightCm === null) {
    return null;
  }
  return Math.round((weightKg / (heightCm / 100) ** 2) * 10) / 10;
};

const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

export { calculateBmi, getBMICategory };
