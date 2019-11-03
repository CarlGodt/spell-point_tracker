export interface $SpellCost {
  readonly spellLevel: number;
  readonly pointCost: number;
  readonly maxCast: (level?: number) => number;
}

export interface $SpellCostIndex {
  readonly [key: number]: $SpellCost;
}

const SPELL_COST: $SpellCostIndex = {
  1: {
    spellLevel: 1,
    pointCost: 2,
    maxCast: () => 0
  },
  2: {
    spellLevel: 2,
    pointCost: 3,
    maxCast: () => 0
  },
  3: {
    spellLevel: 3,
    pointCost: 5,
    maxCast: () => 0
  },
  4: {
    spellLevel: 4,
    pointCost: 6,
    maxCast: () => 0
  },
  5: {
    spellLevel: 5,
    pointCost: 7,
    maxCast: () => 0
  },
  6: {
    spellLevel: 6,
    pointCost: 9,
    maxCast: (level?: number) => {
      if (!level) return 1;
      switch(level) {
        case 19:
        case 20:
          return 2;
        default:
          return 1;
      }
    }
  },
  7: {
    spellLevel: 7,
    pointCost: 10,
    maxCast: (level?: number) => {
      if (!level) return 1;
      switch(level) {
        case 20:
          return 2;
        default:
          return 1;
      }
    }
  },
  8: {
    spellLevel: 8,
    pointCost: 11,
    maxCast: () => 1
  },
  9: {
    spellLevel: 9,
    pointCost: 13,
    maxCast: () => 1
  },
}

export default SPELL_COST;