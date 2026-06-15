import { useState } from 'react';
import { X } from 'lucide-react';
import { useModal } from '../../contexts/ModelContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useToastCtx } from '../../contexts/ToastContext.jsx';

const CRYPTO_OPTIONS = [
  { id: 'btc', label: 'Bitcoin', icon: '₿' },
  { id: 'eth', label: 'Ethereum', icon: 'Ξ' },
  { id: 'usdt', label: 'USDT', icon: '$' },
  { id: 'sol', label: 'Solana', icon: '◎' },
  { id: 'ltc', label: 'Litecoin', icon: 'Ł' },
  { id: 'bnb', label: 'BNB', icon: 'B' },
  { id: 'xrp', label: 'XRP', icon: 'X' },
  { id: 'doge', label: 'Doge', icon: 'D' },
];

const ROBUX_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Frobux.svg&w=48&q=75';
const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

export default function CheckoutModal() {
  const { closeCheckout, checkoutData } = useModal();
  const { user, updateUser } = useAuth();
  const { showToast } = useToastCtx();
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [robloxUsername, setRobloxUsername] = useState(user?.username || '');

  if (!checkoutData) return null;

  const handleComplete = () => {
    if (!robloxUsername.trim()) {
      showToast('Please enter your Roblox username.', 'err');
      return;
    }
    if (!user) {
      showToast('Please sign in to complete purchase.', 'err');
      return;
    }
    updateUser({
      points: user.points + checkoutData.pts,
      totalPoints: (user.totalPoints || 0) + checkoutData.pts,
      orders: (user.orders || 0) + 1,
    });
    showToast(`Order placed! +${checkoutData.pts} points added.`, 'ok');
    closeCheckout();
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)', zIndex: 500, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}
      onClick={e => { if (e.target === e.currentTarget) closeCheckout(); }}
    >
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: '20px',
        padding: '32px', width: '100%', maxWidth: '440px', animation: 'fadeIn 0.3s ease', position: 'relative',
      }}>
        <button
          onClick={closeCheckout}
          style={{
            position: 'absolute', top: '16px', right: '16px', width: '30px', height: '30px',
            background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text3)',
          }}
        >
          <X size={14} />
        </button>

        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px', color: 'var(--text)' }}>Complete Purchase</h2>
        <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '4px' }}>Secure crypto payment</p>

        {/* Package row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '12px', padding: '16px', margin: '18px 0',
        }}>
          <img src={ROBUX_IMG} alt="R$" style={{ width: '40px', height: '40px' }} onError={e => { e.target.style.display = 'none'; }} />
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }} data-testid="modal-amount">{checkoutData.amount} Robux</div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={POINTS_IMG} alt="pts" style={{ width: '12px', height: '12px' }} onError={e => { e.target.style.display = 'none'; }} />
              +{checkoutData.pts} points
            </div>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '22px', fontWeight: 900, color: 'var(--purpleL)' }} data-testid="modal-price">{checkoutData.price}</span>
        </div>

        {/* Crypto selector */}
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '10px' }}>
          Select Payment Method
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '18px' }}>
          {CRYPTO_OPTIONS.map(c => (
            <button
              key={c.id}
              data-testid={`crypto-${c.id}`}
              onClick={() => setSelectedCrypto(c.id)}
              style={{
                background: selectedCrypto === c.id ? 'rgba(124,58,237,0.08)' : 'var(--bg2)',
                border: `1px solid ${selectedCrypto === c.id ? 'var(--purpleL)' : 'var(--border)'}`,
                borderRadius: '10px', padding: '10px 6px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                color: selectedCrypto === c.id ? 'var(--purpleL)' : 'var(--text2)', fontFamily: 'var(--font)',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '18px' }}>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Roblox username */}
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '8px' }}>
          Roblox Username
        </div>
        <input
          type="text"
          value={robloxUsername}
          onChange={e => setRobloxUsername(e.target.value)}
          placeholder="Enter your Roblox username"
          data-testid="input-roblox-username"
          style={{
            width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '11px 14px', color: 'var(--text)', fontSize: '14px',
            fontFamily: 'var(--font)', outline: 'none', marginBottom: '18px', transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />

        <button
          data-testid="btn-complete-purchase"
          onClick={handleComplete}
          style={{
            width: '100%', background: 'var(--purple)', color: '#fff', border: 'none',
            borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.25s',
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.5)'; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--purple)'; el.style.boxShadow = ''; }}
        >
          Complete Purchase — {checkoutData.price}
        </button>
      </div>
    </div>
  );
}
