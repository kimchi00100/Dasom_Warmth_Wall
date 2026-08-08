const Database = require('better-sqlite3');
const crypto = require('crypto');
const db = new Database('./data/warmth_wall.db');

const categories = ['도움', '배려', '인사', '나눔', '환경', '기타'];
const colors = ['#FFE234', '#FFB6C1', '#98FB98', '#87CEFA', '#FFE4B5', '#E6E6FA', '#FFDAB9', '#AFEEEE', '#F0E68C', '#FFA07A', '#DDA0DD', '#FFFACD'];

const subjects = ['할머니', '할아버지', '어린이', '경비 아저씨', '이웃 주민', '택배 기사님', '동료', '친구', '모르는 분', '환경 미화원', '외국인', '길냥이'];
const actions = [
  '께 자리를 양보했습니다.',
  '를 도와 무거운 짐을 들어드렸습니다.',
  '께 먼저 웃으며 인사했습니다.',
  '에게 따뜻한 캔커피를 하나 드렸습니다.',
  '가 떨어뜨린 지갑을 주워 찾아주었습니다.',
  '를 위해 문을 잡아드렸습니다.',
  '에게 작은 간식을 나눠주었습니다.',
  '에게 길을 친절하게 안내해주었습니다.',
  '를 위해 버려진 쓰레기를 주웠습니다.',
  '가 편하게 지나갈 수 있도록 길을 비켜주었습니다.',
  '에게 우산을 씌워주었습니다.',
  '를 보고 칭찬의 말을 건넸습니다.'
];
const feelings = [
  '정말 뿌듯한 하루네요.',
  '작은 일이지만 기분이 좋습니다.',
  '마음이 따뜻해지는 순간이었습니다.',
  '다들 행복했으면 좋겠어요.',
  '내일도 좋은 일을 해야겠습니다.',
  '소소한 행복을 느꼈습니다.',
  '누군가에게 도움이 되어 기쁩니다.',
  '웃음을 보니 저도 행복해졌어요.'
];

function generateContent() {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const feeling = feelings[Math.floor(Math.random() * feelings.length)];
  return `오늘 길에서 마주친 ${subject}${action} ${feeling}`;
}

function generateNickname() {
  const adjs = ['따뜻한', '행복한', '친절한', '웃는', '다정한', '상냥한', '배려하는', '나누는', '밝은', '착한'];
  const nouns = ['사과', '바다', '하늘', '별', '바람', '나무', '햇살', '구름', '새', '꽃', '토끼', '강아지'];
  return `@${adjs[Math.floor(Math.random() * adjs.length)]}_${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 99)}`;
}

db.prepare('INSERT OR IGNORE INTO users (id, email, password_hash) VALUES (?, ?, ?)').run('today_mock_user2', 'today_mock2@test.com', 'dummy_hash');

const insertStmt = db.prepare(`
  INSERT INTO posts (id, content, nickname, user_id, is_mock, created_at, color, category)
  VALUES (?, ?, ?, ?, 1, ?, ?, ?)
`);

let inserted = 0;
// We already inserted 12, so we need 38 more to reach 50. Let's just insert 40.
for (let i = 0; i < 40; i++) {
  const id = crypto.randomUUID();
  const content = generateContent();
  const nickname = generateNickname();
  const color = colors[Math.floor(Math.random() * colors.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  const hour = String(Math.floor(Math.random() * 12) + 8).padStart(2, '0'); // 08:00 to 19:00
  const min = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const sec = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const createdAt = `2026-08-08 ${hour}:${min}:${sec}`;
  
  insertStmt.run(id, content, nickname, 'today_mock_user2', createdAt, color, category);
  inserted++;
}

console.log(`Inserted ${inserted} additional mock posts for Aug 8th.`);
db.close();
