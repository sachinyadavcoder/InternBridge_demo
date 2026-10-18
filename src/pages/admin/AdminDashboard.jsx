import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, Briefcase, Building2, BookOpen, Users, UserCheck, TrendingUp,
  Award, ArrowRight, ShieldCheck, Activity, Plus,
} from 'lucide-react';
import { StatCard, PageHeader, SectionHeader, StatusBadge, ProfileAvatar } from '../../components/ui';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  students, companies, internships, activeInternships, users, activityEvents,
  monthlyInternshipData, applicationStatusData,
} from '../../data/mockData';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const totalStudents = students.length;
  const activeCount = activeInternships.filter(i => i.status === 'active').length;
  const companyCount = companies.length;
  const guideCount = users.filter(u => u.role === 'guide').length;

  return (
    <div className="page-container">
      <PageHeader
        title="College Admin & TPO Dashboard"
        subtitle="Institutional internship management, company partnerships, and university accreditation overview"
        actions={
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" onClick={() => navigate('/admin/assignments')}>
              <UserCheck size={16} /> Assign College Guides
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/companies')}>
              <Plus size={16} /> Add Partner Company
            </button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="stats-grid">
        <StatCard
          label="Total Registered Students"
          value={totalStudents}
          icon={GraduationCap}
          iconBg="#EEF2FF"
          trend={12}
          onClick={() => navigate('/admin/students')}
        />
        <StatCard
          label="Active Industry Interns"
          value={activeCount}
          icon={Briefcase}
          iconBg="#ECFDF5"
          onClick={() => navigate('/admin/internships')}
        />
        <StatCard
          label="Corporate Partners"
          value={companyCount}
          icon={Building2}
          iconBg="#FEF3C7"
          trend={25}
          onClick={() => navigate('/admin/companies')}
        />
        <StatCard
          label="College Faculty Guides"
          value={guideCount}
          icon={BookOpen}
          iconBg="#F5F3FF"
          onClick={() => navigate('/admin/guides')}
        />
      </div>

      {/* Main Grid: Charts & Activities */}
      <div className="dashboard-grid" style={{ marginTop: 24 }}>
        <div style={{ display: 'grid', gap: 20 }}>
          {/* Monthly Trend Chart */}
          <div className="card">
            <SectionHeader
              title="Student Placement Velocity (Monthly)"
              action={
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/reports')}>
                  Full Report <ArrowRight size={14} />
                </button>
              }
            />
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyInternshipData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748B' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={val => [`${val} Students`, 'Placed']}
                  />
                  <Line type="monotone" dataKey="students" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Internships Summary */}
          <div className="card">
            <SectionHeader
              title="Current Active Internships"
              action={
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/internships')}>
                  View All <ArrowRight size={14} />
                </button>
              }
            />
            <div style={{ display: 'grid', gap: 10 }}>
              {activeInternships.map(ai => {
                const s = students.find(stud => stud.id === ai.studentId);
                const c = companies.find(comp => comp.id === ai.companyId);
                const i = internships.find(intn => intn.id === ai.internshipId);

                return (
                  <div
                    key={ai.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: 12, background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <ProfileAvatar name={s?.name} initials={s?.name?.split(' ').map(n => n[0]).join('')} size="sm" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{s?.name}</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>{c?.name} • {i?.title}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#4F46E5' }}>{ai.progress}% Done</span>
                      <StatusBadge status={ai.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Institutional Activity Log */}
        <div style={{ display: 'grid', gap: 20 }}>
          <div className="card">
            <SectionHeader
              title="Recent Institutional Audit Log"
              action={
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/activity')}>
                  All Events <ArrowRight size={14} />
                </button>
              }
            />
            <div style={{ display: 'grid', gap: 12 }}>
              {activityEvents.slice(0, 6).map(evt => (
                <div key={evt.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4F46E5', marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#1E293B', lineHeight: 1.4 }}>{evt.message}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                      {evt.createdAt} • by {evt.actor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <SectionHeader title="College Compliance Overview" />
            <div style={{ display: 'grid', gap: 10, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Affiliation / College:</span>
                <strong>GCOE Nashik</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Accreditation Cycle:</span>
                <strong>NAAC A+ / NBA</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Mandatory Internship Compliance:</span>
                <strong style={{ color: '#16A34A' }}>100% On-Track</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: '#64748B' }}>Corporate MOU Count:</span>
                <strong>14 Active MOUs</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
