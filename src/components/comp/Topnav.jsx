import { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, LogOut, User as UserIcon, Settings, Menu, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { useIsMobile } from '../hooks/useMobile.jsx';

const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

export default function Topnav({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { openAuth } = useModal();
  const isMobile = useIsMobile();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: isMobile ? 0 : '200px',
      right: 0,
      height: '60px',
      zIndex: 150,
      background: 'rgba(13,13,26,0.88)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: isMobile ? '0 14px' : '0 32px',
      gap: isMobile ? '8px' : '14px',
    }}>

      {/* Mobile: hamburger button */}
      {isMobile && (
        <button
          data-testid="btn-mobile-menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
          style={{
            width: '38px', height: '38px', flexShrink: 0,
            background: 'var(--card2)', border: '1px solid var(--border)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text2)',
          }}
        >
          <Menu size={18} />
        </button>
      )}

      {/* Mobile: logo in topnav */}
      {isMobile && (
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '26px', height: '26px',
            background: 'linear-gradient(135deg, var(--purple), var(--purpleL))',
            borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={14} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text)' }}>
            Blox<em style={{ color: 'var(--purpleL)', fontStyle: 'normal' }}>bolt</em>
          </span>
        </Link>
      )}

      {/* Desktop: live pill */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text3)', fontSize: '12px', fontWeight: 500 }}>
          <span style={{
            width: '8px', height: '8px', background: 'var(--green)', borderRadius: '50%',
            boxShadow: '0 0 8px var(--green)', animation: 'blink 2s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <strong style={{ color: 'var(--green)' }}>1,247</strong> online
        </div>
      )}

      <div style={{ flex: 1 }} />

      {/* Mobile: live dot only */}
      {isMobile && (
        <span style={{
          width: '8px', height: '8px', background: 'var(--green)', borderRadius: '50%',
          boxShadow: '0 0 8px var(--green)', animation: 'blink 2s ease-in-out infinite',
          display: 'inline-block', flexShrink: 0,
        }} />
      )}

      {user ? (
        <>
          {/* Points pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: isMobile ? '5px' : '8px',
            background: 'rgba(124,58,237,0.14)', border: '1px solid rgba(124,58,237,0.28)',
            borderRadius: '10px', padding: isMobile ? '6px 10px' : '7px 14px',
            color: 'var(--text)', fontWeight: 700, fontSize: isMobile ? '13px' : '15px',
            flexShrink: 0,
          }}>
            <img
              src={POINTS_IMG}
              alt="pts"
              style={{ width: isMobile ? '15px' : '20px', height: isMobile ? '15px' : '20px' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            {isMobile
              ? (user.points >= 10000 ? `${Math.round(user.points / 1000)}k` : user.points.toLocaleString())
              : user.points.toLocaleString()
            }
          </div>

          {/* Bell — desktop only */}
          {!isMobile && (
            <div style={{
              position: 'relative', width: '38px', height: '38px',
              background: 'var(--card2)', border: '1px solid var(--border)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text2)',
            }}>
              <Bell size={18} />
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px', width: '17px', height: '17px',
                background: 'var(--red)', borderRadius: '50%', fontSize: '9px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '2px solid var(--bg)',
              }}>2</span>
            </div>
          )}

          {/* User dropdown */}
          <div ref={dropRef} style={{ position: 'relative', flexShrink: 0 }}>
            <button
              data-testid="btn-user-menu"
              onClick={() => setDropOpen(!dropOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: isMobile ? '5px' : '9px',
                background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '10px',
                padding: isMobile ? '5px 8px 5px 5px' : '5px 12px 5px 6px',
                cursor: 'pointer', color: 'var(--text)',
                fontFamily: 'var(--font)', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
              }}
            >
              <img
                src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(user.username)}`}
                alt={user.username}
                style={{ width: '26px', height: '26px', borderRadius: '7px', flexShrink: 0 }}
              />
              {!isMobile && <span>{user.username}</span>}
              <ChevronDown size={14} color="var(--text3)" />
            </button>

            {dropOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'var(--card)', border: '1px solid var(--border2)',
                borderRadius: '12px', padding: '6px', minWidth: '160px',
                zIndex: 1000, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                animation: 'fadeIn 0.2s ease',
              }}>
                <Link
                  href="/dashboard"
                  onClick={() => setDropOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '9px 12px', borderRadius: '8px', cursor: 'pointer',
                    color: 'var(--text2)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <UserIcon size={14} /> Dashboard
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setDropOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '9px 12px', borderRadius: '8px', cursor: 'pointer',
                    color: 'var(--text2)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Settings size={14} /> Settings
                </Link>
                <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                <button
                  data-testid="btn-logout"
                  onClick={() => { logout(); setDropOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '9px 12px', borderRadius: '8px', cursor: 'pointer',
                    color: 'var(--red)', fontSize: '13px', fontWeight: 600, background: 'transparent',
                    border: 'none', fontFamily: 'var(--font)', width: '100%', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <button
          data-testid="btn-login"
          onClick={openAuth}
          style={{
            background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '10px',
            padding: isMobile ? '8px 14px' : '8px 20px', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s', flexShrink: 0,
          }}
        >
          Sign In
        </button>
      )}
    </header>
  );
}
