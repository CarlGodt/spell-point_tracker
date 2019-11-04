export interface $SpellPoints {
  readonly level: number;
  readonly maxSpellLevel: number;
  readonly spellPoints: number;
}

export interface $SpellPointIndex {
  readonly [key: number]: $SpellPoints;
}

const SpellPoints: $SpellPointIndex = {
  1: {
    level: 1,
    maxSpellLevel: 1,
    spellPoints: 4,
  },
  2: {
    level: 2,
    maxSpellLevel: 1,
    spellPoints: 6,
  },
  3: {
    level: 3,
    maxSpellLevel: 2,
    spellPoints: 14,
  },
  4: {
    level: 4,
    maxSpellLevel: 2,
    spellPoints: 17,
  },
  5: {
    level: 5,
    maxSpellLevel: 3,
    spellPoints: 27,
  },
  6: {
    level: 6,
    maxSpellLevel: 3,
    spellPoints: 32,
  },
  7: {
    level: 7,
    maxSpellLevel: 4,
    spellPoints: 38,
  },
  8: {
    level: 8,
    maxSpellLevel: 4,
    spellPoints: 44,
  },
  9: {
    level: 9,
    maxSpellLevel: 5,
    spellPoints: 57,
  },
  10: {
    level: 10,
    maxSpellLevel: 5,
    spellPoints: 64,
  },
  11: {
    level: 11,
    maxSpellLevel: 6,
    spellPoints: 73,
  },
  12: {
    level: 12,
    maxSpellLevel: 6,
    spellPoints: 73,
  },
  13: {
    level: 13,
    maxSpellLevel: 7,
    spellPoints: 83,
  },
  14: {
    level: 14,
    maxSpellLevel: 7,
    spellPoints: 83,
  },
  15: {
    level: 15,
    maxSpellLevel: 8,
    spellPoints: 94,
  },
  16: {
    level: 16,
    maxSpellLevel: 8,
    spellPoints: 94,
  },
  17: {
    level: 17,
    maxSpellLevel: 9,
    spellPoints: 107,
  },
  18: {
    level: 18,
    maxSpellLevel: 9,
    spellPoints: 114,
  },
  19: {
    level: 19,
    maxSpellLevel: 9,
    spellPoints: 123,
  },
  20: {
    level: 20,
    maxSpellLevel: 9,
    spellPoints: 133,
  },
};

export default SpellPoints;
