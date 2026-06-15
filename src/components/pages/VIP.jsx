import { CheckCircle, Star, Zap, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { useToastCtx } from '../contexts/ToastContext.jsx';

const TIERS = [
  {
    name: 'Silver VIP',
    price: '$4.99/mo',
    color: '#94a3b8',
    popular: false,
    perks: ['1.25x points multiplier', 'Priority event slots', 'Silver badge on profile', 'Early access to events', 'Dedicated support'],
  },
  {
    name: 'Gold VIP',
    price: '$9.99/mo',
    color: '#f59e0b',
    popular: true,
    perks: ['1.5x points multiplier', 'Exclusive Gold events', 'Gold badge + border glow', 'Double daily spin rewards', '5% discount on all packages', 'Priority support queue'],
  },
  {
    name: 'Platinum VIP',
    price: '$19.99/mo',
    color: '#a78bfa',
    popular: false,
    perks: ['2x all rewards multiplier', 'All Gold perks included', 'Platinum animated aura', 'Exclusive Platinum events', '10% discount on packages', '3 bonus spins per week', 'Personal account manager'],
  },
];

const FEATURES = [
  { feature: 'Points Multiplier', free: '1x', silver: '1.25x', gold: '1.5x', plat: '2x' },
  { feature: 'Daily Spin', free: '1/day', silver: '1/day', gold: '2/day', plat: '4/day' },
  { feature: 'Package Discount', free: '0%', silver: '0%', gold: '5%', plat: '10%' },
  { feature: 'Event Priority', free: '✗', silver: '✓', gold: '✓', plat: '✓' },
  { feature: 'Exclusive Events', free: '✗', silver: '✗', gold: '✓', plat: '✓' },
  { feature: 'Profile Badge', free: '✗', silver: '✓', gold: '✓', plat: '✓' },
  { feature: 'Support', free: 'Standard', silver: 'Priority', gold: 'Priority', plat: 'Dedicated' },
];

export default function VIP() {
  const { user } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToastCtx();

  const handleSubscribe = (tier) => {
    if (!user) { openAuth(); return; }
    showToast(`VIP subscription coming soon! Watch for ${tier}.`, 'info');
  };

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '20px', padding: '5px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: '16px' }}>
          <Star size={12} /> VIP Membership
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', marginBottom: '10px' }}>
          Unlock Premium Perks
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text2)', maxWidth: '500px', margin: '0 auto' }}>
          Supercharge your Bloxbolt experience with exclusive multipliers, events, and priority access.
        </p>
      </div>

      {/* Tier cards */}
      <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '48px' }}>
        {TIERS.map(tier => (
          <div key={tier.name} style={{
            background: 'var(--card)', border: `2px solid ${tier.popular ? tier.color : 'var(--border)'}`,
            borderRadius: '20px', padding: '32px', position: 'relative', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4)`; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = ''; }}
          >
            {tier.popular && (
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: tier.color, color: '#111', fontSize: '10px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                Most Popular
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `rgba(${tier.color === '#94a3b8' ? '148,163,184' : tier.color === '#f59e0b' ? '245,158,11' : '167,139,250'},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Star size={26} style={{ color: tier.color }} fill={tier.color} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>{tier.name}</h3>
              <div style={{ fontSize: '32px', fontWeight: 900, color: tier.color, marginBottom: '4px' }}>{tier.price}</div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              {tier.perks.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text2)', marginBottom: '9px' }}>
                  <CheckCircle size={14} style={{ color: 'var(--green)', flexShrink: 0 }} /> {p}
                </div>
              ))}
            </div>

            <button
              data-testid={`btn-subscribe-${tier.name.toLowerCase().replace(' ', '-')}`}
              onClick={() => handleSubscribe(tier.name)}
              style={{
                width: '100%', background: tier.popular ? tier.color : 'var(--purple)',
                color: tier.popular ? '#111' : '#fff', border: 'none', borderRadius: '12px',
                padding: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font)', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.opacity = '0.88'; el.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.opacity = '1'; el.style.transform = ''; }}
            >
              Get {tier.name}
            </button>
          </div>
        ))}
      </div>

      {/* Feature comparison */}
      <div className="vip-feat-wrap" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>Feature Comparison</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px', minWidth: '500px' }}>
            {/* Header */}
            <div style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>Feature</div>
            {['Free', 'Silver', 'Gold', 'Platinum'].map(h => (
              <div key={h} style={{ padding: '14px 8px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: h === 'Gold' ? '#f59e0b' : h === 'Silver' ? '#94a3b8' : h === 'Platinum' ? '#a78bfa' : 'var(--text3)', textAlign: 'center', borderLeft: '1px solid var(--border)' }}>{h}</div>
            ))}
            {FEATURES.map((row, i) => (
              <>
                <div key={`f${i}`} style={{ padding: '13px 24px', fontSize: '13px', color: 'var(--text2)', borderTop: '1px solid rgba(37,37,69,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={13} style={{ color: 'var(--purpleL)' }} /> {row.feature}
                </div>
                {[row.free, row.silver, row.gold, row.plat].map((val, j) => (
                  <div key={`v${i}-${j}`} style={{ padding: '13px 8px', fontSize: '13px', fontWeight: 600, color: val === '✗' ? 'var(--text3)' : val === '✓' ? 'var(--green)' : 'var(--text)', textAlign: 'center', borderTop: '1px solid rgba(37,37,69,0.4)', borderLeft: '1px solid var(--border)' }}>
                    {val}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
