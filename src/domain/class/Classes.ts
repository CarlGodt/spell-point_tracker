import SpellPoints, { $SpellPointIndex } from "../spell/SpellPoints";
import PactPoints from "../spell/PactPoints";

export type $ClassName = 'BARD' | 'CLERIC' | 'DRUID' | 'SORCERER' | 'WIZARD' | 'PALADIN' | 'RANGER' | 'RANGER' | 'FIGHTER' | 'ROGUE' | 'WARLOCK';
export const CLASS_NAMES: Array<$ClassName> = [
  'BARD',
  'CLERIC',
  'DRUID',
  'SORCERER',
  'WIZARD',
  'PALADIN',
  'RANGER',
  'RANGER',
  'FIGHTER',
  'ROGUE',
  'WARLOCK'
];

type $SlotReset = 'LONG_REST' | 'SHORT_REST';

export interface $Class {
  readonly name: string;
  readonly spellPoints: $SpellPointIndex;
  readonly reset: $SlotReset;
};

interface $ClassIndex {
  readonly [key: string]: $Class
}

const CLASSES: $ClassIndex = {
  BARD: {
    name: 'Bard',
    spellPoints: SpellPoints,
    reset: 'LONG_REST'
  },
  CLERIC: {
    name: 'Cleric',
    spellPoints: SpellPoints,
    reset: 'LONG_REST'
  },
  DRUID: {
    name: 'Druid',
    spellPoints: SpellPoints,
    reset: 'LONG_REST'
  },
  SORCERER: {
    name: 'Sorcerer',
    spellPoints: SpellPoints,
    reset: 'LONG_REST'
  },
  WIZARD: {
    name: 'Wizard',
    spellPoints: SpellPoints,
    reset: 'LONG_REST'
  },
  PALADIN: {
    name: 'Paladin',
    spellPoints: createSpellpoints(2),
    reset: 'LONG_REST'
  },
  RANGER: {
    name: 'Ranger',
    spellPoints: createSpellpoints(2),
    reset: 'LONG_REST'
  },
  FIGHTER: {
    name: 'Fighter',
    spellPoints: createSpellpoints(3),
    reset: 'LONG_REST'
  },
  ROGUE: {
    name: 'Rogue',
    spellPoints: createSpellpoints(3),
    reset: 'LONG_REST'
  },
  WARLOCK: {
    name: 'Warlock',
    spellPoints: PactPoints,
    reset: 'SHORT_REST'
  },
}

export default CLASSES;

function createSpellpoints(divider: number): $SpellPointIndex {
  let table = {};
  for (let i = 1; i <= 20; i++) {
    const index = Math.ceil(i / divider);
    table = {
      [i]: SpellPoints[index],
      ...table
    }
  }
  return table;
}