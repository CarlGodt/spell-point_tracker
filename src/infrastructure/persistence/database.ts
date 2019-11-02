import Dexie from 'dexie';
import Character from '../../domain/character/Character';

const DB_VERSION = 3;
const DB_NAME = "spellpoint_tracker";

export class SpellPointDb extends Dexie {
  character: Dexie.Table<Character, number>;

  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION).stores({
      character: '++id, &name'
    })
    this.character = this.table('character');
    this.character.mapToClass(Character);
  }
}

const db = new SpellPointDb();

export default db;
