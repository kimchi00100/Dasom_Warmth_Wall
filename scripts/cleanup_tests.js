const Database = require('better-sqlite3');
const db = new Database('./data/warmth_wall.db');

// Delete manual test posts on Aug 8th
const stmt = db.prepare(`DELETE FROM posts WHERE created_at LIKE '2026-08-08%' AND (content = 'test' OR content = '123123' OR content = '111' OR content = '123' OR content LIKE 'test%')`);
const info = stmt.run();
console.log('Deleted test posts:', info.changes);

// Delete campaign actions on Aug 8th
const stmt2 = db.prepare(`DELETE FROM campaign_actions WHERE created_at LIKE '2026-08-08%'`);
const info2 = stmt2.run();
console.log('Deleted campaign actions:', info2.changes);

db.close();
