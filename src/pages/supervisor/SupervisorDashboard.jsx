import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, CheckSquare, FileText, MapPin, TrendingUp, Award, Plus, ArrowRight, AlertCircle,
} from 'lucide-react';
import { StatCard, PageHeader, SectionHeader, StatusBadge, ProgressBar, ProfileAvatar } from '../../components/ui';
import {
  activeInternships, tasks, attendanceRecords, getStudentById, getInternshipById,
} from '../../data/mockData';

export default function SupervisorDashboard() {
  const navigate = useNavigate();
  const myInternships = activeInternships.filter(ai => ai.supervisorId === 'u3');
  const myTasks = tasks.filter(t => t.supervisorId === 'u3');
  const pendingReview = myTasks.filter(t => t.status === 'submitted');
  const myAttendance = attendanceRecords.filter(a => myInternships.some(ai => ai.id === a.activeInternshipId));
  const exceptions = myAttendance.filter(a => a.verificationStatus === 'exception' || a.verificationStatus === 'pending');

  return (
    <div>
      <PageHeader
        title="Welcome back, Rahul! 👋"
        subtitle="Supervise your assigned interns and manage their workplace progress."
      />

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Assigned Interns" value={myInternships.length} icon={Users} iconBg="#EEF2FF" onClick={() => navigate('/supervisor/interns')} />
        <StatCard label="Active Internships" value={myInternships.filter(ai => ai.status === 'active').length} icon={TrendingUp} iconBg="#F0F9FF" />
        <StatCard label="Tasks Assigned" value={myTasks.length} icon={CheckSquare} iconBg="#F0FDF4" onClick={() => navigate('/supervisor/tasks')} />
        <StatCard label="Submissions Awaiting Review" value={pendingReview.length} icon={FileText} iconBg="#FFFBEB" onClick={() => navigate('/supervisor/submissions')} />
        <StatCard label="Attendance Exceptions" value={exceptions.length} icon={MapPin} iconBg="#FEF2F2" onClick={() => navigate('/supervisor/attendance')} />
        <StatCard label="Evaluations Pending" value={myInternships.filter(ai => ai.supervisorEvalStatus === 'pending').length} icon={Award} iconBg="#FAF5FF" onClick={() => navigate('/supervisor/evaluations')} />
      </div>

      <div className="grid-2" style={{ gap: 20, marginBottom: 24 }}>
        {/* Task Review Queue */}
        <div className="card">
          <SectionHeader
            title="Task Review Queue"
            action={<button className="btn btn-ghost btn-sm" onClick={() => navigate('/supervisor/submissions')}>View All <ArrowRight size={14} /></button>}
          />
          {pendingReview.length === 0 ? (
            <div style={{ color: '#94A3B8', fontSize: 13 }}>No submissions awaiting review.</div>
          ) : pendingReview.map(t => {
            const student = getStudentById(t.studentId);
            return (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <ProfileAvatar initials={student?.name.split(' ').map(n => n[0]).join('')} name={student?.name} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{student?.name} · Submitted {t.submittedAt}</div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/supervisor/submissions')}>Review</button>
              </div>
            );
          })}
        </div>

        {/* Intern Progress Overview */}
        <div className="card">
          <SectionHeader
            title="Intern Progress Overview"
            action={<button className="btn btn-ghost btn-sm" onClick={() => navigate('/supervisor/interns')}>View All <ArrowRight size={14} /></button>}
          />
          {myInternships.map(ai => {
            const student = getStudentById(ai.studentId);
            const internship = getInternshipById(ai.internshipId);
            const aiTasks = tasks.filter(t => t.activeInternshipId === ai.id);
            return (
              <div key={ai.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <ProfileAvatar initials={student?.name.split(' ').map(n => n[0]).join('')} name={student?.name} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{student?.name}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{internship?.title}</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#4F46E5' }}>{ai.progress}%</span>
                </div>
                <ProgressBar value={ai.progress} />
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                  {aiTasks.filter(t => t.status === 'approved').length}/{aiTasks.length} tasks completed
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <SectionHeader title="Quick Actions" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Assign Task', icon: Plus, color: '#4F46E5', bg: '#EEF2FF', to: '/supervisor/tasks' },
            { label: 'Review Submission', icon: FileText, color: '#0EA5E9', bg: '#F0F9FF', to: '/supervisor/submissions' },
            { label: 'View Attendance', icon: MapPin, color: '#16A34A', bg: '#F0FDF4', to: '/supervisor/attendance' },
            { label: 'Evaluate Intern', icon: Award, color: '#7C3AED', bg: '#FAF5FF', to: '/supervisor/evaluations' },
          ].map(qa => (
            <button key={qa.label} className="card card-hover"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 12px', cursor: 'pointer', border: 'none', background: qa.bg }}
              onClick={() => navigate(qa.to)}>
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
