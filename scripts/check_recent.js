const Database = require('better-sqlite3');
const db = new Database('./data/warmth_wall.db');

const recent = db.prepare(`SELECT * FROM posts ORDER BY created_at DESC LIMIT 10`).all();
console.log(recent);
