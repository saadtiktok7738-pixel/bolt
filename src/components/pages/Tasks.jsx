import { useState } from 'react';
import { Play, MessageSquare, UserPlus, Share2, FileText, LogIn, CheckCircle, Clock } from 'lucide-react';
import { tasks } from '../data/task.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { useToastCtx } from '../contexts/ToastContext';

const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

const TASK_ICONS = [Play, MessageSquare, UserPlus, Share2, FileText, LogIn];
const TASK_COLORS = [
  { color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  { color: '#0d9488', bg: 'rgba(13,148,136,0.12)' },
  { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  { color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
];

export default function Tasks() {
  const { user, updateUser } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToastCtx();

  const [joinedTasks, setJoinedTasks] = useState(() => {
    const stored = localStorage.getItem('bbJoinedTasks');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const handleJoin = (taskId, pts, xp, full) => {
    if (!user) { openAuth(); return; }
    if (full || joinedTasks.has(taskId)) return;
    const newSet = new Set(joinedTasks);
    newSet.add(taskId);
    setJoinedTasks(newSet);
    localStorage.setItem('bbJoinedTasks', JSON.stringify([...newSet]));
    updateUser({
      points: user.points + pts,
      totalPoints: (user.totalPoints || 0) + pts,
      xp: user.xp + xp,
      tasksCompleted: (user.tasksCompleted || 0) + 1,
      taskPoints: (user.taskPoints || 0) + pts,
    });
    showToast(`Task joined! +${pts} points, +${xp} XP`, 'ok');
  };

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1.2px', marginBottom: '6px', color: 'var(--text)' }}>Creator Tasks</h1>
        <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Complete tasks to earn points and XP rewards</p>
      </div>

      {/* Stats bar */}
      <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '32px' }}>
        {[
          { label: 'Tasks Available', val: String(tasks.filter(t => !t.full).length), color: 'var(--purpleL)' },
          { label: 'You Completed', val: String(joinedTasks.size), color: 'var(--green)' },
          { label: 'Max Points', val: tasks.reduce((s, t) => s + t.pts, 0).toLocaleString(), color: 'var(--yellow)' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color, marginBottom: '4px' }}>{val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tasks grid */}
      <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
        {tasks.map((task, i) => {
          const isJoined = joinedTasks.has(task.id);
          const pct = task.ongoing ? 100 : Math.min(100, (task.joined / task.max) * 100);
          const Icon = TASK_ICONS[i] || Play;
          const { color, bg } = TASK_COLORS[i % TASK_COLORS.length];

          return (
            <div key={task.id}
              data-testid={`card-task-${task.id}`}
              style={{
                background: 'var(--card)', border: `1px solid ${isJoined ? 'rgba(16,185,129,0.4)' : 'var(--border)'}`,
                borderRadius: '16px', padding: '22px', transition: 'all 0.25s', cursor: 'pointer',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = isJoined ? 'rgba(16,185,129,0.6)' : 'rgba(124,58,237,0.45)'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.35)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = isJoined ? 'rgba(16,185,129,0.4)' : 'var(--border)'; el.style.transform = ''; el.style.boxShadow = ''; }}
            >
              {/* Icon + badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '13px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} style={{ color }} />
                </div>
                {task.full && (
                  <span style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--red)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '5px' }}>FULL</span>
                )}
                {isJoined && (
                  <span style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: 'var(--green)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={10} /> DONE
                  </span>
                )}
                {task.ongoing && !isJoined && (
                  <span style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: 'var(--purpleL)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={10} /> ONGOING
                  </span>
                )}
              </div>

              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>{task.name}</div>

              {/* Progress */}
              {!task.ongoing && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)', marginBottom: '5px' }}>
                    <span>{task.joined} joined</span><span>{task.max} slots</span>
                  </div>
                  <div style={{ height: '5px', background: 'var(--bg2)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '3px', background: task.full ? 'var(--red)' : color, width: `${pct}%` }} />
                  </div>
                </div>
              )}
              {task.ongoing && (
                <div style={{ marginBottom: '12px', fontSize: '12px', color: 'var(--text3)' }}>Repeatable daily</div>
              )}

              {/* Rewards */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '6px', padding: '4px 9px', fontSize: '12px', fontWeight: 700, color: 'var(--yellow)' }}>
                  <img src={POINTS_IMG} style={{ width: '12px', height: '12px' }} alt="pts" onError={e => { e.target.style.display = 'none'; }} />
                  +{task.pts}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '6px', padding: '4px 9px', fontSize: '12px', fontWeight: 700, color: 'var(--purpleL)' }}>
                  +{task.xp} XP
                </div>
              </div>

              <button
                data-testid={`btn-join-task-${task.id}`}
                onClick={() => handleJoin(task.id, task.pts, task.xp, task.full)}
                disabled={task.full && !isJoined}
                style={{
                  width: '100%', border: 'none', borderRadius: '10px', padding: '10px',
                  fontSize: '13px', fontWeight: 700, cursor: task.full && !isJoined ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font)', transition: 'all 0.2s',
                  background: isJoined ? 'rgba(16,185,129,0.15)' : task.full ? 'rgba(239,68,68,0.12)' : 'var(--purple)',
                  color: isJoined ? 'var(--green)' : task.full ? 'var(--red)' : '#fff',
                }}
                onMouseEnter={e => { if (!isJoined && !task.full) (e.currentTarget.style.background = 'var(--purple2)'); }}
                onMouseLeave={e => { if (!isJoined && !task.full) (e.currentTarget.style.background = 'var(--purple)'); }}
              >
                {isJoined ? '✓ Joined' : task.full ? 'Full' : 'Join Task'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
