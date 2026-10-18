import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, Users, ClipboardList, Star, UserCheck, BarChart2,
  Bell, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Menu, X,
  FileText, CheckSquare, MapPin, TrendingUp, MessageSquare, Award, FolderOpen,
  Building2, GraduationCap, ShieldCheck, UserCog, BookOpen, Eye, ChevronDown,
  Link2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProfileAvatar } from './ui';

// ── Navigation configs ──────────────────────────────────────
const COMPANY_NAV = [
  { key: 'main', label: 'Main', items: [
    { to: '/company/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/company/internships', icon: Briefcase, label: 'Internship Management' },
    { to: '/company/applications', icon: ClipboardList, label: 'Applications' },
    { to: '/company/candidates', icon: Users, label: 'Candidate Review' },
    { to: '/company/assessments', icon: CheckSquare, label: 'Assessments' },
  ]},
  { key: 'manage', label: 'Management', items: [
    { to: '/company/supervisors', icon: UserCheck, label: 'Supervisor Management' },
    { to: '/company/monitoring', icon: TrendingUp, label: 'Internship Monitoring' },
    { to: '/company/reports', icon: BarChart2, label: 'Reports & Analytics' },
  ]},
  { key: 'misc', label: 'Other', items: [
    { to: '/company/notifications', icon: Bell, label: 'Notifications' },
    { to: '/company/settings', icon: Settings, label: 'Profile & Settings' },
  ]},
];

const SUPERVISOR_NAV = [
  { key: 'main', label: 'Main', items: [
    { to: '/supervisor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/supervisor/interns', icon: Users, label: 'My Interns' },
    { to: '/supervisor/tasks', icon: CheckSquare, label: 'Task Management' },
    { to: '/supervisor/submissions', icon: FileText, label: 'Submission Review' },
  ]},
  { key: 'monitor', label: 'Monitoring', items: [
    { to: '/supervisor/attendance', icon: MapPin, label: 'Attendance & Geofencing' },
    { to: '/supervisor/progress', icon: TrendingUp, label: 'Progress Monitoring' },
    { to: '/supervisor/evaluations', icon: Award, label: 'Feedback & Evaluation' },
    { to: '/supervisor/documents', icon: FolderOpen, label: 'Documents' },
  ]},
  { key: 'misc', label: 'Other', items: [
    { to: '/supervisor/notifications', icon: Bell, label: 'Notifications' },
    { to: '/supervisor/settings', icon: Settings, label: 'Profile & Settings' },
  ]},
];

const GUIDE_NAV = [
  { key: 'main', label: 'Main', items: [
    { to: '/guide/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/guide/students', icon: Users, label: 'Assigned Students' },
    { to: '/guide/monitoring', icon: TrendingUp, label: 'Internship Monitoring' },
    { to: '/guide/tasks', icon: CheckSquare, label: 'Tasks & Progress' },
  ]},
  { key: 'review', label: 'Review', items: [
    { to: '/guide/reports', icon: FileText, label: 'Reports & Documents' },
    { to: '/guide/attendance', icon: MapPin, label: 'Attendance Review' },
    { to: '/guide/feedback', icon: MessageSquare, label: 'Guide Feedback' },
    { to: '/guide/evaluations', icon: Award, label: 'Final Evaluation' },
  ]},
  { key: 'misc', label: 'Other', items: [
    { to: '/guide/analytics', icon: BarChart2, label: 'Reports' },
    { to: '/guide/notifications', icon: Bell, label: 'Notifications' },
    { to: '/guide/settings', icon: Settings, label: 'Profile & Settings' },
  ]},
];

const ADMIN_NAV = [
  { key: 'main', label: 'Main', items: [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/students', icon: GraduationCap, label: 'Student Records' },
    { to: '/admin/internships', icon: Briefcase, label: 'Internship Oversight' },
  ]},
  { key: 'manage', label: 'Management', items: [
    { to: '/admin/companies', icon: Building2, label: 'Company Management' },
    { to: '/admin/supervisors', icon: UserCheck, label: 'Supervisor Records' },
    { to: '/admin/guides', icon: BookOpen, label: 'College Guide Management' },
    { to: '/admin/assignments', icon: UserCog, label: 'Guide Assignments' },
    { to: '/admin/users', icon: ShieldCheck, label: 'Users & Roles' },
  ]},
  { key: 'misc', label: 'Analytics', items: [
    { to: '/admin/reports', icon: BarChart2, label: 'Reports & Analytics' },
    { to: '/admin/activity', icon: Eye, label: 'Activity & Notifications' },
    { to: '/admin/settings', icon: Settings, label: 'Profile & Settings' },
  ]},
];

const ROLE_NAV = {
  company: COMPANY_NAV,
  supervisor: SUPERVISOR_NAV,
  guide: GUIDE_NAV,
  admin: ADMIN_NAV,
};

const ROLE_LABELS = {
  company: 'Company Portal',
  supervisor: 'Supervisor Portal',
  guide: 'College Guide Portal',
  admin: 'Admin Portal',
};

const ROLE_COLORS = {
  company: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
  supervisor: 'linear-gradient(135deg, #0EA5E9 0%, #4F46E5 100%)',
  guide: 'linear-gradient(135deg, #16A34A 0%, #0EA5E9 100%)',
  admin: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
};

// ── Sidebar ──────────────────────────────────────────────────
export function Sidebar({ role, collapsed, onToggle, mobileOpen, onMobileClose }) {
  const nav = ROLE_NAV[role] || [];
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Link2 size={18} color="#FFFFFF" />
          </div>
          {!collapsed && (
            <div className="sidebar-logo-text">
              <span className="brand-name">InternBridge</span>
              <span className="role-label">{ROLE_LABELS[role]}</span>
            </div>
          )}
          <button
            className="btn btn-ghost btn-icon btn-sm"
            onClick={onToggle}
            style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex' }}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {nav.map(section => (
            <div key={section.key}>
              {!collapsed && <div className="nav-section-label">{section.label}</div>}
              {section.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  title={collapsed ? item.label : undefined}
                  onClick={onMobileClose}
                >
                  <item.icon size={18} className="nav-icon" />
                  {!collapsed && <span className="nav-label">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <NavLink to={`/${role}/settings`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title={collapsed ? 'Help' : undefined} onClick={onMobileClose}>
            <HelpCircle size={18} className="nav-icon" />
            {!collapsed && <span className="nav-label">Help</span>}
          </NavLink>
          <div className="sidebar-user" onClick={handleLogout} title="Logout">
            <ProfileAvatar initials={currentUser?.avatar} name={currentUser?.name} />
            {!collapsed && (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser?.name}
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <LogOut size={10} />Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// ── Topbar ────────────────────────────────────────────────────
export function Topbar({ pageTitle, breadcrumbs, actions, role, onMenuToggle }) {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="topbar">
      {/* Mobile menu button */}
      <button className="btn btn-ghost btn-icon" onClick={onMenuToggle} style={{ display: 'none', '@media (max-width: 768px)': { display: 'flex' } }}
        id="mobile-menu-btn">
        <Menu size={20} />
      </button>

      <div className="topbar-title">
        {breadcrumbs && <div className="topbar-breadcrumb">{breadcrumbs}</div>}
        <h2>{pageTitle}</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {actions}

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button className="btn btn-ghost btn-icon" onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); }}>
            <Bell size={18} />
            <span style={{
              position: 'absolute', top: 4, right: 4, width: 8, height: 8,
              background: '#4F46E5', borderRadius: '50%', border: '1.5px solid #fff',
            }} />
          </button>
          {notifOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 8,
              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: 320, zIndex: 100,
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontWeight: 700, fontSize: 14 }}>
                Notifications
              </div>
              <div style={{ padding: '8px 0', maxHeight: 300, overflowY: 'auto' }}>
                {[
                  { msg: 'New application received', time: '5m ago' },
                  { msg: 'Assessment completed by a candidate', time: '1h ago' },
                  { msg: 'Internship report submitted', time: '3h ago' },
                ].map((n, i) => (
                  <div key={i} style={{ padding: '10px 16px', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
                    <div style={{ fontWeight: 500 }}>{n.msg}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{n.time}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => { navigate(`/${role}/notifications`); setNotifOpen(false); }}>
                  View All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User avatar / menu */}
        <div style={{ position: 'relative' }}>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}
            onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); }}
          >
            <ProfileAvatar initials={currentUser?.avatar} name={currentUser?.name} size="sm" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>{currentUser?.name}</span>
              <span style={{ fontSize: 11, color: '#64748B' }}>{ROLE_LABELS[role]}</span>
            </div>
            <ChevronDown size={14} color="#64748B" />
          </button>

          {menuOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 6,
              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: 200, zIndex: 100,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{currentUser?.name}</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>{currentUser?.email}</div>
              </div>
              {[
                { label: 'Profile & Settings', icon: Settings, to: `/${role}/settings` },
              ].map(item => (
                <button key={item.label} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', borderRadius: 0, padding: '10px 16px', gap: 10 }}
                  onClick={() => { navigate(item.to); setMenuOpen(false); }}>
                  <item.icon size={15} />{item.label}
                </button>
              ))}
              <div style={{ borderTop: '1px solid #E2E8F0' }}>
                <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', borderRadius: 0, padding: '10px 16px', gap: 10, color: '#DC2626' }}
                  onClick={() => { logout(); navigate('/login'); }}>
                  <LogOut size={15} />Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
