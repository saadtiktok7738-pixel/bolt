import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [welcomeOpen, setWelcomeOpen] = useState(() => {
    return !localStorage.getItem('bbWelcomeSeen');
  });

  return (
    <ModalContext.Provider value={{
      authOpen,
      openAuth: () => setAuthOpen(true),
      closeAuth: () => setAuthOpen(false),
      checkoutOpen,
      checkoutData,
      openCheckout: (amount, price, pts) => { setCheckoutData({ amount, price, pts }); setCheckoutOpen(true); },
      closeCheckout: () => { setCheckoutOpen(false); setCheckoutData(null); },
      welcomeOpen,
      closeWelcome: () => { localStorage.setItem('bbWelcomeSeen', '1'); setWelcomeOpen(false); },
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
