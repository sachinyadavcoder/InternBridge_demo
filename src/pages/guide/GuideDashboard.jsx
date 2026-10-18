import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, CheckSquare, FileText, Award, Calendar, AlertCircle, ArrowRight, BookOpen, Clock,
} from 'lucide-react';
import { StatCard, PageHeader, SectionHeader, StatusBadge, ProfileAvatar, ProgressBar } from '../../components/ui';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { activeInternships, students, getStudentById, getInternshipById, getCompanyById, tasks, documents } from '../../data/mockData';

export default function GuideDashboard() {
  const navigate = useNavigate();

  // Guide u6 (Prof. Anjali Patil) assigned active internships
  const guideInternships = activeInternships.filter(ai => ai.guideId === 'u6' || ai.status === 'active');
  const pendingReports = documents.filter(d => d.status === 'pending_review');

  const chartData = [
    { name: 'Aditya Sharma', progress: 40, attendance: 93 },
    { name: 'Sonal Desai', progress: 35, attendance: 91 },
    { name: 'Tanvi Nair', progress: 100, attendance: 97 },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="College Guide Dashboard"
        subtitle="Academic mentorship, student internship monitoring, and institutional evaluation overview"
        actions={
          <button className="btn btn-primary" onClick={() => navigate('/guide/evaluations')}>
            <Award size={16} /> Final Academic Evaluation
          </button>
        }
      />

      {/* Stats Row */}
      <div className="stats-grid">
        <StatCard
          label="Assigned Mentees"
          value={guideInternships.length}
          icon={Users}
          iconBg="#EEF2FF"
          onClick={() => navigate('/guide/students')}
        />
        <StatCard
          label="Active Internships"
          value={guideInternships.filter(i => i.status === 'active').length}
          icon={TrendingUp}
          iconBg="#ECFDF5"
          onClick={() => navigate('/guide/monitoring')}
        />
        <StatCard
          label="Pending Report Reviews"
          value={pendingReports.length}
          icon={FileText}
          iconBg="#FEF3C7"
          onClick={() => navigate('/guide/reports')}
        />
        <StatCard
          label="Completed Evaluations"
          value="1"
          icon={Award}
          iconBg="#F5F3FF"
          onClick={() => navigate('/guide/evaluations')}
        />
      </div>

      {/* Main Grid: Student Progress & Pending Tasks */}
      <div className="dashboard-grid" style={{ marginTop: 24 }}>
        <div style={{ display: 'grid', gap: 20 }}>
          {/* Progress Chart */}
          <div className="card">
            <SectionHeader
              title="Mentee Progress & Attendance Overview"
              action={
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/guide/analytics')}>
                  Detailed Analytics <ArrowRight size={14} />
                </button>
              }
            />
            <div style={{ height: 260, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748B' }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(val, name) => [`${val}%`, name === 'progress' ? 'Syllabus Progress' : 'Attendance Rate']}
                  />
                  <Bar dataKey="progress" name="progress" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="attendance" name="attendance" fill="#10B981" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mentee List Card */}
          <div className="card">
            <SectionHeader
              title="Active Mentees in Industry"
              action={
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/guide/students')}>
                  View All <ArrowRight size={14} />
                </button>
              }
            />
            <div style={{ display: 'grid', gap: 12 }}>
              {guideInternships.map(internship => {
                const student = getStudentById(internship.studentId);
                const posting = getInternshipById(internship.internshipId);
                const comp = getCompanyById(posting?.companyId);

                return (
                  <div
                    key={internship.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: 14, background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <ProfileAvatar name={student?.name} initials={student?.name?.split(' ').map(n => n[0]).join('')} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{student?.name}</span>
                          <StatusBadge status={internship.status} />
                        </div>
                        <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 2 }}>
                          {comp?.name} • {posting?.title} • Roll: {student?.rollNo}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#4F46E5' }}>{internship.progress}% Progress</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{internship.presentDays} Days Present</div>
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate('/guide/monitoring')}
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Pending Actions & Academic Guidelines */}
        <div style={{ display: 'grid', gap: 20 }}>
          {/* Action Queue */}
          <div className="card">
            <SectionHeader title="Academic Review Queue" />
            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ padding: 12, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400E', fontWeight: 600, fontSize: 13.5 }}>
                  <AlertCircle size={16} /> 1 Week 4 Report Awaiting Sign-off
                </div>
                <p style={{ margin: '4px 0 8px', fontSize: 12, color: '#78350F' }}>
                  Aditya Sharma submitted Week 4 technical logbook for verification.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/guide/reports')}>
                  Review Report
                </button>
              </div>

              <div style={{ padding: 12, background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3730A3', fontWeight: 600, fontSize: 13.5 }}>
                  <BookOpen size={16} /> Mid-Semester Guide Feedback Due
                </div>
                <p style={{ margin: '4px 0 8px', fontSize: 12, color: '#312E81' }}>
                  Provide qualitative guidance notes for Sonal Desai and Aditya Sharma.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/guide/feedback')}>
                  Provide Feedback
                </button>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="card">
            <SectionHeader title="Mentorship Quick Links" />
            <div style={{ display: 'grid', gap: 8 }}>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start' }}
                onClick={() => navigate('/guide/attendance')}
              >
                <Clock size={16} color="#4F46E5" /> Verify Student Attendance Logs
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start' }}
                onClick={() => navigate('/guide/tasks')}
              >
                <CheckSquare size={16} color="#10B981" /> View Industry Tasks & Deliverables
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start' }}
                onClick={() => navigate('/guide/evaluations')}
              >
                <Award size={16} color="#8B5CF6" /> University Grade Sheet & Rubric
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
