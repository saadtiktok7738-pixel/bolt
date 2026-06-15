import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useRevel.js';
import { useModal } from '../contexts/ModelContext.jsx';
import { packages } from '../data/packages.js';
import { events } from '../data/events.js';
import { ShoppingCart, Zap, CheckCircle, Star, TrendingUp, Users, Trophy, Gift, Shield, Lock, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

const ROBUX_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Frobux.svg&w=48&q=75';
const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

const FAKE_USERS = ['xXProGamerXx','CryptoKing99','BloxMaster99','StarterPack','NightWolf88','SkyRocket22','JadeWarrior','SpeedDemon'];
const FAKE_ACTIONS = ['purchased 1,700 Robux','earned 150 points','won Daily Spin','completed a task','joined an event','purchased 4,500 Robux','redeemed 500 pts'];

function LiveFeed() {
  const [rows, setRows] = useState(() => {
    return Array.from({length: 6}, (_, i) => ({
      id: i,
      user: FAKE_USERS[i % FAKE_USERS.length],
      action: FAKE_ACTIONS[i % FAKE_ACTIONS.length],
      time: `${Math.floor(Math.random()*55)+1}s ago`,
    }));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setRows(prev => {
        const newRow = {
          id: Date.now(),
          user: FAKE_USERS[Math.floor(Math.random()*FAKE_USERS.length)],
          action: FAKE_ACTIONS[Math.floor(Math.random()*FAKE_ACTIONS.length)],
          time: 'just now',
        };
        return [newRow, ...prev.slice(0, 7)];
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 0', borderBottom: '1px solid rgba(37,37,69,0.5)',
          animation: 'fadeIn 0.4s ease',
        }}>
          <img
            src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(row.user)}`}
            style={{ width: '28px', height: '28px', borderRadius: '7px' }}
            alt={row.user}
          />
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '13px' }}>{row.user}</span>
            <span style={{ color: 'var(--text3)', fontSize: '13px' }}> {row.action}</span>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text3)' }}>{row.time}</span>
        </div>
      ))}
    </div>
  );
}

const FEATURED_IDS = ['standard', 'premium', 'elite'];
const HOW_STEPS = [
  { num: '01', title: 'Create Account', desc: 'Sign up for free in under 30 seconds. No credit card required.' },
  { num: '02', title: 'Earn Points', desc: 'Complete tasks, spin the daily wheel, and join events to earn points.' },
  { num: '03', title: 'Buy or Redeem', desc: 'Purchase Robux with crypto or redeem your earned points instantly.' },
];
const WHY_ITEMS = [
  { big: '1.2M+', sub: 'happy users', title: 'Trusted Community', desc: 'Over a million Roblox players trust Bloxbolt for safe, fast Robux delivery.' },
  { big: '< 2min', sub: 'average delivery', title: 'Instant Delivery', desc: 'Your Robux is delivered to your account within minutes of payment confirmation.' },
  { big: '24/7', sub: 'always available', title: 'Round-the-clock Support', desc: 'Our automated systems and support team are always ready to assist you.' },
  { big: '0%', sub: 'hidden fees', title: 'No Hidden Fees', desc: 'What you see is what you pay. Transparent pricing with no surprise charges.' },
];

export default function Home() {
  useReveal();
  const { openCheckout, openAuth } = useModal();
  const [feedTab, setFeedTab] = useState('live');
  const featured = packages.filter(p => FEATURED_IDS.includes(p.id));

  return (
    <div>
      {/* HERO */}
      <section className="home-hero" style={{
        padding: '80px 72px 72px',
        display: 'grid', gridTemplateColumns: '1fr 460px', gap: '60px', alignItems: 'center',
        background: `radial-gradient(ellipse at 70% 50%,rgba(124,58,237,0.12),transparent 65%)`,
        borderBottom: '1px solid var(--border)',
        animation: 'heroIn 0.4s ease',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: '20px', padding: '5px 14px', fontSize: '11px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--purpleL)', marginBottom: '20px',
          }}>
            <span style={{ width: '7px', height: '7px', background: 'var(--green)', borderRadius: '50%', boxShadow: '0 0 8px var(--green)', animation: 'blink 1.5s infinite', display: 'inline-block' }} />
            1,247 users online now
          </div>

          <h1 style={{ fontSize: '54px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.08, marginBottom: '20px', color: 'var(--text)' }}>
            Buy <span style={{ color: 'var(--purpleL)' }}>Robux</span><br />
            Earn Rewards<br />
            <span style={{ fontSize: '44px', color: 'var(--text3)' }}>Pay Crypto</span>
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '460px' }}>
            The #1 platform to purchase Robux with cryptocurrency and earn free Robux through tasks, events, and daily rewards.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
            <Link href="/marketplace"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--purple)', color: '#fff', padding: '14px 28px',
                borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                transition: 'all 0.25s', border: 'none',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.55)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--purple)'; el.style.transform = ''; el.style.boxShadow = ''; }}
            >
              <ShoppingCart size={18} /> Buy Robux
            </Link>
            <Link href="/rewards"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--card2)', color: 'var(--text)', padding: '14px 28px',
                borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                border: '1px solid var(--border2)', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--purpleL)'; el.style.color = 'var(--purpleL)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text)'; }}
            >
              <Gift size={18} /> Earn Free
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '32px' }}>
            {[['1.2M+','Users'], ['99.9%','Uptime'], ['< 2min','Delivery']].map(([val, lab]) => (
              <div key={lab}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)' }}>{val}</div>
                <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lab}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards */}
        <div className="home-hero-graphic" style={{ position: 'relative', height: '380px' }}>
          {[
            { pkg: packages[6], x: 20, y: 0, delay: '0s' },
            { pkg: packages[4], x: 140, y: 50, delay: '1.3s' },
            { pkg: packages[2], x: 60, y: 200, delay: '0.6s' },
          ].map(({ pkg, x, y, delay }) => (
            <div key={pkg.id} style={{
              position: 'absolute', left: x, top: y,
              background: 'var(--card)', border: '1px solid var(--border2)',
              borderRadius: '16px', padding: '18px', width: '180px',
              animation: `float 4s ease-in-out ${delay} infinite`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <img src={ROBUX_IMG} style={{ width: '28px', height: '28px' }} alt="R$" onError={e => { e.target.style.display = 'none'; }} />
                <span style={{ fontWeight: 900, fontSize: '20px', color: 'var(--text)' }}>{pkg.amount.toLocaleString()}</span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Robux</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)' }}>${pkg.price}</span>
                <span style={{ fontSize: '10px', color: 'var(--green)', fontWeight: 600 }}>+{pkg.pts} pts</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="home-sec" style={{ padding: '60px 72px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 className="reveal" style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)', marginBottom: '5px' }}>Featured Packages</h2>
            <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Most popular Robux packages with instant delivery</p>
          </div>
          <Link href="/marketplace"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--purpleL)', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
          >
            View all <ChevronRight size={14} />
          </Link>
        </div>

        <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {featured.map(pkg => (
            <div key={pkg.id} className="reveal" style={{
              background: 'var(--card)', border: `1px solid ${pkg.tag ? 'rgba(124,58,237,0.45)' : 'var(--border)'}`,
              borderRadius: '16px', padding: '22px', position: 'relative', cursor: 'pointer', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = ''; }}
            >
              {pkg.tag && (
                <span style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: pkg.tag === 'Best Value' ? 'var(--green)' : 'var(--yellow)',
                  color: '#111', fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
                  textTransform: 'uppercase', padding: '2px 8px', borderRadius: '4px',
                }}>{pkg.tag}</span>
              )}
              <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '12px' }}>{pkg.type}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <img src={ROBUX_IMG} style={{ width: '32px', height: '32px' }} alt="R$" onError={e => { e.target.style.display = 'none'; }} />
                <span style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)' }}>{pkg.amount.toLocaleString()}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Robux</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>${pkg.price}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text2)' }}>
                  <img src={POINTS_IMG} style={{ width: '13px', height: '13px' }} alt="pts" onError={e => { e.target.style.display = 'none'; }} />
                  +{pkg.pts} pts
                </span>
              </div>
              <button
                data-testid={`btn-buy-${pkg.id}`}
                onClick={() => openCheckout(pkg.amount.toLocaleString(), `$${pkg.price}`, pkg.pts)}
                style={{
                  width: '100%', background: 'var(--purple)', color: '#fff', border: 'none',
                  borderRadius: '9px', padding: '10px', fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'var(--font)', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE ACTIVITY */}
      <section className="home-sec" style={{ padding: '60px 72px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="resp-main-side" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
          <div>
            <h2 className="reveal" style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text)', marginBottom: '18px' }}>Live Activity</h2>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '0' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', padding: '10px', borderBottom: '1px solid var(--border)' }}>
                {[['live','Live Feed'], ['buyers','Top Buyers'], ['lb','Leaderboard']].map(([id, label]) => (
                  <button key={id}
                    onClick={() => setFeedTab(id)}
                    style={{
                      padding: '7px 16px', borderRadius: '7px', fontSize: '12px', fontWeight: 600,
                      background: feedTab === id ? 'var(--purple)' : 'transparent',
                      color: feedTab === id ? '#fff' : 'var(--text3)',
                      border: 'none', cursor: 'pointer', fontFamily: 'var(--font)',
                    }}
                  >{label}</button>
                ))}
              </div>
              <div style={{ padding: '8px 16px', maxHeight: '320px', overflowY: 'auto' }}>
                {feedTab === 'live' && <LiveFeed />}
                {feedTab === 'buyers' && <LiveFeed />}
                {feedTab === 'lb' && (
                  <div>
                    {['BloxMaster99','CryptoKing99','xXProGamerXx','NightWolf88','SkyRocket22'].map((u, i) => (
                      <div key={u} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(37,37,69,0.5)' : 'none' }}>
                        <span style={{ width: '22px', textAlign: 'center', fontWeight: 800, fontSize: '13px', color: i < 3 ? 'var(--yellow)' : 'var(--text3)' }}>#{i+1}</span>
                        <img src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(u)}`} style={{ width: '28px', height: '28px', borderRadius: '7px' }} alt={u} />
                        <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '13px', flex: 1 }}>{u}</span>
                        <span style={{ fontSize: '12px', color: 'var(--yellow)', fontWeight: 700 }}>{(1200 - i*180).toLocaleString()} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { icon: Users, color: 'var(--purple)', label: 'Total Members', val: '1,247,830' },
              { icon: Trophy, color: 'var(--yellow)', label: 'Rewards Given', val: '$2.4M+' },
              { icon: Zap, color: 'var(--green)', label: 'Tasks Completed', val: '4.8M+' },
              { icon: Gift, color: 'var(--teal)', label: 'Events Hosted', val: '12,400+' },
            ].map(({ icon: Icon, color, label, val }) => (
              <div key={label} className="reveal" style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px',
              }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: `rgba(${color === 'var(--purple)' ? '124,58,237' : color === 'var(--yellow)' ? '245,158,11' : color === 'var(--green)' ? '16,185,129' : '13,148,136'},0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>{val}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-sec" style={{ padding: '60px 72px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="reveal" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)', marginBottom: '8px' }}>How It Works</h2>
          <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Three simple steps to get started</p>
        </div>
        <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {HOW_STEPS.map(step => (
            <div key={step.num} className="reveal" style={{
              background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px',
              textAlign: 'center', position: 'relative',
            }}>
              <div style={{ fontSize: '56px', fontWeight: 900, color: 'rgba(124,58,237,0.15)', lineHeight: 1, marginBottom: '14px' }}>{step.num}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="home-sec" style={{ padding: '60px 72px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 className="reveal" style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)', marginBottom: '5px' }}>Live Events</h2>
            <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Join events to earn bonus points and prizes</p>
          </div>
          <Link href="/events"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--purpleL)', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
          >
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {events.live.map(ev => (
            <div key={ev.id} className="reveal" style={{
              background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px',
              overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(124,58,237,0.45)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.45)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = ''; el.style.boxShadow = ''; }}
            >
              <div style={{ height: '120px', background: 'linear-gradient(135deg,var(--bg3),var(--card2))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <img
                  src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(ev.game)}`}
                  style={{ width: '72px', height: '72px', borderRadius: '14px', border: '2px solid var(--border2)' }}
                  alt={ev.game}
                />
                <span style={{
                  position: 'absolute', top: '10px', left: '10px',
                  background: ev.full ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                  color: ev.full ? 'var(--red)' : 'var(--green)',
                  border: `1px solid ${ev.full ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                  fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: '5px',
                }}>{ev.full ? 'Full' : 'Live'}</span>
                <span style={{
                  position: 'absolute', top: '10px', right: '10px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'rgba(0,0,0,0.6)', borderRadius: '5px', padding: '3px 8px',
                  fontSize: '11px', fontWeight: 700, color: 'var(--yellow)',
                }}>
                  <img src={POINTS_IMG} style={{ width: '11px', height: '11px' }} alt="pts" onError={e => { e.target.style.display = 'none'; }} />
                  +{ev.pts}
                </span>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{ev.game}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>{ev.name}</div>
                <div style={{ height: '5px', background: 'var(--bg2)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: ev.full ? 'var(--red)' : 'var(--green)', width: `${Math.min(100, (ev.joined/ev.max)*100)}%`, transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text3)' }}>{ev.joined}/{ev.max} joined</span>
                  <button
                    style={{
                      background: ev.full ? 'rgba(239,68,68,0.15)' : 'var(--purple)',
                      color: ev.full ? 'var(--red)' : '#fff',
                      border: ev.full ? '1px solid rgba(239,68,68,0.3)' : 'none',
                      borderRadius: '7px', padding: '6px 14px', fontSize: '12px', fontWeight: 700,
                      cursor: ev.full ? 'default' : 'pointer', fontFamily: 'var(--font)',
                    }}
                  >{ev.full ? 'Full' : 'Join'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BLOXBOLT */}
      <section className="home-sec" style={{ padding: '60px 72px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="reveal" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)', marginBottom: '8px' }}>Why Choose Bloxbolt?</h2>
          <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Trusted by over a million Roblox players worldwide</p>
        </div>
        <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {WHY_ITEMS.map((item, i) => (
            <div key={item.title} className="reveal" style={{
              background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px',
              position: 'relative', overflow: 'hidden', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = ''; }}
            >
              <div style={{ fontSize: '42px', fontWeight: 900, color: 'var(--purpleL)', lineHeight: 1, marginBottom: '3px' }}>{item.big}</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>{item.sub}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '7px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="home-sec" style={{ padding: '60px 72px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="home-partner-cta" style={{
          background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px',
          padding: '52px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '40px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(124,58,237,0.1),transparent 60%)', pointerEvents: 'none' }} />
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: 'var(--purpleL)', textTransform: 'uppercase', marginBottom: '16px' }}>
              <Star size={12} /> Partnership Program
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text)', marginBottom: '10px' }}>Become a Partner</h2>
            <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.65, maxWidth: '460px' }}>
              Partner with Bloxbolt and earn commissions by referring your community. Get exclusive perks, dedicated support, and competitive rates.
            </p>
          </div>
          <Link href="/partners"
            style={{
              background: 'var(--purple)', color: '#fff', fontWeight: 700, fontSize: '15px',
              padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.55)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--purple)'; el.style.transform = ''; el.style.boxShadow = ''; }}
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-sec" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '56px 72px 28px' }}>
        <div className="home-footer" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg,var(--purple),var(--purpleL))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)' }}>Blox<em style={{ color: 'var(--purpleL)', fontStyle: 'normal' }}>bolt</em></span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '20px', lineHeight: 1.6 }}>
              The #1 Roblox rewards platform. Buy Robux with crypto, earn points through tasks and events.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['Discord','Twitter','YouTube'].map(s => (
                <button key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '9px', padding: '7px 12px', color: 'var(--text2)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text2)'; }}
                >{s}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '16px' }}>Platform</h4>
            {['Marketplace','Events','Rewards','Leaderboard','VIP'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`}
                style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '14px', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
              >{l}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '16px' }}>Company</h4>
            {[['Partners','/partners'],['Terms of Service','/tos'],['Settings','/settings']].map(([l, href]) => (
              <Link key={l} href={href}
                style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '14px', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
              >{l}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text3)' }}>© 2026 Bloxbolt. Not affiliated with Roblox Corporation.</p>
          <p style={{ fontSize: '12px', color: 'var(--text3)' }}>Made with passion for the Roblox community</p>
        </div>
      </footer>
    </div>
  );
}
