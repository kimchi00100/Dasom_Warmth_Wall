const Database = require('better-sqlite3');
const db = new Database('./data/warmth_wall.db');

const todayPosts = db.prepare(`SELECT * FROM posts WHERE created_at LIKE '2026-08-08%' ORDER BY created_at DESC`).all();
console.log(`Found ${todayPosts.length} posts on Aug 8th`);
for (let p of todayPosts) {
  console.log(`[${p.id}] [${p.category}] ${p.content.substring(0, 30)} - ${p.nickname} (is_mock: ${p.is_mock})`);
}
db.close();
