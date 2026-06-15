import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Clock, Trophy, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { useToastCtx } from '../contexts/ToastContext.jsx';

const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

const SP_REWARDS = [
  { pts: 50, w: 30, color: '#7c3aed' },
  { pts: 100, w: 25, color: '#a855f7' },
  { pts: 200, w: 20, color: '#0d9488' },
  { pts: 300, w: 15, color: '#f59e0b' },
  { pts: 500, w: 7, color: '#10b981' },
  { pts: 1000, w: 2, color: '#ef4444' },
  { pts: 25, w: 1, color: '#505075' },
];

const TOTAL_WEIGHT = SP_REWARDS.reduce((s, r) => s + r.w, 0);

function weightedRandom() {
  let rand = Math.random() * TOTAL_WEIGHT;
  for (let i = 0; i < SP_REWARDS.length; i++) {
    rand -= SP_REWARDS[i].w;
    if (rand <= 0) return i;
  }
  return 0;
}

function SpinWheel({ rotation, spinning }) {
  const segments = SP_REWARDS.length;
  const segAngle = 360 / segments;
  const r = 140;
  const cx = 150;
  const cy = 150;

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      {/* Pointer */}
      <div style={{
        position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '24px solid #fff',
        zIndex: 10,
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
      }} />

      <svg
        width="300" height="300"
        style={{
          transition: spinning ? 'none' : 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
          transform: `rotate(${rotation}deg)`,
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
        }}
      >
        {SP_REWARDS.map((reward, i) => {
          const startAngle = (i * segAngle - 90) * (Math.PI / 180);
          const endAngle = ((i + 1) * segAngle - 90) * (Math.PI / 180);
          const x1 = cx + r * Math.cos(startAngle);
          const y1 = cy + r * Math.sin(startAngle);
          const x2 = cx + r * Math.cos(endAngle);
          const y2 = cy + r * Math.sin(endAngle);
          const midAngle = (startAngle + endAngle) / 2;
          const tx = cx + (r * 0.65) * Math.cos(midAngle);
          const ty = cy + (r * 0.65) * Math.sin(midAngle);

          return (
            <g key={i}>
              <path
                d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
                fill={reward.color}
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="2"
              />
              <text
                x={tx} y={ty}
                fill="#fff"
                fontSize="12"
                fontWeight="800"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${i * segAngle + segAngle / 2}, ${tx}, ${ty})`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {reward.pts}
              </text>
            </g>
          );
        })}
        {/* Center hub */}
        <circle cx={cx} cy={cy} r={24} fill="var(--bg)" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
        <circle cx={cx} cy={cy} r={10} fill="var(--purple)" />
      </svg>
    </div>
  );
}

export default function Spin() {
  const { user, updateUser } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToastCtx();

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState([]);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const lastRotRef = useRef(0);

  const COOLDOWN = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const key = user ? `bbLastSpin_${user.username}` : 'bbLastSpin';
    const last = parseInt(localStorage.getItem(key) || '0');
    const diff = Date.now() - last;
    if (diff < COOLDOWN) {
      setCooldownLeft(Math.ceil((COOLDOWN - diff) / 1000));
    }
  }, [user]);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const timer = setInterval(() => {
      setCooldownLeft(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownLeft]);

  const formatCountdown = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  };

  const handleSpin = () => {
    if (!user) { openAuth(); return; }
    if (spinning || cooldownLeft > 0) return;

    const winIdx = weightedRandom();
    const win = SP_REWARDS[winIdx];
    const segAngle = 360 / SP_REWARDS.length;

    // Segment pointer offset: we want the pointer (at top = 270deg in wheel coords) to land on winIdx
    // Each segment starts at i*segAngle - 90deg, center at i*segAngle + segAngle/2 - 90deg
    const targetAngle = -(winIdx * segAngle + segAngle / 2) + 270;
    const spins = 5 + Math.floor(Math.random() * 3);
    const newRotation = lastRotRef.current + spins * 360 + ((targetAngle - lastRotRef.current) % 360 + 360) % 360;
    lastRotRef.current = newRotation;

    setSpinning(true);
    setShowResult(false);
    setResult(null);
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(win.pts);
      setShowResult(true);

      const key = `bbLastSpin_${user.username}`;
      localStorage.setItem(key, Date.now().toString());
      setCooldownLeft(Math.ceil(COOLDOWN / 1000));

      updateUser({
        points: user.points + win.pts,
        totalPoints: (user.totalPoints || 0) + win.pts,
        xp: user.xp + Math.floor(win.pts / 2),
      });

      setHistory(prev => [{ pts: win.pts, time: 'just now' }, ...prev.slice(0, 4)]);
    }, 4100);
  };

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1.2px', marginBottom: '6px', color: 'var(--text)' }}>Daily Spin</h1>
        <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Spin once every 24 hours to win free points</p>
      </div>

      <div className="resp-main-side" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
        {/* Wheel section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px',
            padding: '40px 40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: '100%', maxWidth: '420px', position: 'relative',
          }}>
            <SpinWheel rotation={rotation} spinning={spinning} />

            <div style={{ marginTop: '32px', width: '100%' }}>
              {cooldownLeft > 0 ? (
                <div style={{
                  width: '100%', background: 'rgba(80,80,117,0.15)', border: '1px solid var(--border)',
                  borderRadius: '14px', padding: '16px', textAlign: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text2)', marginBottom: '6px' }}>
                    <Clock size={16} />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Next spin in</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', letterSpacing: '2px' }}>
                    {formatCountdown(cooldownLeft)}
                  </div>
                </div>
              ) : (
                <button
                  data-testid="btn-spin"
                  onClick={handleSpin}
                  disabled={spinning}
                  style={{
                    width: '100%', background: spinning ? 'rgba(124,58,237,0.4)' : 'var(--purple)',
                    color: '#fff', border: 'none', borderRadius: '14px', padding: '16px',
                    fontSize: '16px', fontWeight: 800, cursor: spinning ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font)', transition: 'all 0.25s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  }}
                  onMouseEnter={e => { if (!spinning) { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.55)'; el.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = spinning ? 'rgba(124,58,237,0.4)' : 'var(--purple)'; el.style.boxShadow = ''; el.style.transform = ''; }}
                >
                  <RefreshCw size={20} style={{ animation: spinning ? 'spin 0.5s linear infinite' : 'none' }} />
                  {spinning ? 'Spinning...' : 'Spin Now — Free!'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Rewards table */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Possible Rewards</h3>
            {SP_REWARDS.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < SP_REWARDS.length - 1 ? '1px solid rgba(37,37,69,0.4)' : 'none' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: r.color, flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                  <img src={POINTS_IMG} style={{ width: '13px', height: '13px' }} alt="pts" onError={e => { e.target.style.display = 'none'; }} />
                  {r.pts} points
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text3)' }}>{Math.round((r.w / TOTAL_WEIGHT) * 100)}% chance</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Your Stats</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: 'var(--bg2)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--purpleL)' }}>{history.length}</div>
                <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spins Today</div>
              </div>
              <div style={{ background: 'var(--bg2)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--yellow)' }}>
                  {history.reduce((s, h) => s + h.pts, 0)}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Points Won</div>
              </div>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Spin History</h3>
              {history.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < history.length - 1 ? '1px solid rgba(37,37,69,0.4)' : 'none' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(124,58,237,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RefreshCw size={14} style={{ color: 'var(--purpleL)' }} />
                  </div>
                  <div style={{ flex: 1, fontSize: '13px', color: 'var(--text)' }}>Daily Spin</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green)' }}>+{h.pts}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{h.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result popup */}
      {showResult && result !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 8000, background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowResult(false)}
        >
          <div style={{
            background: 'var(--card)', border: '1px solid rgba(124,58,237,0.5)',
            borderRadius: '24px', padding: '48px 40px', textAlign: 'center',
            animation: 'fadeIn 0.35s ease', maxWidth: '360px', width: '100%',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', marginBottom: '8px' }}>You Won!</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
              <img src={POINTS_IMG} style={{ width: '32px', height: '32px' }} alt="pts" onError={e => { e.target.style.display = 'none'; }} />
              <span style={{ fontSize: '48px', fontWeight: 900, color: 'var(--purpleL)' }}>{result}</span>
              <span style={{ fontSize: '20px', color: 'var(--text2)', fontWeight: 600 }}>points</span>
            </div>
            <button
              onClick={() => setShowResult(false)}
              style={{
                background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '12px',
                padding: '13px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}
            >Awesome!</button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
