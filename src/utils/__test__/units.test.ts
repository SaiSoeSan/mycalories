import {
  lbsToKg,
  kgToLbs,
  feetAndInchesToCm,
  cmToFeetAndInches,
} from "../units";

describe("Unit conversion functions", () => {
  it("converts pounds to kilograms", () => {
    expect(lbsToKg(100)).toBeCloseTo(45.359237);
  });

  it("converts kilograms to pounds", () => {
    expect(kgToLbs(45.359237)).toBeCloseTo(100);
  });

  it("converts feet and inches to centimeters", () => {
    expect(feetAndInchesToCm(5, 10)).toBeCloseTo(177.8);
  });

  it("converts centimeters to feet and inches", () => {
    const result = cmToFeetAndInches(177.8);
    expect(result.feet).toBe(5);
    expect(result.inches).toBeCloseTo(10);
  });
});
    