import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUsers, TIER_CONFIG } from '../libs/auth.js';

const STATIC_PLAYERS = [
  { username: 'CryptoKing99', tasksCompleted: 47, taskPoints: 1820, xp: 12400, tier: 'Ruby' },
  { username: 'BloxMaster99', tasksCompleted: 12, taskPoints: 420, xp: 3200, tier: 'Silver' },
  { username: 'xXProGamerXx', tasksCompleted: 38, taskPoints: 1450, xp: 9800, tier: 'Ruby' },
  { username: 'NightWolf88', tasksCompleted: 29, taskPoints: 1120, xp: 7200, tier: 'Ruby' },
  { username: 'SkyRocket22', tasksCompleted: 52, taskPoints: 2100, xp: 15800, tier: 'Violet' },
  { username: 'JadeWarrior', tasksCompleted: 18, taskPoints: 680, xp: 4500, tier: 'Silver' },
  { username: 'StarterPack', tasksCompleted: 8, taskPoints: 280, xp: 900, tier: 'Bronze' },
  { username: 'SpeedDemon', tasksCompleted: 31, taskPoints: 1240, xp: 8100, tier: 'Ruby' },
  { username: 'RobuxHunter', tasksCompleted: 24, taskPoints: 960, xp: 5900, tier: 'Silver' },
  { username: 'EventKing', tasksCompleted: 61, taskPoints: 2450, xp: 20000, tier: 'Violet' },
];

export default function Leaderboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('all');

  const allUsers = (() => {
    const stored = getUsers();
    const custom = Object.values(stored).filter(u => u.username !== 'admin').map(u => ({
      username: u.username,
      tasksCompleted: u.tasksCompleted,
      taskPoints: u.taskPoints,
      xp: u.xp,
      tier: u.tier,
    }));
    const customNames = new Set(custom.map(u => u.username));
    const merged = [...custom, ...STATIC_PLAYERS.filter(p => !customNames.has(p.username))];
    return merged.sort((a, b) => b.taskPoints - a.taskPoints);
  })();

  const podium = allUsers.slice(0, 3);
  const rest = allUsers.slice(3);

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1.2px', marginBottom: '6px', color: 'var(--text)' }}>Leaderboard</h1>
        <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Top earners ranked by task points</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px', marginBottom: '32px', width: 'fit-content' }}>
        {[['daily','Daily'], ['weekly','Weekly'], ['all','All Time']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            data-testid={`tab-lb-${id}`}
            style={{
              padding: '7px 24px', borderRadius: '7px', fontSize: '13px', fontWeight: 600,
              background: tab === id ? 'var(--purple)' : 'transparent',
              color: tab === id ? '#fff' : 'var(--text3)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
            }}
          >{label}</button>
        ))}
      </div>

      {/* Podium */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {/* 2nd */}
        {podium[1] && <PodiumCard player={podium[1]} rank={2} height={160} currentUser={user?.username} />}
        {/* 1st */}
        {podium[0] && <PodiumCard player={podium[0]} rank={1} height={200} currentUser={user?.username} />}
        {/* 3rd */}
        {podium[2] && <PodiumCard player={podium[2]} rank={3} height={130} currentUser={user?.username} />}
      </div>

      {/* Table */}
      <div className="lb-table-wrap" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '560px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 120px 120px', padding: '12px 20px', borderBottom: '1px solid var(--border)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>
              <span>Rank</span><span>Player</span><span style={{ textAlign: 'right' }}>Tasks</span><span style={{ textAlign: 'right' }}>Task Pts</span><span style={{ textAlign: 'right' }}>Tier</span>
            </div>
            {rest.map((p, i) => {
              const rank = i + 4;
              const tierColor = TIER_CONFIG[p.tier]?.color || '#cd7f32';
              const isMe = p.username === user?.username;
              return (
                <div key={p.username}
                  data-testid={`row-player-${p.username}`}
                  style={{
                    display: 'grid', gridTemplateColumns: '50px 1fr 120px 120px 120px',
                    padding: '14px 20px', borderBottom: '1px solid rgba(37,37,69,0.4)',
                    background: isMe ? 'rgba(124,58,237,0.06)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (!isMe) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { if (!isMe) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text3)', display: 'flex', alignItems: 'center' }}>#{rank}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(p.username)}`}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', border: isMe ? `2px solid ${tierColor}` : 'none' }}
                      alt={p.username}
                    />
                    <span style={{ fontWeight: 700, color: isMe ? 'var(--purpleL)' : 'var(--text)', fontSize: '14px' }}>{p.username}{isMe && ' (You)'}</span>
                  </div>
                  <span style={{ textAlign: 'right', color: 'var(--text2)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{p.tasksCompleted}</span>
                  <span style={{ textAlign: 'right', color: 'var(--yellow)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{p.taskPoints.toLocaleString()}</span>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <span style={{ background: `rgba(${tierColor === '#cd7f32' ? '205,127,50' : tierColor === '#94a3b8' ? '148,163,184' : tierColor === '#f87171' ? '248,113,113' : '167,139,250'},0.15)`, color: tierColor, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>{p.tier}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ player, rank, height, currentUser }) {
  const tierColor = TIER_CONFIG[player.tier]?.color || '#cd7f32';
  const isMe = player.username === currentUser;
  const medals = ['🥇', '🥈', '🥉'];
  const podiumColors = ['var(--yellow)', '#94a3b8', '#cd7f32'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '160px' }}>
      <img
        src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(player.username)}`}
        style={{ width: '56px', height: '56px', borderRadius: '14px', border: `3px solid ${isMe ? 'var(--purpleL)' : podiumColors[rank-1]}`, marginBottom: '8px' }}
        alt={player.username}
      />
      <div style={{ fontSize: '14px', fontWeight: 800, color: isMe ? 'var(--purpleL)' : 'var(--text)', marginBottom: '2px', textAlign: 'center' }}>
        {player.username}{isMe && ' (You)'}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--yellow)', marginBottom: '8px' }}>
        {player.taskPoints.toLocaleString()} pts
      </div>
      <div style={{
        width: '100%', height: `${height}px`,
        background: rank === 1 ? 'linear-gradient(180deg,rgba(245,158,11,0.2),rgba(245,158,11,0.05))' : rank === 2 ? 'linear-gradient(180deg,rgba(148,163,184,0.15),rgba(148,163,184,0.03))' : 'linear-gradient(180deg,rgba(205,127,50,0.15),rgba(205,127,50,0.03))',
        border: `1px solid ${podiumColors[rank-1]}44`,
        borderRadius: '12px 12px 0 0',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10px',
        fontSize: '24px',
      }}>
        {medals[rank-1]}
      </div>
    </div>
  );
}
