const Database = require('better-sqlite3');
const db = new Database('./data/warmth_wall.db');

db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('current_event', '인사')").run();
db.prepare("DELETE FROM config WHERE key = 'currentEvent'").run();
console.log("현재 이벤트를 '인사'로 진짜 변경 완료했습니다.");

db.close();
