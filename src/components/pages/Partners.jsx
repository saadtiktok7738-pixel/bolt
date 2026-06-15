import { useState } from 'react';
import { Users, DollarSign, Zap, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useToastCtx } from '../contexts/ToastContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';

const CURRENT_PARTNERS = [
  { name: 'RobloxDaily', members: '48K', avatar: 'robloxdaily' },
  { name: 'BloxNews', members: '92K', avatar: 'bloxnews' },
  { name: 'CryptoRoblox', members: '31K', avatar: 'cryptoroblox' },
  { name: 'RbxHunters', members: '67K', avatar: 'rbxhunters' },
];

const BENEFITS = [
  { icon: DollarSign, color: 'var(--green)', title: '10-20% Commission', desc: 'Earn competitive commission on every purchase your community makes through your link.' },
  { icon: Zap, color: 'var(--purpleL)', title: 'Exclusive Partner Events', desc: 'Host your own branded events on Bloxbolt to engage and grow your community.' },
  { icon: Star, color: 'var(--yellow)', title: 'Priority Support', desc: 'Dedicated partner manager and priority support for you and your community.' },
  { icon: Users, color: 'var(--teal)', title: 'Co-marketing', desc: 'Get featured in Bloxbolt newsletters, social posts, and platform promotions.' },
];

export default function Partners() {
  const { user } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToastCtx();

  const [form, setForm] = useState({ name: '', discord: '', platform: '', reach: '', why: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) { openAuth(); return; }
    if (!form.name || !form.discord) { showToast('Please fill required fields.', 'err'); return; }
    setSubmitted(true);
    showToast('Application submitted! We\'ll review it within 48 hours.', 'ok');
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '11px 14px', color: 'var(--text)', fontSize: '14px',
    fontFamily: 'var(--font)', outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '20px', padding: '5px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--purpleL)', marginBottom: '16px' }}>
          <Star size={12} /> Partnership Program
        </div>
        <h1 style={{ fontSize: '44px', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', marginBottom: '12px' }}>
          Grow Together with Bloxbolt
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text2)', maxWidth: '540px', margin: '0 auto' }}>
          Partner with the #1 Roblox rewards platform and earn commissions while providing value to your community.
        </p>
      </div>

      {/* Benefits */}
      <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '56px' }}>
        {BENEFITS.map(b => {
          const Icon = b.icon;
          return (
            <div key={b.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.25s' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = ''; }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `rgba(${b.color === 'var(--green)' ? '16,185,129' : b.color === 'var(--purpleL)' ? '168,85,247' : b.color === 'var(--yellow)' ? '245,158,11' : '13,148,136'},0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Icon size={22} style={{ color: b.color }} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '7px' }}>{b.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65 }}>{b.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="resp-main-side" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px' }}>
        {/* Application form */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>Apply to Partner</h2>
          <p style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '24px' }}>Fill out this form and our team will review your application within 48 hours.</p>

          {submitted ? (
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
              <CheckCircle size={48} style={{ color: 'var(--green)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Application Submitted!</h3>
              <p style={{ color: 'var(--text2)', fontSize: '14px' }}>We'll review your application and reach out via Discord within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="resp-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '7px' }}>Your Name / Brand *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name or brand" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '7px' }}>Discord Username *</label>
                  <input type="text" value={form.discord} onChange={e => setForm({ ...form, discord: e.target.value })} placeholder="username#0000" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>
              <div className="resp-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '7px' }}>Platform</label>
                  <input type="text" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} placeholder="YouTube, Discord, TikTok..." style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '7px' }}>Community Size</label>
                  <input type="text" value={form.reach} onChange={e => setForm({ ...form, reach: e.target.value })} placeholder="e.g. 10,000 subscribers" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '7px' }}>Why do you want to partner?</label>
                <textarea value={form.why} onChange={e => setForm({ ...form, why: e.target.value })} placeholder="Tell us about yourself and your community..." rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <button type="submit" data-testid="btn-partner-apply"
                style={{ background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.25s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--purple2)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.5)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--purple)'; el.style.boxShadow = ''; }}
              >Submit Application</button>
            </form>
          )}
        </div>

        {/* Current partners */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px' }}>Current Partners</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CURRENT_PARTNERS.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                <img src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(p.avatar)}`} style={{ width: '40px', height: '40px', borderRadius: '10px' }} alt={p.name} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{p.members} members</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '6px', padding: '3px 9px', fontSize: '10px', fontWeight: 700, color: 'var(--purpleL)' }}>
                  <CheckCircle size={10} /> Partner
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', marginTop: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Requirements</h3>
            {['500+ community members', 'Active Roblox-related content', 'No scam or exploit content', 'At least 1 month of activity'].map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text2)', marginBottom: '8px' }}>
                <CheckCircle size={13} style={{ color: 'var(--green)' }} /> {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
