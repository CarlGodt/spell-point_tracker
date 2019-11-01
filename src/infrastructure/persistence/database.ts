import Dexie from 'dexie';

const DB_VERSION = 2;
const DB_NAME = "spellpoint_tracker";

const db = new Dexie(DB_NAME);
db.version(DB_VERSION).stores({
  character: '++id, name'
});

export default db;
