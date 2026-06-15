import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'ok') => {
    const id = ++nextId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              background: toast.type === 'err' ? 'rgba(239,68,68,0.15)' : toast.type === 'info' ? 'rgba(124,58,237,0.15)' : 'rgba(16,185,129,0.15)',
              border: `1px solid ${toast.type === 'err' ? 'rgba(239,68,68,0.4)' : toast.type === 'info' ? 'rgba(124,58,237,0.4)' : 'rgba(16,185,129,0.4)'}`,
              borderRadius: '10px',
              padding: '11px 18px',
              fontSize: '13px',
              fontWeight: 600,
              color: toast.type === 'err' ? '#fca5a5' : toast.type === 'info' ? '#c4b5fd' : '#6ee7b7',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.25s ease',
              pointerEvents: 'all',
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToastCtx() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastCtx must be used within ToastProvider');
  return ctx;
}
