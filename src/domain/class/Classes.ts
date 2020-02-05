import SpellPoints, { $SpellPointIndex } from '../spell/SpellPoints';
import PactPoints from '../spell/PactPoints';

export enum $ClassName {
  BARD = 'BARD',
  CLERIC = 'CLERIC',
  DRUID = 'DRUID',
  SORCERER = 'SORCERER',
  WIZARD = 'WIZARD',
  PALADIN = 'PALADIN',
  RANGER = 'RANGER',
  FIGHTER = 'FIGHTER',
  ROGUE = 'ROGUE',
  WARLOCK = 'WARLOCK',
}

type $SlotReset = 'LONG_REST' | 'SHORT_REST';

export interface $Class {
  readonly class: $ClassName;
  readonly name: string;
  readonly spellPoints: $SpellPointIndex;
  readonly reset: $SlotReset;
  readonly mc_divider: number;
}

interface $ClassIndex {
  readonly [key: string]: $Class;
}

const CLASSES: $ClassIndex = {
  BARD: {
    class: $ClassName.BARD,
    name: 'Bard',
    spellPoints: SpellPoints,
    reset: 'LONG_REST',
    mc_divider: 1,
  },
  CLERIC: {
    class: $ClassName.CLERIC,
    name: 'Cleric',
    spellPoints: SpellPoints,
    reset: 'LONG_REST',
    mc_divider: 1,
  },
  DRUID: {
    class: $ClassName.DRUID,
    name: 'Druid',
    spellPoints: SpellPoints,
    reset: 'LONG_REST',
    mc_divider: 1,
  },
  SORCERER: {
    class: $ClassName.SORCERER,
    name: 'Sorcerer',
    spellPoints: SpellPoints,
    reset: 'LONG_REST',
    mc_divider: 1,
  },
  WIZARD: {
    class: $ClassName.WIZARD,
    name: 'Wizard',
    spellPoints: SpellPoints,
    reset: 'LONG_REST',
    mc_divider: 1,
  },
  PALADIN: {
    class: $ClassName.PALADIN,
    name: 'Paladin',
    spellPoints: createSpellpoints(2),
    reset: 'LONG_REST',
    mc_divider: 2,
  },
  RANGER: {
    class: $ClassName.RANGER,
    name: 'Ranger',
    spellPoints: createSpellpoints(2),
    reset: 'LONG_REST',
    mc_divider: 2,
  },
  FIGHTER: {
    class: $ClassName.FIGHTER,
    name: 'Fighter',
    spellPoints: createSpellpoints(3),
    reset: 'LONG_REST',
    mc_divider: 3,
  },
  ROGUE: {
    class: $ClassName.ROGUE,
    name: 'Rogue',
    spellPoints: createSpellpoints(3),
    reset: 'LONG_REST',
    mc_divider: 3,
  },
  WARLOCK: {
    class: $ClassName.WARLOCK,
    name: 'Warlock',
    spellPoints: PactPoints,
    reset: 'SHORT_REST',
    mc_divider: 0,
  },
};

export default CLASSES;

function createSpellpoints(divider: number): $SpellPointIndex {
  let table = {};
  for (let i = 1; i <= 20; i++) {
    const index = Math.ceil(i / divider);
    table = {
      [i]: SpellPoints[index],
      ...table,
    };
  }
  return table;
}
