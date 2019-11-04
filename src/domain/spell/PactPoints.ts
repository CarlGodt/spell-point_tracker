import { $SpellPointIndex } from './SpellPoints';
import SPELL_COST from './SpellCost';

const PactPoints: $SpellPointIndex = {
  1: {
    level: 1,
    ...calculateSpellPoints(1, 1),
  },
  2: {
    level: 2,
    ...calculateSpellPoints(1, 2),
  },
  3: {
    level: 3,
    ...calculateSpellPoints(2, 2),
  },
  4: {
    level: 4,
    ...calculateSpellPoints(2, 2),
  },
  5: {
    level: 5,
    ...calculateSpellPoints(3, 2),
  },
  6: {
    level: 6,
    ...calculateSpellPoints(3, 2),
  },
  7: {
    level: 7,
    ...calculateSpellPoints(4, 2),
  },
  8: {
    level: 8,
    ...calculateSpellPoints(4, 2),
  },
  9: {
    level: 9,
    ...calculateSpellPoints(5, 2),
  },
  10: {
    level: 10,
    ...calculateSpellPoints(5, 2),
  },
  11: {
    level: 11,
    ...calculateSpellPoints(5, 3),
  },
  12: {
    level: 12,
    ...calculateSpellPoints(5, 3),
  },
  13: {
    level: 13,
    ...calculateSpellPoints(5, 3),
  },
  14: {
    level: 14,
    ...calculateSpellPoints(5, 3),
  },
  15: {
    level: 15,
    ...calculateSpellPoints(5, 3),
  },
  16: {
    level: 16,
    ...calculateSpellPoints(5, 3),
  },
  17: {
    level: 17,
    ...calculateSpellPoints(5, 4),
  },
  18: {
    level: 18,
    ...calculateSpellPoints(5, 4),
  },
  19: {
    level: 19,
    ...calculateSpellPoints(5, 4),
  },
  20: {
    level: 20,
    ...calculateSpellPoints(5, 4),
  },
};

export default PactPoints;

function calculateSpellPoints(
  slotLevel: number,
  slots: number
): { maxSpellLevel: number; spellPoints: number } {
  return {
    maxSpellLevel: slotLevel,
    spellPoints: SPELL_COST[slotLevel].pointCost * slots,
  };
}
