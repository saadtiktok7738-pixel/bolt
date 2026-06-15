import { TrendingUp, ShoppingCart, Trophy, Zap, CheckSquare, Star, Gift } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { getLevelInfo, TIER_CONFIG } from '../libs/auth.js';

const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';
const ROBUX_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Frobux.svg&w=48&q=75';

const CHART_DATA = [
  { day: 'Mon', pts: 120 }, { day: 'Tue', pts: 80 }, { day: 'Wed', pts: 210 },
  { day: 'Thu', pts: 60 }, { day: 'Fri', pts: 340 }, { day: 'Sat', pts: 180 }, { day: 'Sun', pts: 250 },
];
const MAX_CHART = Math.max(...CHART_DATA.map(d => d.pts));

const RECENT_ORDERS = [
  { id: '#BB-10041', pkg: '1,700 Robux', amount: '$17.99', status: 'Delivered', time: 'Jan 22, 2026' },
  { id: '#BB-10038', pkg: '800 Robux', amount: '$8.99', status: 'Delivered', time: 'Jan 18, 2026' },
  { id: '#BB-10031', pkg: '4,500 Robux', amount: '$44.99', status: 'Delivered', time: 'Jan 15, 2026' },
];

const ACHIEVEMENTS = [
  { icon: Trophy, color: 'var(--yellow)', label: 'First Purchase', earned: true },
  { icon: Zap, color: 'var(--purpleL)', label: '7-Day Streak', earned: true },
  { icon: Star, color: 'var(--green)', label: 'Task Master', earned: false },
  { icon: Gift, color: 'var(--teal)', label: 'Event Veteran', earned: false },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { openAuth } = useModal();

  if (!user) {
    return (
      <div style={{ padding: '80px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>Sign in to view your dashboard</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '24px' }}>Track your progress, orders, and rewards.</p>
        <button
          onClick={openAuth}
          style={{ background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '12px', padding: '13px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}
        >Sign In</button>
      </div>
    );
  }

  const { current, next, pct } = getLevelInfo(user.xp);
  const tierColor = TIER_CONFIG[user.tier]?.color || '#cd7f32';

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      {/* Welcome */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)', marginBottom: '4px' }}>
          Welcome back, {user.username}!
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text2)' }}>
          {user.tier} member · {user.streak}-day streak · Level {current.level}
        </p>
      </div>

      {/* Stats */}
      <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Total Points', val: user.totalPoints.toLocaleString(), chg: `+${user.dailyPoints} today`, icon: Zap, line: 'var(--purpleL)' },
          { label: 'Current Balance', val: user.points.toLocaleString(), chg: 'Available', icon: Trophy, line: 'var(--yellow)' },
          { label: 'Login Streak', val: `${user.streak} days`, chg: 'Keep it up!', icon: Star, line: 'var(--green)' },
          { label: 'Total Orders', val: String(user.orders), chg: 'All delivered', icon: ShoppingCart, line: 'var(--teal)' },
        ].map(({ label, val, chg, icon: Icon, line }) => (
          <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: line }} />
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '10px' }}>{label}</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>{val}</div>
            <div style={{ fontSize: '12px', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <TrendingUpSvg size={12} /> {chg}
            </div>
          </div>
        ))}
      </div>

      <div className="resp-main-side" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Main */}
        <div>
          {/* Chart */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>Points Activity (7 Days)</h3>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--purpleL)' }}>+{user.weeklyPoints} this week</span>
            </div>
            <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
              {CHART_DATA.map(d => (
                <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '100%', borderRadius: '4px 4px 0 0', minHeight: '4px',
                    background: 'linear-gradient(180deg,var(--purple),var(--purpleL))',
                    height: `${(d.pts / MAX_CHART) * 140}px`, transition: 'opacity 0.2s', cursor: 'pointer',
                    opacity: 0.85,
                  }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
                    title={`${d.pts} pts`}
                  />
                  <span style={{ fontSize: '9px', color: 'var(--text3)' }}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent orders */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>Recent Orders</h3>
              <Link href="/marketplace"
                style={{ fontSize: '12px', fontWeight: 600, color: 'var(--purpleL)', textDecoration: 'none' }}
              >View All</Link>
            </div>
            {RECENT_ORDERS.map((order, i) => (
              <div key={order.id} data-testid={`row-order-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: i < RECENT_ORDERS.length - 1 ? '1px solid rgba(37,37,69,0.5)' : 'none' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(124,58,237,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={ROBUX_IMG} style={{ width: '24px', height: '24px' }} alt="R$" onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{order.pkg}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{order.id} · {order.time}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{order.amount}</div>
                  <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: 'var(--green)', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side */}
        <div>
          {/* Profile */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '16px', textAlign: 'center' }}>
            <img
              src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(user.username)}`}
              style={{ width: '72px', height: '72px', borderRadius: '18px', border: `2px solid ${tierColor}`, marginBottom: '12px' }}
              alt={user.username}
            />
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '2px' }}>{user.username}</div>
            <div style={{ display: 'inline-block', background: `rgba(${tierColor === '#cd7f32' ? '205,127,50' : tierColor === '#94a3b8' ? '148,163,184' : tierColor === '#f87171' ? '248,113,113' : '167,139,250'},0.15)`, color: tierColor, fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', marginBottom: '16px' }}>
              {user.tier} · Lv {current.level}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text2)', marginBottom: '6px' }}>
                <span>{user.xp} XP</span>
                <span style={{ color: 'var(--purpleL)' }}>{next ? next.xpReq : '—'} XP</span>
              </div>
              <div style={{ height: '6px', background: 'var(--bg2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg,var(--purple),var(--purpleL))', borderRadius: '3px', width: `${pct}%` }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--bg2)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)' }}>{user.tasksCompleted}</div>
                <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tasks Done</div>
              </div>
              <div style={{ background: 'var(--bg2)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)' }}>{user.taskPoints}</div>
                <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Task Points</div>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text3)' }}>Member since {user.joinDate}</div>
          </div>

          {/* Quick actions */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Quick Actions</h4>
            {[
              { label: 'Buy Robux', icon: ShoppingCart, href: '/marketplace', color: 'var(--purple)' },
              { label: 'Daily Spin', icon: Zap, href: '/spin', color: 'var(--yellow)' },
              { label: 'View Tasks', icon: CheckSquare, href: '/tasks', color: 'var(--green)' },
            ].map(({ label, icon: Icon, href, color }) => (
              <Link key={label} href={href}>
                <a style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px', borderRadius: '10px', marginBottom: '6px',
                  background: 'var(--bg2)', border: '1px solid var(--border)', textDecoration: 'none',
                  color: 'var(--text)', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; }}
                >
                  <Icon size={16} style={{ color }} />
                  {label}
                </a>
              </Link>
            ))}
          </div>

          {/* Achievements */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Achievements</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {ACHIEVEMENTS.map(a => {
                const Icon = a.icon;
                return (
                  <div key={a.label} style={{
                    background: 'var(--bg2)', border: `1px solid ${a.earned ? 'var(--border2)' : 'var(--border)'}`,
                    borderRadius: '10px', padding: '12px', textAlign: 'center', opacity: a.earned ? 1 : 0.4,
                  }}>
                    <div style={{ marginBottom: '5px' }}>
                      <Icon size={20} style={{ color: a.earned ? a.color : 'var(--text3)' }} />
                    </div>
                    <div style={{ fontSize: '10px', color: a.earned ? 'var(--text)' : 'var(--text3)', fontWeight: 600, lineHeight: 1.3 }}>{a.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingUpSvg({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
