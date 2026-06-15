import { useState } from 'react';
import { Users, BarChart2, Trophy, CreditCard, CheckSquare, Calendar, Settings, Shield, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUsers, saveUsers, TIER_CONFIG } from '../libs/auth.js';
import { useToastCtx } from '../contexts/ToastContext.jsx';
import { useLocation } from 'wouter';

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'payouts', label: 'Payouts', icon: CreditCard },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'vip', label: 'VIP', icon: Star },
];

const OVERVIEW_STATS = [
  { label: 'Total Users', val: '1,247,830', color: 'var(--purpleL)' },
  { label: 'Revenue (MTD)', val: '$82,400', color: 'var(--green)' },
  { label: 'Active Events', val: '6', color: 'var(--yellow)' },
  { label: 'Pending Payouts', val: '14', color: 'var(--red)' },
];

export default function Admin() {
  const { user } = useAuth();
  const { showToast } = useToastCtx();
  const [_, setLocation] = useLocation();
  const [tab, setTab] = useState('overview');
  const [userSearch, setUserSearch] = useState('');

  if (!user || user.username !== 'admin') {
    return (
      <div style={{ padding: '80px 56px', textAlign: 'center' }}>
        <Shield size={56} style={{ color: 'var(--red)', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>Access Denied</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '24px' }}>This panel is restricted to administrators only.</p>
        <button onClick={() => setLocation('/')} style={{ background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}>Go Home</button>
      </div>
    );
  }

  const allUsers = Object.values(getUsers()).filter(u => u.username !== 'admin');
  const filteredUsers = allUsers.filter(u =>
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleBan = (username) => {
    const users = getUsers();
    if (users[username]) {
      users[username].banned = !users[username].banned;
      saveUsers(users);
      showToast(`${users[username].banned ? 'Banned' : 'Unbanned'} ${username}`, users[username].banned ? 'err' : 'ok');
    }
  };

  const handleFlag = (username) => {
    const users = getUsers();
    if (users[username]) {
      users[username].flagged = !users[username].flagged;
      saveUsers(users);
      showToast(`${users[username].flagged ? 'Flagged' : 'Unflagged'} ${username}`, 'info');
    }
  };

  return (
    <div style={{ padding: '40px 56px 72px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '12px' }}>
          <Shield size={11} /> Admin Panel
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)', marginBottom: '4px' }}>Platform Management</h1>
        <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Welcome back, admin. Platform status is nominal.</p>
      </div>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: '4px', background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '5px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            data-testid={`admin-tab-${id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
              background: tab === id ? 'var(--purple)' : 'transparent',
              color: tab === id ? '#fff' : 'var(--text3)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
            }}
          ><Icon size={14} />{label}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '28px' }}>
            {OVERVIEW_STATS.map(s => (
              <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '10px' }}>{s.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Platform Health</h3>
            {[
              { name: 'API Server', status: 'Operational', color: 'var(--green)' },
              { name: 'Payment Processing', status: 'Operational', color: 'var(--green)' },
              { name: 'Spin Engine', status: 'Operational', color: 'var(--green)' },
              { name: 'Task System', status: 'Operational', color: 'var(--green)' },
            ].map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid rgba(37,37,69,0.4)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                <span style={{ flex: 1, fontSize: '14px', color: 'var(--text)' }}>{s.name}</span>
                <span style={{ fontSize: '12px', color: s.color, fontWeight: 600 }}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users */}
      {tab === 'users' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <input
              type="text" placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)}
              data-testid="input-admin-search"
              style={{
                background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px',
                padding: '10px 14px', color: 'var(--text)', fontSize: '13px',
                fontFamily: 'var(--font)', outline: 'none', minWidth: '260px',
              }}
            />
            <span style={{ fontSize: '13px', color: 'var(--text3)' }}>{filteredUsers.length} users</span>
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 120px', padding: '12px 20px', borderBottom: '1px solid var(--border)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>
              <span>User</span><span style={{ textAlign: 'right' }}>Points</span><span style={{ textAlign: 'right' }}>Tier</span><span style={{ textAlign: 'right' }}>Orders</span><span style={{ textAlign: 'right' }}>Actions</span>
            </div>
            {filteredUsers.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text3)' }}>No users found</div>
            ) : filteredUsers.map(u => {
              const tierColor = TIER_CONFIG[u.tier]?.color || '#cd7f32';
              return (
                <div key={u.username} data-testid={`admin-row-${u.username}`} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 120px', padding: '14px 20px', borderBottom: '1px solid rgba(37,37,69,0.4)', background: u.banned ? 'rgba(239,68,68,0.04)' : u.flagged ? 'rgba(245,158,11,0.03)' : 'transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(u.username)}`} style={{ width: '30px', height: '30px', borderRadius: '7px', opacity: u.banned ? 0.4 : 1 }} alt={u.username} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: u.banned ? 'var(--red)' : 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {u.username}
                        {u.banned && <span style={{ fontSize: '9px', background: 'rgba(239,68,68,0.15)', color: 'var(--red)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>BANNED</span>}
                        {u.flagged && <span style={{ fontSize: '9px', background: 'rgba(245,158,11,0.15)', color: 'var(--yellow)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>FLAGGED</span>}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{u.email || 'no email'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{u.points.toLocaleString()}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <span style={{ background: `rgba(${tierColor === '#cd7f32' ? '205,127,50' : tierColor === '#94a3b8' ? '148,163,184' : tierColor === '#f87171' ? '248,113,113' : '167,139,250'},0.15)`, color: tierColor, fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>{u.tier}</span>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '13px', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{u.orders}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                    <button onClick={() => handleFlag(u.username)}
                      style={{ background: u.flagged ? 'rgba(245,158,11,0.15)' : 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '5px 8px', fontSize: '10px', fontWeight: 700, color: u.flagged ? 'var(--yellow)' : 'var(--text3)', cursor: 'pointer', fontFamily: 'var(--font)' }}
                    >{u.flagged ? 'Unflag' : 'Flag'}</button>
                    <button onClick={() => handleBan(u.username)}
                      data-testid={`btn-ban-${u.username}`}
                      style={{ background: u.banned ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${u.banned ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`, borderRadius: '6px', padding: '5px 8px', fontSize: '10px', fontWeight: 700, color: u.banned ? 'var(--green)' : 'var(--red)', cursor: 'pointer', fontFamily: 'var(--font)' }}
                    >{u.banned ? 'Unban' : 'Ban'}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard tab */}
      {tab === 'leaderboard' && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Top Performers</h3>
          {Object.values(getUsers()).filter(u => u.username !== 'admin').sort((a, b) => b.taskPoints - a.taskPoints).slice(0, 10).map((u, i) => (
            <div key={u.username} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(37,37,69,0.4)' }}>
              <span style={{ width: '28px', fontWeight: 800, fontSize: '14px', color: i < 3 ? 'var(--yellow)' : 'var(--text3)' }}>#{i + 1}</span>
              <img src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(u.username)}`} style={{ width: '32px', height: '32px', borderRadius: '8px' }} alt={u.username} />
              <span style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{u.username}</span>
              <span style={{ fontSize: '13px', color: 'var(--yellow)', fontWeight: 700 }}>{u.taskPoints.toLocaleString()} pts</span>
            </div>
          ))}
        </div>
      )}

      {/* Other tabs placeholder */}
      {['payouts', 'tasks', 'events', 'vip'].includes(tab) && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '60px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', textTransform: 'capitalize' }}>{tab} Management</h3>
          <p style={{ color: 'var(--text3)', fontSize: '14px' }}>This section is under development. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
