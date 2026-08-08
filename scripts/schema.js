const Database = require('better-sqlite3');
const db = new Database('./data/warmth_wall.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
for (let t of tables) {
  const schema = db.prepare(`SELECT sql FROM sqlite_master WHERE name='${t.name}'`).get();
  console.log(schema.sql);
}
db.close();
