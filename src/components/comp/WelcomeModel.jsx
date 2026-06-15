import { Zap } from 'lucide-react';
import { useModal } from '../contexts/ModelContext.jsx';

export default function WelcomeModal() {
  const { closeWelcome } = useModal();

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 8000,
      background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border2)',
        borderRadius: '20px', padding: '36px 32px', width: '100%', maxWidth: '460px',
        textAlign: 'center', animation: 'fadeIn 0.35s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg,var(--purple),var(--purpleL))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={22} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text)' }}>
            Blox<em style={{ color: 'var(--purpleL)', fontStyle: 'normal' }}>bolt</em>
          </span>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.35, marginBottom: '20px' }}>
          Welcome to the #1 Roblox Rewards Platform
        </h2>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', marginBottom: '12px', fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65, textAlign: 'left' }}>
          <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Buy Robux with Crypto</strong>
          Purchase Robux securely using Bitcoin, Ethereum, USDT, and more. Instant delivery guaranteed.
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', marginBottom: '12px', fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65, textAlign: 'left' }}>
          <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Earn Free Robux</strong>
          Complete tasks, spin the daily wheel, join events, and climb the leaderboard to earn points redeemable for Robux.
        </div>

        <div style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px', padding: '14px 16px', marginBottom: '22px', fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65, textAlign: 'left' }}>
          <strong style={{ color: 'var(--purpleL)', display: 'block', marginBottom: '4px' }}>New Update — May 2026</strong>
          Daily Spin now has 7 reward tiers including 1,000 point jackpots! New VIP tiers and exclusive events added.
        </div>

        <button
          data-testid="btn-welcome-close"
          onClick={closeWelcome}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--purple)', color: '#fff', fontWeight: 700, fontSize: '15px',
            padding: '13px 32px', borderRadius: '12px', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font)', transition: 'all 0.25s',
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.55)'; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--purple)'; el.style.transform = ''; el.style.boxShadow = ''; }}
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
