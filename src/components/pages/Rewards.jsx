import { CheckCircle, Gift, RefreshCw, Users, Star, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { useToastCtx } from '../contexts/ToastContext.jsx';
import { getLevelInfo, TIER_CONFIG } from '../libs/auth.js';
import { useReveal } from '../hooks/useRevel.js';

const ROBUX_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Frobux.svg&w=48&q=75';
const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

const TIERS = [
  { name: 'Bronze', icon: '🥉', req: '0 XP', bg: 'tc-bronze', perks: ['Access to daily spin', 'Task rewards (1x)', 'Basic leaderboard'], color: '#cd7f32' },
  { name: 'Silver', icon: '🥈', req: '1,500 XP', bg: 'tc-silver', perks: ['1.25x task rewards', 'Priority event slots', 'Silver badge'], color: '#94a3b8' },
  { name: 'Ruby', icon: '💎', req: '6,000 XP', bg: 'tc-ruby', perks: ['1.5x all rewards', 'Exclusive events', 'Ruby badge + border'], color: '#f87171' },
  { name: 'Violet', icon: '⚡', req: '15,000 XP', bg: 'tc-violet', perks: ['2x all rewards', 'VIP event access', 'Violet aura + title'], color: '#a78bfa' },
];

const EARN_WAYS = [
  { icon: RefreshCw, color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', name: 'Daily Spin', desc: 'Spin the wheel once per day for up to 1,000 points', reward: '+25 to +1,000', href: '/spin' },
  { icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.12)', name: 'Complete Tasks', desc: 'Finish creator tasks for guaranteed point rewards', reward: '+20 to +100', href: '/tasks' },
  { icon: Zap, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', name: 'Join Events', desc: 'Participate in live events for bonus point multipliers', reward: '+50 to +200', href: '/events' },
  { icon: Users, color: '#0d9488', bg: 'rgba(13,148,136,0.12)', name: 'Refer Friends', desc: 'Earn 150 points for every friend who signs up', reward: '+150 per referral', href: '/settings' },
];

const HISTORY = [
  { icon: RefreshCw, color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', name: 'Daily Spin', time: '2h ago', pts: '+100' },
  { icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.12)', name: 'Follow on Roblox', time: '1d ago', pts: '+30' },
  { icon: Zap, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', name: 'Devil Fruit Hunt', time: '2d ago', pts: '+50' },
  { icon: Gift, color: '#0d9488', bg: 'rgba(13,148,136,0.12)', name: 'Daily Login', time: '3d ago', pts: '+20' },
];

const REDEEM_OPTS = [
  { r: '80', cost: '500 pts' },
  { r: '400', cost: '2,500 pts' },
  { r: '1,700', cost: '10,000 pts' },
  { r: '4,500', cost: '25,000 pts' },
];

export default function Rewards() {
  useReveal();
  const { user } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToastCtx();

  const { current, next, pct } = user ? getLevelInfo(user.xp) : getLevelInfo(0);
  const tierColor = TIER_CONFIG[user?.tier || 'Bronze']?.color || '#cd7f32';

  const handleRedeem = (cost) => {
    if (!user) { openAuth(); return; }
    const pts = parseInt(cost.replace(/[^0-9]/g, ''));
    if (user.points < pts) { showToast('Not enough points!', 'err'); return; }
    showToast(`Redeemed! Check your account for Robux.`, 'ok');
  };

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      {/* Top stats */}
      <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Points', val: user ? user.totalPoints.toLocaleString() : '0', sub: `${user?.points || 0} available`, cls: 'rw-s1', color: 'var(--purpleL)' },
          { label: 'Current Rank', val: '#47', sub: 'Top 5% globally', cls: 'rw-s2', color: 'var(--yellow)' },
          { label: 'Current Tier', val: user?.tier || 'Bronze', sub: next ? `${next.xpReq - (user?.xp || 0)} XP to next` : 'Max tier', cls: 'rw-s3', color: tierColor },
        ].map(({ label, val, sub, cls, color }) => (
          <div key={label} className={`reveal ${cls}`} style={{
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: color, opacity: 0.12 }} />
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '10px' }}>{label}</div>
            <div style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1, marginBottom: '4px', color: 'var(--text)' }}>{val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="resp-main-side" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Main */}
        <div>
          {/* Tiers */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="reveal" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={16} style={{ color: 'var(--purpleL)' }} /> Membership Tiers
            </h3>
            <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
              {TIERS.map(tier => {
                const isCurrent = user?.tier === tier.name;
                return (
                  <div key={tier.name} className="reveal" style={{
                    background: 'var(--card)', border: `1px solid ${isCurrent ? 'var(--purpleL)' : 'var(--border)'}`,
                    borderRadius: '14px', padding: '20px', position: 'relative', transition: 'all 0.25s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = '')}
                  >
                    {isCurrent && (
                      <div style={{
                        position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
                        background: 'var(--purple)', color: '#fff', fontSize: '10px', fontWeight: 700,
                        letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 10px',
                        borderRadius: '20px', whiteSpace: 'nowrap',
                      }}>Current</div>
                    )}
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `rgba(${tier.color === '#cd7f32' ? '205,127,50' : tier.color === '#94a3b8' ? '148,163,184' : tier.color === '#f87171' ? '248,113,113' : '167,139,250'},0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', fontSize: '26px' }}>
                      {tier.icon}
                    </div>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text)', marginBottom: '2px' }}>{tier.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '14px' }}>{tier.req}</div>
                    {tier.perks.map(p => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--text2)', marginBottom: '7px' }}>
                        <CheckCircle size={13} style={{ color: 'var(--green)', flexShrink: 0 }} /> {p}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earn ways */}
          <div>
            <h3 className="reveal" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} style={{ color: 'var(--purpleL)' }} /> Ways to Earn
            </h3>
            <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {EARN_WAYS.map(way => {
                const Icon = way.icon;
                return (
                  <div key={way.name} className="reveal" style={{
                    background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px',
                    padding: '18px', display: 'flex', alignItems: 'flex-start', gap: '14px',
                    transition: 'all 0.25s', cursor: 'pointer',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = ''; }}
                  >
                    <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: way.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} style={{ color: way.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '3px' }}>{way.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '8px', lineHeight: 1.5 }}>{way.desc}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 700, color: 'var(--yellow)' }}>
                        <img src={POINTS_IMG} style={{ width: '14px', height: '14px' }} alt="pts" onError={e => { e.target.style.display = 'none'; }} />
                        {way.reward}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side */}
        <div>
          {/* XP Progress */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <TrendingUp size={14} style={{ color: 'var(--purpleL)' }} /> Level Progress
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `rgba(${tierColor === '#cd7f32' ? '205,127,50' : tierColor === '#94a3b8' ? '148,163,184' : tierColor === '#f87171' ? '248,113,113' : '167,139,250'},0.15)`, border: `2px solid ${tierColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900, color: tierColor }}>
                {current.level}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>Level {current.level}</div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{user?.tier || 'Bronze'} Tier</div>
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text2)', marginBottom: '6px' }}>
                <span>{user?.xp || 0} XP</span>
                <span style={{ color: 'var(--purpleL)', fontWeight: 700 }}>{next ? next.xpReq : '—'} XP</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg,var(--purple),var(--purpleL))', borderRadius: '4px', width: `${pct}%` }} />
              </div>
            </div>
          </div>

          {/* Redeem */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Gift size={14} style={{ color: 'var(--purpleL)' }} /> Redeem Points
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              {REDEEM_OPTS.map(opt => (
                <div key={opt.r} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(124,58,237,0.4)'; el.style.background = 'rgba(124,58,237,0.06)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--bg2)'; }}
                  onClick={() => handleRedeem(opt.cost)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '15px', fontWeight: 800, color: 'var(--text)', marginBottom: '2px' }}>
                    <img src={ROBUX_IMG} style={{ width: '16px', height: '16px' }} alt="R$" onError={e => { e.target.style.display = 'none'; }} />
                    {opt.r}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{opt.cost}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleRedeem('2,500')}
              style={{
                width: '100%', background: 'var(--yellow)', color: '#111', border: 'none',
                borderRadius: '9px', padding: '10px', fontSize: '13px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'var(--font)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--yellow2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--yellow)')}
            >Redeem Now</button>
          </div>

          {/* History */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Recent Activity</h4>
            {HISTORY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < HISTORY.length - 1 ? '1px solid rgba(37,37,69,0.5)' : 'none' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} style={{ color: item.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{item.time}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green)' }}>{item.pts}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingUp({ size, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
