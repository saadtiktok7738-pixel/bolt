import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useModal } from '../../contexts/ModelContext.jsx';
import { useToastCtx } from '../../contexts/ToastContext.jsx';

export default function AuthModal() {
  const { closeAuth } = useModal();
  const { login, register } = useAuth();
  const { showToast } = useToastCtx();
  const [tab, setTab] = useState('login');

  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const result = login(loginUsername, loginPassword);
    if (result.success) {
      showToast(`Welcome back, ${loginUsername}!`, 'ok');
      closeAuth();
    } else {
      setLoginError(result.error || 'Login failed.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');
    const result = register(regUsername, regEmail, regPassword, regConfirm);
    if (result.success) {
      setRegSuccess('Account created! You are now logged in.');
      showToast(`Welcome, ${regUsername}!`, 'ok');
      setTimeout(closeAuth, 1500);
    } else {
      setRegError(result.error || 'Registration failed.');
    }
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '11px 14px', color: 'var(--text)', fontSize: '14px',
    fontFamily: 'var(--font)', outline: 'none', transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px',
    textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '6px',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 8000,
      background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
      onClick={e => { if (e.target === e.currentTarget) closeAuth(); }}
    >
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border2)',
        borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '420px',
        animation: 'fadeIn 0.35s ease', position: 'relative',
      }}>
        <button
          onClick={closeAuth}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '30px', height: '30px', background: 'var(--bg2)',
            border: '1px solid var(--border)', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text3)',
          }}
        >
          <X size={14} />
        </button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,var(--purple),var(--purpleL))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text)' }}>
            Blox<em style={{ color: 'var(--purpleL)', fontStyle: 'normal' }}>bolt</em>
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
          {(['login', 'register']).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              data-testid={`tab-auth-${t}`}
              style={{
                flex: 1, padding: '8px', borderRadius: '7px', fontSize: '13px', fontWeight: 700,
                background: tab === t ? 'var(--purple)' : 'transparent',
                color: tab === t ? '#fff' : 'var(--text3)',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
              }}
            >
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>Welcome back</h3>
            <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '20px' }}>Sign in to your Bloxbolt account</p>

            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Username</label>
              <input
                type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)}
                placeholder="Your username" style={inputStyle} data-testid="input-login-username"
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.55)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                placeholder="Your password" style={inputStyle} data-testid="input-login-password"
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.55)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            {loginError && <div style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '8px' }}>{loginError}</div>}

            <button
              type="submit"
              data-testid="btn-login-submit"
              style={{
                width: '100%', background: 'var(--purple)', color: '#fff', border: 'none',
                borderRadius: '12px', padding: '13px', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'var(--font)', marginTop: '4px', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.5)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--purple)'; el.style.boxShadow = ''; }}
            >
              Sign In
            </button>

            <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: 'var(--text3)' }}>
              Don't have an account?{' '}
              <button type="button" onClick={() => setTab('register')} style={{ color: 'var(--purpleL)', cursor: 'pointer', fontWeight: 600, background: 'none', border: 'none', fontFamily: 'var(--font)' }}>
                Register
              </button>
            </p>

            <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '10px', textAlign: 'center' }}>
              Demo: BloxMaster99 / password123
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>Create account</h3>
            <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '20px' }}>Join thousands earning free Robux</p>

            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Username</label>
              <input
                type="text" value={regUsername} onChange={e => setRegUsername(e.target.value)}
                placeholder="Choose a username" style={inputStyle} data-testid="input-reg-username"
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.55)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)}
                placeholder="your@email.com" style={inputStyle} data-testid="input-reg-email"
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.55)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>Password</label>
                <input
                  type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)}
                  placeholder="Password" style={inputStyle} data-testid="input-reg-password"
                  onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.55)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <div>
                <label style={labelStyle}>Confirm</label>
                <input
                  type="password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)}
                  placeholder="Confirm" style={inputStyle} data-testid="input-reg-confirm"
                  onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.55)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
            </div>

            {regError && <div style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '8px' }}>{regError}</div>}
            {regSuccess && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '11px 14px', color: 'var(--green)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{regSuccess}</div>}

            <button
              type="submit"
              data-testid="btn-register-submit"
              style={{
                width: '100%', background: 'var(--purple)', color: '#fff', border: 'none',
                borderRadius: '12px', padding: '13px', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'var(--font)', marginTop: '4px', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.5)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--purple)'; el.style.boxShadow = ''; }}
            >
              Create Account
            </button>

            <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: 'var(--text3)' }}>
              Already have an account?{' '}
              <button type="button" onClick={() => setTab('login')} style={{ color: 'var(--purpleL)', cursor: 'pointer', fontWeight: 600, background: 'none', border: 'none', fontFamily: 'var(--font)' }}>
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
