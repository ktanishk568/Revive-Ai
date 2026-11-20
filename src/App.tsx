import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoveryStateProvider } from './hooks/useRecoveryState';
import { Layout } from './layouts/Layout';
import { LandingPage } from './pages/LandingPage';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { AIRecoveryAgent } from './pages/AIRecoveryAgent';
import { RecoveryQueue } from './pages/RecoveryQueue';
import { FailedPayments } from './pages/FailedPayments';
import { Customers } from './pages/Customers';
import { RevenueAnalytics } from './pages/RevenueAnalytics';
import { AIInsights } from './pages/AIInsights';
import { Automations } from './pages/Automations';
import { AIGuardrails } from './pages/AIGuardrails';
import { ActivityLog } from './pages/Activity';
import { Settings } from './pages/Settings';

function App() {
  return (
    <RecoveryStateProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Connected Console App routes (Layout contains header and sidebar) */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<OverviewDashboard />} />
            <Route path="/ai-agent" element={<AIRecoveryAgent />} />
            <Route path="/queue" element={<RecoveryQueue />} />
            <Route path="/failures" element={<FailedPayments />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<RevenueAnalytics />} />
            <Route path="/insights" element={<AIInsights />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/guardrails" element={<AIGuardrails />} />
            <Route path="/activity" element={<ActivityLog />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RecoveryStateProvider>
  );
}

export default App;
