import {
  getAllFetalDevelopmentData,
  getFetalDevelopmentData,
  hasDataForWeek,
} from '../fetalDevelopmentService';

let mockLanguage = 'es';

// El módulo real de i18n lee expo-secure-store al cargarse; aquí solo importa el idioma.
jest.mock('../../config/i18n', () => ({
  getCurrentLanguage: () => mockLanguage,
}));

describe.each(['es', 'en'])('datos de desarrollo fetal en "%s"', (language) => {
  beforeEach(() => {
    mockLanguage = language;
  });

  it('tiene las 40 semanas', () => {
    const weeks = getAllFetalDevelopmentData();
    expect(weeks.map((w) => w.week)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
  });

  it('cada semana trae todos los campos que la pantalla de inicio muestra', () => {
    for (const week of getAllFetalDevelopmentData()) {
      expect(typeof week.size).toBe('string');
      expect(typeof week.weight).toBe('string');
      expect(week.description.length).toBeGreaterThan(0);
      expect(Array.isArray(week.milestones)).toBe(true);
      expect(Array.isArray(week.tips)).toBe(true);
      expect(Array.isArray(week.motherChanges)).toBe(true);
    }
  });
});

describe('getFetalDevelopmentData', () => {
  beforeEach(() => {
    mockLanguage = 'es';
  });

  it('devuelve null fuera del rango 1-40', () => {
    expect(getFetalDevelopmentData(0)).toBeNull();
    expect(getFetalDevelopmentData(41)).toBeNull();
  });

  it('redondea semanas con decimales', () => {
    expect(getFetalDevelopmentData(12.4)?.week).toBe(12);
  });
});

describe('hasDataForWeek', () => {
  it('coincide con el rango 1-40', () => {
    expect(hasDataForWeek(1)).toBe(true);
    expect(hasDataForWeek(40)).toBe(true);
    expect(hasDataForWeek(0)).toBe(false);
    expect(hasDataForWeek(41)).toBe(false);
  });
});
