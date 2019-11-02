export interface $SpellCost {
  readonly spellLevel: number;
  readonly pointCost: number;
}

export interface $SpellCostIndex {
  readonly [key: number]: $SpellCost;
}

const SPELL_COST: $SpellCostIndex = {
  1: {
    spellLevel: 1,
    pointCost: 2
  },
  2: {
    spellLevel: 2,
    pointCost: 3
  },
  3: {
    spellLevel: 3,
    pointCost: 5
  },
  4: {
    spellLevel: 4,
    pointCost: 6
  },
  5: {
    spellLevel: 5,
    pointCost: 7
  },
  6: {
    spellLevel: 6,
    pointCost: 9
  },
  7: {
    spellLevel: 7,
    pointCost: 10
  },
  8: {
    spellLevel: 8,
    pointCost: 11
  },
  9: {
    spellLevel: 9,
    pointCost: 13
  },
}

export default SPELL_COST;