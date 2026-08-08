const Database = require('better-sqlite3');
const db = new Database('./data/warmth_wall.db');
const row = db.prepare("SELECT * FROM config WHERE key = 'currentEvent'").get();
console.log('DB currentEvent:', row);
