import { ESENCIAL_SUPPLEMENTS } from '@/data/supplements';
import { Supplement } from '@/types';
import { EXCHANGE_RATE } from '@/utils/constants/appConstants';
import { filterByTrimester, toLegacySupplement, toLegacySupplements } from '../supplementConverter';

describe('toLegacySupplement', () => {
  const real = ESENCIAL_SUPPLEMENTS[0];
  const legacy = toLegacySupplement(real);

  it('conserva identidad y dosis', () => {
    expect(legacy.id).toBe(real.id);
    expect(legacy.name).toBe(real.name);
    expect(legacy.dosage).toBe(real.recommendedDose);
    expect(legacy.trimester).toEqual(real.trimesters);
  });

  it('une los beneficios de madre y bebé, en ese orden', () => {
    expect(legacy.benefits).toEqual([...real.benefits.mother, ...real.benefits.baby]);
  });

  it('convierte el precio de GTQ a USD con 2 decimales', () => {
    const expected = Number((real.priceGTQ * EXCHANGE_RATE.USD_TO_GTQ).toFixed(2));
    expect(legacy.price).toBe(expected);
  });
});

describe('toLegacySupplements', () => {
  it('convierte todos los elementos', () => {
    expect(toLegacySupplements(ESENCIAL_SUPPLEMENTS)).toHaveLength(ESENCIAL_SUPPLEMENTS.length);
  });
});

describe('filterByTrimester', () => {
  const base = toLegacySupplement(ESENCIAL_SUPPLEMENTS[0]);
  const onlyFirst: Supplement = { ...base, id: 'a', trimester: [1] };
  const secondAndThird: Supplement = { ...base, id: 'b', trimester: [2, 3] };

  it('devuelve solo los suplementos del trimestre pedido', () => {
    expect(filterByTrimester([onlyFirst, secondAndThird], 1)).toEqual([onlyFirst]);
    expect(filterByTrimester([onlyFirst, secondAndThird], 3)).toEqual([secondAndThird]);
  });

  it('devuelve lista vacía si ninguno aplica', () => {
    expect(filterByTrimester([onlyFirst], 2)).toEqual([]);
  });
});
