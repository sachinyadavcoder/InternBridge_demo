import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, Topbar } from '../components/layout';

const PAGE_TITLES = {
  '/company/dashboard': 'Dashboard',
  '/company/internships': 'Internship Management',
  '/company/applications': 'Applications',
  '/company/candidates': 'Candidate Review',
  '/company/assessments': 'Assessments',
  '/company/supervisors': 'Supervisor Management',
  '/company/monitoring': 'Internship Monitoring',
  '/company/reports': 'Reports & Analytics',
  '/company/notifications': 'Notifications',
  '/company/settings': 'Profile & Settings',

  '/supervisor/dashboard': 'Dashboard',
  '/supervisor/interns': 'My Interns',
  '/supervisor/tasks': 'Task Management',
  '/supervisor/submissions': 'Submission Review',
  '/supervisor/attendance': 'Attendance & Geofencing',
  '/supervisor/progress': 'Progress Monitoring',
  '/supervisor/evaluations': 'Feedback & Evaluation',
  '/supervisor/documents': 'Documents',
  '/supervisor/notifications': 'Notifications',
  '/supervisor/settings': 'Profile & Settings',

  '/guide/dashboard': 'Dashboard',
  '/guide/students': 'Assigned Students',
  '/guide/monitoring': 'Internship Monitoring',
  '/guide/tasks': 'Tasks & Progress',
  '/guide/reports': 'Reports & Documents',
  '/guide/attendance': 'Attendance Review',
  '/guide/feedback': 'Guide Feedback',
  '/guide/evaluations': 'Final Evaluation',
  '/guide/analytics': 'Reports',
  '/guide/notifications': 'Notifications',
  '/guide/settings': 'Profile & Settings',

  '/admin/dashboard': 'Dashboard',
  '/admin/students': 'Student Records',
  '/admin/internships': 'Internship Oversight',
  '/admin/companies': 'Company Management',
  '/admin/supervisors': 'Supervisor Records',
  '/admin/guides': 'College Guide Management',
  '/admin/assignments': 'Guide Assignments',
  '/admin/users': 'Users & Roles',
  '/admin/reports': 'Reports & Analytics',
  '/admin/activity': 'Activity & Notifications',
  '/admin/settings': 'Profile & Settings',
};

export default function PortalLayout({ role }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || 'InternBridge';

  return (
    <div className="app-layout">
      <Sidebar
        role={role}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="main-area">
        <Topbar
          pageTitle={pageTitle}
          role={role}
          onMenuToggle={() => setMobileOpen(o => !o)}
        />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
