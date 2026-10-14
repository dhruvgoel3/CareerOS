import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CareerProvider } from './context/CareerContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CoachPage } from './pages/CoachPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { SkillsPage } from './pages/SkillsPage';
import { JobsPage } from './pages/JobsPage';
import { InterviewsPage } from './pages/InterviewsPage';
import { NetworkPage } from './pages/NetworkPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <CareerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="coach" element={<CoachPage />} />
            <Route path="resume" element={<ResumeBuilderPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="interviews" element={<InterviewsPage />} />
            <Route path="network" element={<NetworkPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CareerProvider>
  );
};

export default App;
