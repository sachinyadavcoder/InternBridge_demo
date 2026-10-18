import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, ClipboardList, Users, Star, CheckSquare, TrendingUp,
  Plus, ArrowRight, Clock, AlertCircle,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { StatCard, PageHeader, SectionHeader, StatusBadge, ProfileAvatar } from '../../components/ui';
import {
  internships, applications, students, assessments,
  applicationActivityData, applicationStatusData,
  getStudentById, getInternshipById,
} from '../../data/mockData';

const COLORS = ['#4F46E5', '#0EA5E9', '#F59E0B', '#16A34A', '#DC2626'];

export default function CompanyDashboard() {
  const navigate = useNavigate();

  const published = internships.filter(i => i.companyId === 'c1' && i.status === 'published');
  const allApps = applications.filter(a => a.companyId === 'c1');
  const shortlisted = allApps.filter(a => a.status === 'shortlisted');
  const selected = allApps.filter(a => a.status === 'selected');
  const pendingAssessment = allApps.filter(a => a.assessmentStatus === 'pending');

  const recentApps = [...allApps]
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 5);

  const upcomingDeadlines = internships
    .filter(i => i.companyId === 'c1' && i.status === 'published' && i.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const quickActions = [
    { label: 'Create Internship', icon: Plus, color: '#4F46E5', bg: '#EEF2FF', to: '/company/internships' },
    { label: 'Review Applications', icon: ClipboardList, color: '#0EA5E9', bg: '#F0F9FF', to: '/company/applications' },
    { label: 'Create Assessment', icon: CheckSquare, color: '#16A34A', bg: '#F0FDF4', to: '/company/assessments' },
    { label: 'View Candidates', icon: Users, color: '#7C3AED', bg: '#FAF5FF', to: '/company/candidates' },
  ];

  return (
    <div>
      <PageHeader
        title="Welcome back, TechSolutions! 👋"
        subtitle="Manage your internship opportunities and applicants from one place."
        actions={
          <button className="btn btn-primary" onClick={() => navigate('/company/internships')}>
            <Plus size={16} />Create Internship
          </button>
        }
      />

      {/* Stats */}
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Total Postings" value={internships.filter(i => i.companyId === 'c1').length} icon={Briefcase} iconBg="#EEF2FF" />
        <StatCard label="Active Openings" value={published.length} icon={TrendingUp} iconBg="#F0F9FF" />
        <StatCard label="Total Applications" value={allApps.length} icon={ClipboardList} iconBg="#FFFBEB" />
        <StatCard label="Shortlisted" value={shortlisted.length} icon={Star} iconBg="#FAF5FF" />
        <StatCard label="Selected Interns" value={selected.length} icon={Users} iconBg="#F0FDF4" />
        <StatCard label="Assessments Pending Review" value={pendingAssessment.length} icon={CheckSquare} iconBg="#FEF2F2" />
      </div>

      <div className="grid-2" style={{ marginBottom: 24, gap: 20 }}>
        {/* Application Activity Chart */}
        <div className="card">
          <SectionHeader title="Application Activity (Monthly)" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={applicationActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="applications" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Application Status Distribution */}
        <div className="card">
          <SectionHeader title="Application Status" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={applicationStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                  {applicationStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              {applicationStatusData.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ color: '#64748B' }}>{d.name}</span>
                  <span style={{ fontWeight: 700, color: '#0F172A', marginLeft: 'auto' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 20, marginBottom: 24 }}>
        {/* Recent Applications */}
        <div className="card">
          <SectionHeader
            title="Recent Applications"
            action={<button className="btn btn-ghost btn-sm" onClick={() => navigate('/company/applications')}>View All <ArrowRight size={14} /></button>}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentApps.map(app => {
              const student = getStudentById(app.studentId);
              const internship = getInternshipById(app.internshipId);
              if (!student || !internship) return null;
              return (
                <div
                  key={app.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
                  onClick={() => navigate('/company/applications')}
                >
                  <ProfileAvatar initials={student.name.split(' ').map(n => n[0]).join('')} name={student.name} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.name}</div>
                    <div style={{ fontSize: 12, color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{internship.title}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
                    <StatusBadge status={app.status} />
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>{app.appliedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Openings + Deadlines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ flex: 1 }}>
            <SectionHeader
              title="Active Openings"
              action={<button className="btn btn-ghost btn-sm" onClick={() => navigate('/company/internships')}>View All <ArrowRight size={14} /></button>}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {published.slice(0, 3).map(i => (
                <div key={i.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{i.title}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{i.domain} · {i.workMode} · {i.vacancies} seat{i.vacancies > 1 ? 's' : ''}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#4F46E5' }}>{i.applications}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>applicants</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ flex: 1 }}>
            <SectionHeader title="Upcoming Deadlines" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {upcomingDeadlines.map(i => (
                <div key={i.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={16} color="#F59E0B" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{i.title}</div>
                    <div style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>Deadline: {i.deadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <SectionHeader title="Quick Actions" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {quickActions.map(qa => (
            <button
              key={qa.label}
              className="card card-hover"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 12px', cursor: 'pointer', border: 'none', background: qa.bg }}
              onClick={() => navigate(qa.to)}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: qa.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <qa.icon size={20} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: qa.color, textAlign: 'center' }}>{qa.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
