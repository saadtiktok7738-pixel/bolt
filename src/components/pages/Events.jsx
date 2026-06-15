import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { events } from '../data/events.js';
import { useToastCtx } from '../contexts/ToastContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';

const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

function EventCard({ ev, isLive }) {
  const { user, updateUser } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToastCtx();
  const [joined, setJoined] = useState(() => {
    const k = `bbEvent_${ev.id}`;
    return !!localStorage.getItem(k);
  });

  const handleJoin = () => {
    if (!user) { openAuth(); return; }
    if (ev.full || joined) return;
    localStorage.setItem(`bbEvent_${ev.id}`, '1');
    setJoined(true);
    updateUser({ points: user.points + ev.pts, xp: user.xp + ev.pts * 2 });
    showToast(`Joined "${ev.name}"! +${ev.pts} points`, 'ok');
  };

  const pct = Math.min(100, (ev.joined / ev.max) * 100);
  const full = ev.full || false;

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px',
      overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s',
    }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(124,58,237,0.45)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.45)'; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = ''; el.style.boxShadow = ''; }}
    >
      <div style={{ height: '130px', background: 'linear-gradient(135deg,var(--bg3),var(--card2))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <img
          src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(ev.game)}`}
          style={{ width: '80px', height: '80px', borderRadius: '14px', border: '2px solid var(--border2)' }}
          alt={ev.game}
        />
        <span style={{
          position: 'absolute', top: '10px', left: '10px',
          background: full ? 'rgba(239,68,68,0.15)' : isLive ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
          color: full ? 'var(--red)' : isLive ? 'var(--green)' : 'var(--yellow)',
          border: `1px solid ${full ? 'rgba(239,68,68,0.3)' : isLive ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
          fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
          padding: '3px 8px', borderRadius: '5px',
        }}>{full ? 'Full' : isLive ? 'Live' : 'Upcoming'}</span>
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
        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>{ev.name}</div>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)', marginBottom: '5px' }}>
            <span>{ev.joined} joined</span><span>{ev.max} max</span>
          </div>
          <div style={{ height: '5px', background: 'var(--bg2)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '3px', background: full ? 'var(--red)' : 'var(--green)', width: `${pct}%`, transition: 'width 0.5s ease' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
          <span style={{ color: 'var(--text3)' }}>{ev.joined}/{ev.max} spots</span>
          <button
            data-testid={`btn-join-event-${ev.id}`}
            onClick={handleJoin}
            style={{
              background: joined ? 'rgba(16,185,129,0.15)' : full ? 'rgba(239,68,68,0.15)' : 'var(--purple)',
              color: joined ? 'var(--green)' : full ? 'var(--red)' : '#fff',
              border: joined ? '1px solid rgba(16,185,129,0.3)' : full ? '1px solid rgba(239,68,68,0.3)' : 'none',
              borderRadius: '7px', padding: '6px 14px', fontSize: '12px', fontWeight: 700,
              cursor: full || joined ? 'default' : 'pointer', fontFamily: 'var(--font)',
            }}
          >{joined ? 'Joined' : full ? 'Full' : 'Join'}</button>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [filterTab, setFilterTab] = useState('all');
  const [gameFilter, setGameFilter] = useState('All');
  const [calDate, setCalDate] = useState(new Date());

  const games = ['All', 'Blox Fruits', 'Arsenal', 'Wolfpaq', 'Adopt Me', 'Nikilis', 'Tower of Hell'];

  const allEvents = [
    ...events.live.map(e => ({ ...e, isLive: true })),
    ...events.upcoming.map(e => ({ ...e, isLive: false, full: false })),
  ].filter(e => {
    if (filterTab === 'live') return e.isLive;
    if (filterTab === 'upcoming') return !e.isLive;
    return true;
  }).filter(e => gameFilter === 'All' || e.game === gameFilter);

  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
  const eventDays = [3, 7, 12, 18, 22, 27];

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(16,185,129,0.06))',
        border: '1px solid var(--border)', borderRadius: '20px',
        padding: '36px 40px', marginBottom: '32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(124,58,237,0.15),transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)', marginBottom: '6px' }}>Bloxbolt Events</h2>
          <p style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '20px' }}>Join live events to earn points and exclusive rewards</p>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[['3', 'Live Events'], ['6', 'Upcoming'], ['12,400+', 'Total Hosted']].map(([val, lab]) => (
              <div key={lab}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>{val}</div>
                <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '4px', background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px' }}>
          {[['all', 'All Events'], ['live', 'Live'], ['upcoming', 'Upcoming']].map(([id, label]) => (
            <button key={id} onClick={() => setFilterTab(id)}
              data-testid={`filter-events-${id}`}
              style={{
                padding: '7px 16px', borderRadius: '7px', fontSize: '12px', fontWeight: 600,
                background: filterTab === id ? 'var(--bg3)' : 'transparent',
                color: filterTab === id ? 'var(--text)' : 'var(--text3)',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font)',
              }}
            >{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {games.map(g => (
            <button key={g} onClick={() => setGameFilter(g)}
              style={{
                padding: '6px 14px', background: gameFilter === g ? 'rgba(124,58,237,0.08)' : 'var(--card)',
                border: `1px solid ${gameFilter === g ? 'rgba(124,58,237,0.5)' : 'var(--border)'}`,
                borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                color: gameFilter === g ? 'var(--purpleL)' : 'var(--text2)',
                cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
              }}
            >{g}</button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div style={{ marginBottom: '40px' }}>
        {filterTab !== 'upcoming' && (
          <>
            <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '7px', height: '7px', background: 'var(--green)', borderRadius: '50%', boxShadow: '0 0 7px var(--green)', animation: 'blink 1.5s ease-in-out infinite', display: 'inline-block' }} />
              Live Events
            </div>
            <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '36px' }}>
              {events.live.map(ev => <EventCard key={ev.id} ev={ev} isLive={true} />)}
            </div>
          </>
        )}

        {filterTab !== 'live' && (
          <>
            <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '16px' }}>
              Upcoming Events
            </div>
            <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '36px' }}>
              {events.upcoming.map(ev => <EventCard key={ev.id} ev={{ ...ev, full: false }} isLive={false} />)}
            </div>
          </>
        )}
      </div>

      {/* Calendar */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>Event Calendar</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}
              style={{ width: '30px', height: '30px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)' }}
            ><ChevronLeft size={14} /></button>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
              {calDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}
              style={{ width: '30px', height: '30px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)' }}
            ><ChevronRight size={14} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px' }}>
          {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
            <div key={d} style={{ fontSize: '10px', fontWeight: 600, textAlign: 'center', color: 'var(--text3)', padding: '4px 0', textTransform: 'uppercase' }}>{d}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`e${i}`} style={{ minHeight: '40px', background: 'transparent' }} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const hasEvent = eventDays.includes(day);
            const today = new Date();
            const isToday = day === today.getDate() && calDate.getMonth() === today.getMonth() && calDate.getFullYear() === today.getFullYear();
            return (
              <div key={day} style={{
                minHeight: '40px',
                background: hasEvent ? 'rgba(124,58,237,0.1)' : 'var(--bg2)',
                border: `1px solid ${isToday ? 'rgba(124,58,237,0.5)' : hasEvent ? 'rgba(124,58,237,0.25)' : 'transparent'}`,
                borderRadius: '8px', padding: '4px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', fontSize: '11px', fontWeight: 600,
                color: isToday ? 'var(--purpleL)' : hasEvent ? 'var(--text)' : 'var(--text3)',
                cursor: hasEvent ? 'pointer' : 'default',
              }}>
                {day}
                {hasEvent && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', marginTop: '2px' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
