const Database = require('better-sqlite3');
const crypto = require('crypto');
const db = new Database('./data/warmth_wall.db');

// Delete existing posts on Aug 8th
db.prepare(`DELETE FROM posts WHERE created_at LIKE '2026-08-08%'`).run();
console.log('Cleared existing posts on Aug 8th.');

// Mock posts to insert
const mockPosts = [
  { category: '인사', content: '오늘 아침 엘리베이터에서 이웃 주민께 밝게 먼저 인사드렸습니다. 하루의 시작이 상쾌하네요!', color: '#FFE234', nickname: '@smile_day' },
  { category: '배려', content: '지하철에서 무거운 짐을 드신 할머니께 자리를 양보해 드렸어요.', color: '#FFB6C1', nickname: '@kind_heart' },
  { category: '환경', content: '출근길에 길가에 버려진 캔을 주워서 분리수거함에 넣었습니다. 작은 실천!', color: '#98FB98', nickname: '@eco_warrior' },
  { category: '나눔', content: '점심시간에 팀원들에게 제가 직접 내린 커피를 나눠마셨어요. 다들 좋아해서 뿌듯합니다.', color: '#87CEFA', nickname: '@coffee_lover' },
  { category: '도움', content: '길을 헤매시는 외국인 분께 지하철역까지 가는 길을 영어로 안내해 드렸습니다.', color: '#FFE4B5', nickname: '@helper_h' },
  { category: '배려', content: '비오는 날, 우산이 없어서 뛰어가시던 분께 제 여분 우산을 빌려드렸습니다.', color: '#E6E6FA', nickname: '@rainy_angel' },
  { category: '인사', content: '식당에서 밥 먹고 나올 때 이모님께 "잘 먹었습니다!" 하고 큰 소리로 인사했어요.', color: '#FFDAB9', nickname: '@good_vibes' },
  { category: '환경', content: '오늘부터 카페에서 일회용 컵 대신 개인 텀블러를 사용하기 시작했습니다.', color: '#AFEEEE', nickname: '@green_earth' },
  { category: '도움', content: '무거운 택배 상자를 들고 가시는 택배 기사님을 위해 공동현관 문을 열고 기다려 드렸습니다.', color: '#F0E68C', nickname: '@thank_you' },
  { category: '나눔', content: '직접 구운 쿠키를 경비실 아저씨께 간식으로 드리고 왔어요. 항상 감사합니다!', color: '#FFA07A', nickname: '@baker_kim' },
  { category: '배려', content: '공용 화장실 세면대에 물기가 많길래 휴지로 깔끔하게 닦아놓고 나왔습니다.', color: '#DDA0DD', nickname: '@clean_fairy' },
  { category: '인사', content: '동네 산책 중에 마주친 꼬마 아이와 눈웃음으로 인사를 나눴어요. 너무 귀여워요.', color: '#FFFACD', nickname: '@happy_walker' }
];

const insertStmt = db.prepare(`
  INSERT INTO posts (id, content, nickname, user_id, is_mock, created_at, color, category)
  VALUES (?, ?, ?, ?, 1, ?, ?, ?)
`);

// Insert a default mock user for today
db.prepare('INSERT OR IGNORE INTO users (id, email, password_hash) VALUES (?, ?, ?)').run('today_mock_user', 'today_mock@test.com', 'dummy_hash');

let inserted = 0;
// Spread them out over the day on Aug 8th
for (let i = 0; i < mockPosts.length; i++) {
  const p = mockPosts[i];
  const id = crypto.randomUUID();
  const hour = String(Math.floor(Math.random() * 12) + 8).padStart(2, '0'); // 08:00 to 19:00
  const min = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const sec = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const createdAt = `2026-08-08 ${hour}:${min}:${sec}`;
  
  insertStmt.run(id, p.content, p.nickname, 'today_mock_user', createdAt, p.color, p.category);
  inserted++;
}

console.log(`Inserted ${inserted} mock posts for Aug 8th.`);
db.close();
