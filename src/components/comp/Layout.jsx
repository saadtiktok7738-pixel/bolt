import { useState } from 'react';
import Sidebar from './models/Sidebar.jsx';
import Topnav from './Topnav.jsx';
import WelcomeModal from './WelcomeModel.jsx';
import AuthModal from './models/AuthModal.jsx';
import CheckoutModal from './models/CheckoutModel.jsx';
import { useModal } from '../contexts/ModelContext.jsx';
import { useIsMobile } from '../hooks/useMobile.jsx';

export default function Layout({ children }) {
  const { welcomeOpen, authOpen, checkoutOpen } = useModal();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topnav onMenuClick={() => setSidebarOpen(true)} />
      <main style={{
        marginLeft: isMobile ? 0 : '200px',
        paddingTop: '60px',
        flex: 1,
        minHeight: '100vh',
        background: 'var(--bg)',
      }}>
        {children}
      </main>
      {welcomeOpen && <WelcomeModal />}
      {authOpen && <AuthModal />}
      {checkoutOpen && <CheckoutModal />}
    </div>
  );
}
