import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/ui';

// Layout
import PortalLayout from './layouts/PortalLayout';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Company Portal Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import InternshipManagement from './pages/company/InternshipManagement';
import ApplicationsPage from './pages/company/ApplicationsPage';
import CandidateReviewPage from './pages/company/CandidateReviewPage';
import AssessmentsPage from './pages/company/AssessmentsPage';
import SupervisorManagement from './pages/company/SupervisorManagement';
import InternshipMonitoring from './pages/company/InternshipMonitoring';
import CompanyReports from './pages/company/CompanyReports';

// Supervisor Portal Pages
import SupervisorDashboard from './pages/supervisor/SupervisorDashboard';
import MyInternsPage from './pages/supervisor/MyInternsPage';
import TaskManagement from './pages/supervisor/TaskManagement';
import SubmissionReview from './pages/supervisor/SubmissionReview';
import AttendanceGeofencePage from './pages/supervisor/AttendanceGeofencePage';
import ProgressMonitoringPage from './pages/supervisor/ProgressMonitoringPage';
import SupervisorEvaluationsPage from './pages/supervisor/SupervisorEvaluationsPage';
import SupervisorDocumentsPage from './pages/supervisor/SupervisorDocumentsPage';

// Guide Portal Pages
import GuideDashboard from './pages/guide/GuideDashboard';
import AssignedStudents from './pages/guide/AssignedStudents';
import GuideMonitoring from './pages/guide/GuideMonitoring';
import GuideTasks from './pages/guide/GuideTasks';
import GuideReports from './pages/guide/GuideReports';
import GuideAttendance from './pages/guide/GuideAttendance';
import GuideFeedback from './pages/guide/GuideFeedback';
import GuideEvaluations from './pages/guide/GuideEvaluations';
import GuideAnalytics from './pages/guide/GuideAnalytics';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentRecords from './pages/admin/StudentRecords';
import InternshipOversight from './pages/admin/InternshipOversight';
import CompanyAdminManagement from './pages/admin/CompanyAdminManagement';
import SupervisorRecords from './pages/admin/SupervisorRecords';
import GuideAdminManagement from './pages/admin/GuideAdminManagement';
import GuideAssignments from './pages/admin/GuideAssignments';
import UserManagement from './pages/admin/UserManagement';
import AdminReports from './pages/admin/AdminReports';
import ActivityNotifications from './pages/admin/ActivityNotifications';

// Shared Pages
import NotificationsPage from './pages/shared/NotificationsPage';
import ProfileSettingsPage from './pages/shared/ProfileSettingsPage';

function RootRedirect() {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  const role = currentUser.role || 'company';
  return <Navigate to={`/${role}/dashboard`} replace />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RootRedirect />} />

          {/* Company Portal */}
          <Route path="/company" element={<PortalLayout role="company" />}>
            <Route index element={<Navigate to="/company/dashboard" replace />} />
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="internships" element={<InternshipManagement />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="candidates" element={<CandidateReviewPage />} />
            <Route path="assessments" element={<AssessmentsPage />} />
            <Route path="supervisors" element={<SupervisorManagement />} />
            <Route path="monitoring" element={<InternshipMonitoring />} />
            <Route path="reports" element={<CompanyReports />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<ProfileSettingsPage />} />
          </Route>

          {/* Supervisor Portal */}
          <Route path="/supervisor" element={<PortalLayout role="supervisor" />}>
            <Route index element={<Navigate to="/supervisor/dashboard" replace />} />
            <Route path="dashboard" element={<SupervisorDashboard />} />
            <Route path="interns" element={<MyInternsPage />} />
            <Route path="tasks" element={<TaskManagement />} />
            <Route path="submissions" element={<SubmissionReview />} />
            <Route path="attendance" element={<AttendanceGeofencePage />} />
            <Route path="progress" element={<ProgressMonitoringPage />} />
            <Route path="evaluations" element={<SupervisorEvaluationsPage />} />
            <Route path="documents" element={<SupervisorDocumentsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<ProfileSettingsPage />} />
          </Route>

          {/* Guide Portal */}
          <Route path="/guide" element={<PortalLayout role="guide" />}>
            <Route index element={<Navigate to="/guide/dashboard" replace />} />
            <Route path="dashboard" element={<GuideDashboard />} />
            <Route path="students" element={<AssignedStudents />} />
            <Route path="monitoring" element={<GuideMonitoring />} />
            <Route path="tasks" element={<GuideTasks />} />
            <Route path="reports" element={<GuideReports />} />
            <Route path="attendance" element={<GuideAttendance />} />
            <Route path="feedback" element={<GuideFeedback />} />
            <Route path="evaluations" element={<GuideEvaluations />} />
            <Route path="analytics" element={<GuideAnalytics />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<ProfileSettingsPage />} />
          </Route>

          {/* Admin Portal */}
          <Route path="/admin" element={<PortalLayout role="admin" />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<StudentRecords />} />
            <Route path="internships" element={<InternshipOversight />} />
            <Route path="companies" element={<CompanyAdminManagement />} />
            <Route path="supervisors" element={<SupervisorRecords />} />
            <Route path="guides" element={<GuideAdminManagement />} />
            <Route path="assignments" element={<GuideAssignments />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="activity" element={<ActivityNotifications />} />
            <Route path="settings" element={<ProfileSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
}
