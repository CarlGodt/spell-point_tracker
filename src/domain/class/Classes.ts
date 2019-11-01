import SpellPoints, { $SpellPointIndex, $SpellPoints } from "../spell/SpellPoints";
import PactPoints from "../spell/PactPoints";

export type $ClassName = 'BARD' | 'CLERIC' | 'DRUID' | 'SORCERER' | 'WIZARD' | 'PALADIN' | 'RANGER' | 'RANGER' | 'FIGHTER' | 'ROGUE' | 'WARLOCK';
export interface $Class {
  readonly name: string;
  readonly spellPoints: $SpellPointIndex;
};

interface $ClassIndex {
  readonly [key: string]: $Class
}

const Classes: $ClassIndex = {
  BARD: {
    name: 'Bard',
    spellPoints: SpellPoints
  },
  CLERIC: {
    name: 'Cleric',
    spellPoints: SpellPoints
  },
  DRUID: {
    name: 'Druid',
    spellPoints: SpellPoints
  },
  SORCERER: {
    name: 'Sorcerer',
    spellPoints: SpellPoints
  },
  WIZARD: {
    name: 'Wizard',
    spellPoints: SpellPoints
  },
  PALADIN: {
    name: 'Paladin',
    spellPoints: createSpellpoints(2)
  },
  RANGER: {
    name: 'Ranger',
    spellPoints: createSpellpoints(2)
  },
  FIGHTER: {
    name: 'Fighter',
    spellPoints: createSpellpoints(3)
  },
  ROGUE: {
    name: 'Rogue',
    spellPoints: createSpellpoints(3)
  },
  WARLOCK: {
    name: 'Warlock',
    spellPoints: PactPoints
  },
}

export default Classes;

function createSpellpoints(divider: number): $SpellPointIndex {
  let table = {};
  for (let i = 1; i <= 20; i++) {
    const index = Math.floor(i / divider);
    table = {
      i: SpellPoints[index],
      ...table
    }
  }
  return table;
}