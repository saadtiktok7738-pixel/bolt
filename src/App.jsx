import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import { ToastProvider } from "./components/contexts/ToastContext.jsx";
import { ModalProvider } from "./components/contexts/ModelContext.jsx";
import Layout from "./components/comp/Layout.jsx";
import Home from "./components/pages/Home.jsx";
import Marketplace from "./components/pages/MarketPlace.jsx";
import Events from "./components/pages/Events.jsx";
import Rewards from "./components/pages/Rewards.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Leaderboard from "./components/pages/Leaderboard.jsx";
import Tasks from "./components/pages/Tasks.jsx";
import Spin from "./components/pages/Spin.jsx";
import VIP from "./components/pages/VIP.jsx";
import Partners from "./components/pages/Partners.jsx";
import TOS from "./components/pages/TOS.jsx";
import Settings from "./components/pages/Settings.jsx";
import Admin from "./components/pages/Admin.jsx";
import NotFound from "./components/pages/not-found.jsx";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/events" component={Events} />
        <Route path="/rewards" component={Rewards} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/spin" component={Spin} />
        <Route path="/vip" component={VIP} />
        <Route path="/partners" component={Partners} />
        <Route path="/tos" component={TOS} />
        <Route path="/settings" component={Settings} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
