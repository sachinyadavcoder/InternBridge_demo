// Generic placeholder page used for sections with full content in other portals
import React from 'react';
import { PageHeader, SectionHeader, StatusBadge, ProgressBar, ProfileAvatar, InfoRow } from '../../components/ui';
import { activeInternships, getStudentById, getInternshipById, getUserById, tasks, attendanceRecords } from '../../data/mockData';
import { TrendingUp, CheckSquare, MapPin, Users } from 'lucide-react';

export default function InternshipMonitoring() {
  const companyInternships = activeInternships.filter(ai => ai.companyId === 'c1');

  return (
    <div>
      <PageHeader
        title="Internship Monitoring"
        subtitle="Overview of all active internships and their current progress."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {companyInternships.map(ai => {
          const student = getStudentById(ai.studentId);
          const internship = getInternshipById(ai.internshipId);
          const supervisor = getUserById(ai.supervisorId);
          const guide = getUserById(ai.guideId);
          const aiTasks = tasks.filter(t => t.activeInternshipId === ai.id);
          const completed = aiTasks.filter(t => t.status === 'approved').length;

          return (
            <div key={ai.id} className="card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <ProfileAvatar initials={student?.name.split(' ').map(n => n[0]).join('')} name={student?.name} size="lg" />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{student?.name}</div>
                    <div style={{ fontSize: 13, color: '#64748B' }}>{internship?.title}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{ai.startDate} → {ai.endDate}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <StatusBadge status={ai.status} />
                  <span className="badge badge-blue">{ai.workMode}</span>
                </div>
              </div>

              <div className="grid-4" style={{ gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'Progress', value: `${ai.progress}%`, icon: TrendingUp, color: '#4F46E5' },
                  { label: 'Tasks Completed', value: `${aiTasks.filter(t => t.status === 'approved').length}/${aiTasks.length}`, icon: CheckSquare, color: '#16A34A' },
                  { label: 'Present Days', value: `${ai.presentDays}/${ai.attendanceDays}`, icon: MapPin, color: '#0EA5E9' },
                  { label: 'Attendance', value: `${Math.round((ai.presentDays / Math.max(ai.attendanceDays, 1)) * 100)}%`, icon: Users, color: '#F59E0B' },
                ].map(m => (
                  <div key={m.label} style={{ background: '#F8FAFC', borderRadius: 10, padding: 12, border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <m.icon size={14} color={m.color} />
                      <span style={{ fontSize: 12, color: '#64748B' }}>{m.label}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>

              <ProgressBar value={ai.progress} />

              <div style={{ display: 'flex', gap: 24, marginTop: 12, paddingTop: 12, borderTop: '1px solid #F1F5F9', fontSize: 13 }}>
                <div><span style={{ color: '#64748B' }}>Supervisor: </span><span style={{ fontWeight: 600 }}>{supervisor?.name || 'Unassigned'}</span></div>
                <div><span style={{ color: '#64748B' }}>College Guide: </span><span style={{ fontWeight: 600 }}>{guide?.name || 'Unassigned'}</span></div>
                <div><span style={{ color: '#64748B' }}>Supervisor Eval: </span><StatusBadge status={ai.supervisorEvalStatus === 'submitted' ? 'submitted_eval' : 'pending_eval'} /></div>
                <div><span style={{ color: '#64748B' }}>Guide Eval: </span><StatusBadge status={ai.guideEvalStatus === 'submitted' ? 'submitted_eval' : 'pending_eval'} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
