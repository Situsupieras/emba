import { calculateTrimester, isValidAge, isValidWeek } from '../appConstants';

describe('calculateTrimester', () => {
  it.each([
    [1, 1],
    [13, 1],
    [14, 2],
    [27, 2],
    [28, 3],
    [40, 3],
  ])('semana %i pertenece al trimestre %i', (week, trimester) => {
    expect(calculateTrimester(week)).toBe(trimester);
  });
});

describe('isValidWeek', () => {
  it('acepta los límites 1 y 40', () => {
    expect(isValidWeek(1)).toBe(true);
    expect(isValidWeek(40)).toBe(true);
  });

  it('rechaza valores fuera de 1-40', () => {
    expect(isValidWeek(0)).toBe(false);
    expect(isValidWeek(41)).toBe(false);
    expect(isValidWeek(NaN)).toBe(false);
  });
});

describe('isValidAge', () => {
  it('acepta los límites 18 y 50', () => {
    expect(isValidAge(18)).toBe(true);
    expect(isValidAge(50)).toBe(true);
  });

  it('rechaza valores fuera de 18-50', () => {
    expect(isValidAge(17)).toBe(false);
    expect(isValidAge(51)).toBe(false);
  });
});
