import { ELITE_SUPPLEMENTS, ESENCIAL_SUPPLEMENTS, PREMIUM_SUPPLEMENTS } from '../index';
import { getSupplementById, getSupplementsByTier } from '../personalization';

describe('getSupplementsByTier', () => {
  it.each(['esencial', 'premium', 'elite'] as const)('devuelve solo suplementos "%s"', (tier) => {
    const result = getSupplementsByTier(tier);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((s) => s.tier === tier)).toBe(true);
  });
});

describe('getSupplementById', () => {
  it('encuentra un suplemento de cada catálogo', () => {
    for (const catalog of [ESENCIAL_SUPPLEMENTS, PREMIUM_SUPPLEMENTS, ELITE_SUPPLEMENTS]) {
      expect(getSupplementById(catalog[0].id)).toBe(catalog[0]);
    }
  });

  it('devuelve undefined si el id no existe', () => {
    expect(getSupplementById('no-existe')).toBeUndefined();
  });
});

describe('catálogo', () => {
  it('no repite ids entre catálogos', () => {
    const ids = [...ESENCIAL_SUPPLEMENTS, ...PREMIUM_SUPPLEMENTS, ...ELITE_SUPPLEMENTS].map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
