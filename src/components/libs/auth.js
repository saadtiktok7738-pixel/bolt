export const XP_LEVELS = [
  { level: 1, xpReq: 0, tier: 'Bronze' },
  { level: 2, xpReq: 300, tier: 'Bronze' },
  { level: 3, xpReq: 750, tier: 'Bronze' },
  { level: 4, xpReq: 1500, tier: 'Silver' },
  { level: 5, xpReq: 2500, tier: 'Silver' },
  { level: 6, xpReq: 4000, tier: 'Silver' },
  { level: 7, xpReq: 6000, tier: 'Ruby' },
  { level: 8, xpReq: 8500, tier: 'Ruby' },
  { level: 9, xpReq: 11500, tier: 'Ruby' },
  { level: 10, xpReq: 15000, tier: 'Violet' },
  { level: 11, xpReq: 19500, tier: 'Violet' },
  { level: 12, xpReq: 25000, tier: 'Violet' },
];

export const TIER_CONFIG = {
  Bronze: { color: '#cd7f32', mult: 1.0 },
  Silver: { color: '#94a3b8', mult: 1.25 },
  Ruby: { color: '#f87171', mult: 1.5 },
  Violet: { color: '#a78bfa', mult: 2.0 },
};

export function hashPassword(pw) {
  return [...pw].reduce((s, c) => s + c.charCodeAt(0), 0);
}

export function getLevelInfo(xp) {
  let current = XP_LEVELS[0];
  let next = XP_LEVELS[1];
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (xp >= XP_LEVELS[i].xpReq) {
      current = XP_LEVELS[i];
    } else {
      next = XP_LEVELS[i];
      break;
    }
  }
  if (current === XP_LEVELS[XP_LEVELS.length - 1]) next = null;
  const pct = next
    ? Math.min(100, ((xp - current.xpReq) / (next.xpReq - current.xpReq)) * 100)
    : 100;
  return { current, next, pct };
}

export const DEFAULT_USER = {
  username: 'BloxMaster99',
  password: hashPassword('password123'),
  email: 'bloxmaster@email.com',
  points: 1250,
  totalPoints: 5820,
  xp: 3200,
  tier: 'Silver',
  streak: 7,
  orders: 3,
  tasksCompleted: 12,
  taskPoints: 420,
  joinDate: 'Jan 15, 2026',
  lastSpin: 0,
  weeklyPoints: 340,
  dailyPoints: 120,
};

export const ADMIN_USER = {
  username: 'admin',
  password: hashPassword('200708'),
  points: 9999,
  totalPoints: 99999,
  xp: 25000,
  tier: 'Violet',
  streak: 0,
  orders: 0,
  tasksCompleted: 0,
  taskPoints: 0,
  joinDate: 'Jan 1, 2026',
  lastSpin: 0,
  weeklyPoints: 0,
  dailyPoints: 0,
};

export function getUsers() {
  try {
    const data = localStorage.getItem('bbUsers');
    if (data) return JSON.parse(data);
  } catch {}
  const defaults = {
    [DEFAULT_USER.username]: DEFAULT_USER,
    [ADMIN_USER.username]: ADMIN_USER,
  };
  saveUsers(defaults);
  return defaults;
}

export function saveUsers(users) {
  localStorage.setItem('bbUsers', JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    const data = sessionStorage.getItem('bbCurrentUser');
    if (data) return JSON.parse(data);
  } catch {}
  return null;
}

export function saveCurrentUser(user) {
  if (user) {
    sessionStorage.setItem('bbCurrentUser', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('bbCurrentUser');
  }
}
