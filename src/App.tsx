import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import IncomeExpense from './pages/IncomeExpense';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import AIGuidance from './pages/AIGuidance';
import AIInsights from './pages/AIInsights';
import AILoan from './pages/AILoan';
import AIRecommendations from './pages/AIRecommendations';
import AIChecklist from './pages/AIChecklist';
import AISchemes from './pages/AISchemes';
import AIHealth from './pages/AIHealth';
import Community from './pages/Community';
import Marketing from './pages/Marketing';

import Profile from './pages/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income-expense"
          element={
            <ProtectedRoute>
              <IncomeExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-guidance"
          element={
            <ProtectedRoute>
              <AIGuidance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-insights"
          element={
            <ProtectedRoute>
              <AIInsights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-loan"
          element={
            <ProtectedRoute>
              <AILoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-recommendations"
          element={
            <ProtectedRoute>
              <AIRecommendations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-checklist"
          element={
            <ProtectedRoute>
              <AIChecklist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-schemes"
          element={
            <ProtectedRoute>
              <AISchemes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-health"
          element={
            <ProtectedRoute>
              <AIHealth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketing"
          element={
            <ProtectedRoute>
              <Marketing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
      
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
