import { useLocation, Link } from 'wouter';
import { Home, ShoppingCart, Calendar, Gift, LayoutDashboard, Trophy, CheckSquare, RefreshCw, Star, Users, Settings, Zap, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useModal } from '../../contexts/ModelContext.jsx';
import { useIsMobile } from '../../hooks/useMobile.jsx';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/rewards', label: 'Rewards', icon: Gift },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/spin', label: 'Daily Spin', icon: RefreshCw },
  { path: '/vip', label: 'VIP', icon: Star },
  { path: '/partners', label: 'Partners', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
];

function NavItem({ path, label, icon: Icon, onClick }) {
  const [location] = useLocation();
  const isActive = path === '/' ? location === '/' : location.startsWith(path);

  return (
    <Link
      href={path}
      onClick={onClick}
      data-testid={`nav-${label.toLowerCase().replace(/\s/g, '-')}`}
      style={{
        width: '100%',
        height: '46px',
        borderRadius: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 16px',
        cursor: 'pointer',
        color: isActive ? '#fff' : 'var(--text3)',
        background: isActive ? 'var(--purple)' : 'transparent',
        boxShadow: isActive ? '0 4px 24px rgba(124,58,237,0.55)' : 'none',
        textDecoration: 'none',
        transition: 'all 0.2s',
        fontSize: '13px',
        fontWeight: 600,
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (!isActive) { const el = e.currentTarget; el.style.background = 'rgba(124,58,237,0.18)'; el.style.color = 'var(--text2)'; } }}
      onMouseLeave={e => { if (!isActive) { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--text3)'; } }}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const { openAuth } = useModal();
  const isMobile = useIsMobile();

  const asideStyle = isMobile
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '260px',
        background: 'var(--sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '14px 12px 16px',
        gap: '2px',
        zIndex: 300,
        overflowY: 'auto',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: open ? '4px 0 32px rgba(0,0,0,0.5)' : 'none',
      }
    : {
        width: '200px',
        flexShrink: 0,
        background: 'var(--sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '14px 12px 16px',
        gap: '2px',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 200,
        overflowY: 'auto',
      };

  const sidebarInner = (
    <aside style={asideStyle}>
      {/* Logo row */}
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'space-between' : 'center',
        marginBottom: '14px',
        padding: '0 4px',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, var(--purple), var(--purpleL))',
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text)' }}>
            Blox<em style={{ color: 'var(--purpleL)', fontStyle: 'normal' }}>bolt</em>
          </span>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: '32px', height: '32px',
              background: 'var(--card2)', border: '1px solid var(--border)',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text2)', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav items */}
      {navItems.map(item => (
        <NavItem
          key={item.path}
          {...item}
          onClick={isMobile ? onClose : undefined}
        />
      ))}

      <div style={{ flex: 1 }} />

      {/* Bottom user / sign-in */}
      <div style={{ marginTop: '8px' }}>
        {user ? (
          <Link
            href="/dashboard"
            onClick={isMobile ? onClose : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              borderRadius: '11px',
              border: '1px solid var(--border2)',
              background: 'var(--card2)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            <img
              src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(user.username)}`}
              alt={user.username}
              style={{ width: '32px', height: '32px', borderRadius: '9px', border: '1px solid var(--border2)', flexShrink: 0 }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{user.username}</div>
              <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{user.tier}</div>
            </div>
          </Link>
        ) : (
          <button
            onClick={() => { openAuth(); if (isMobile) onClose(); }}
            data-testid="btn-sidebar-login"
            style={{
              width: '100%',
              background: 'var(--purple)',
              color: '#fff',
              border: 'none',
              borderRadius: '11px',
              padding: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font)',
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </aside>
  );

  if (isMobile) {
    return (
      <>
        {open && (
          <div
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 299,
              backdropFilter: 'blur(2px)',
              animation: 'fadeIn 0.2s ease',
            }}
          />
        )}
        {sidebarInner}
      </>
    );
  }

  return sidebarInner;
}
