import { useState } from 'react';
import { User, Bell, Shield, Trash2, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { useToastCtx } from '../contexts/ToastContext.jsx';
import { Link } from 'wouter';

export default function Settings() {
  const { user, logout, updateUser } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToastCtx();

  const [email, setEmail] = useState(user?.email || '');
  const [notifs, setNotifs] = useState({
    events: true,
    spin: true,
    tasks: true,
    promotions: false,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: '80px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>Sign in to access Settings</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '24px' }}>Manage your account preferences.</p>
        <button onClick={openAuth} style={{ background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '12px', padding: '13px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}>Sign In</button>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '11px 14px', color: 'var(--text)', fontSize: '14px',
    fontFamily: 'var(--font)', outline: 'none', transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px',
    textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '7px',
  };

  return (
    <div className="settings-wrap" style={{ padding: '40px 56px 72px', maxWidth: '720px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.8px', marginBottom: '6px', color: 'var(--text)' }}>Settings</h1>
        <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Manage your account preferences</p>
      </div>

      {/* Profile */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={16} style={{ color: 'var(--purpleL)' }} /> Profile
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <img
            src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(user.username)}`}
            style={{ width: '64px', height: '64px', borderRadius: '16px', border: '2px solid var(--border2)' }}
            alt={user.username}
          />
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '2px' }}>{user.username}</div>
            <div style={{ fontSize: '13px', color: 'var(--text3)' }}>{user.tier} · Member since {user.joinDate}</div>
          </div>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Username</label>
          <input type="text" value={user.username} readOnly style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
          <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>Username cannot be changed</div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" style={inputStyle}
            data-testid="input-settings-email"
            onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        <button
          onClick={() => { updateUser({ email }); showToast('Profile updated!', 'ok'); }}
          data-testid="btn-save-profile"
          style={{
            background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '10px',
            padding: '11px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'var(--font)', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
        >Save Changes</button>
      </div>

      {/* Notifications */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} style={{ color: 'var(--purpleL)' }} /> Notifications
        </h2>

        {[
          { key: 'events', label: 'New Events', desc: 'Get notified when new events go live' },
          { key: 'spin', label: 'Daily Spin Reminder', desc: 'Reminder when your daily spin is available' },
          { key: 'tasks', label: 'New Tasks', desc: 'Notify when creator tasks are posted' },
          { key: 'promotions', label: 'Promotions', desc: 'Special deals and promotional offers' },
        ].map(n => (
          <div key={n.key} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: '1px solid rgba(37,37,69,0.4)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{n.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{n.desc}</div>
            </div>
            <div
              data-testid={`toggle-notif-${n.key}`}
              onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
              style={{
                width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
                background: notifs[n.key] ? 'var(--purple)' : 'var(--bg2)',
                border: `1px solid ${notifs[n.key] ? 'var(--purple)' : 'var(--border)'}`,
                position: 'relative', transition: 'all 0.25s',
              }}
            >
              <div style={{
                position: 'absolute', top: '2px',
                left: notifs[n.key] ? '22px' : '2px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: notifs[n.key] ? '#fff' : 'var(--text3)',
                transition: 'left 0.25s',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Security */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={16} style={{ color: 'var(--purpleL)' }} /> Security
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Lock size={18} style={{ color: 'var(--text3)' }} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Password</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Last changed: Jan 15, 2026</div>
            </div>
          </div>
          <button
            onClick={() => showToast('Password change coming soon!', 'info')}
            style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 600, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'var(--font)' }}
          >Change</button>
        </div>

        <button
          onClick={() => { logout(); showToast('Signed out successfully', 'ok'); }}
          data-testid="btn-settings-logout"
          style={{
            background: 'transparent', color: 'var(--red)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '10px', padding: '11px 20px', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(239,68,68,0.08)'; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; }}
        >Sign Out</button>
      </div>

      {/* Admin panel link */}
      {user.username === 'admin' && (
        <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '16px', padding: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--purpleL)' }}>Admin Panel</div>
            <div style={{ fontSize: '13px', color: 'var(--text3)' }}>Manage platform settings, users, and content</div>
          </div>
          <Link href="/admin"
            style={{ background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--purple2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--purple)'}
          >Open Admin</Link>
        </div>
      )}

      {/* Danger zone */}
      <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '16px', padding: '28px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--red)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trash2 size={16} /> Danger Zone
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '16px', lineHeight: 1.6 }}>
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        {!confirmDelete ? (
          <button
            data-testid="btn-delete-account"
            onClick={() => setConfirmDelete(true)}
            style={{
              background: 'transparent', color: 'var(--red)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px', padding: '11px 20px', fontSize: '13px', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font)',
            }}
          >Delete Account</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text2)' }}>Are you sure?</span>
            <button
              onClick={() => { logout(); showToast('Account deleted.', 'err'); }}
              style={{ background: 'var(--red)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}
            >Yes, Delete</button>
            <button
              onClick={() => setConfirmDelete(false)}
              style={{ background: 'var(--card2)', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}
            >Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
