import { calculateBmi, getBMICategory } from "../bmi";

describe("calculateBmi", () => {
  it("calculates BMI and rounds it to one decimal place", () => {
    expect(calculateBmi(75, 180)).toBe(23.1);
  });

  it("returns null when height is missing", () => {
    expect(calculateBmi(75, null)).toBeNull();
  });

  it("returns null when weight is missing", () => {
    expect(calculateBmi(null, 180)).toBeNull();
  });
});

describe("getBMICategory", () => {
  it("returns 'Underweight' for BMI < 18.5", () => {
    expect(getBMICategory(18)).toBe("Underweight");
  });

  it("returns 'Normal weight' for 18.5 <= BMI < 24.9", () => {
    expect(getBMICategory(22)).toBe("Normal weight");
  });

  it("returns 'Overweight' for 25 <= BMI < 29.9", () => {
    expect(getBMICategory(27)).toBe("Overweight");
  });

  it("returns 'Obesity' for BMI >= 30", () => {
    expect(getBMICategory(31)).toBe("Obesity");
  });
});
