import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, ProgressBar, InfoRow, EmptyState,
} from '../../components/ui';
import { activeInternships, tasks, attendanceRecords, getStudentById, getInternshipById, getCompanyById, getUserById } from '../../data/mockData';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Calendar, Mail, Building2, UserCheck } from 'lucide-react';

export default function GuideMonitoring() {
  const [activeTab, setActiveTab] = useState('all');

  const internships = activeInternships.map(ai => ({
    ...ai,
    student: getStudentById(ai.studentId),
    posting: getInternshipById(ai.internshipId),
    company: getCompanyById(ai.companyId),
    supervisor: getUserById(ai.supervisorId),
    tasks: tasks.filter(t => t.activeInternshipId === ai.id),
    attendance: attendanceRecords.filter(a => a.activeInternshipId === ai.id),
  }));

  return (
    <div className="page-container">
      <PageHeader
        title="Internship Monitoring"
        subtitle="Continuous institutional tracking of industry engagement, task velocity, and attendance fidelity"
      />

      <div style={{ display: 'grid', gap: 20 }}>
        {internships.map(item => {
          const completedTasks = item.tasks.filter(t => t.status === 'approved').length;
          const totalDays = item.attendanceDays || 1;
          const attRate = Math.round(((item.presentDays || 0) / totalDays) * 100);
          const hasRisk = attRate < 80 || item.progress < 25;

          return (
            <div key={item.id} className="card" style={{ padding: 22, borderLeft: hasRisk ? '4px solid #F59E0B' : '4px solid #10B981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <ProfileAvatar name={item.student?.name} initials={item.student?.name?.split(' ').map(n => n[0]).join('')} size="md" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: '#0F172A' }}>{item.student?.name}</h3>
                      <StatusBadge status={item.status} />
                      {hasRisk && (
                        <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <AlertTriangle size={12} /> Academic Attention
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                      {item.posting?.title} at <strong>{item.company?.name}</strong> • Supervisor: {item.supervisor?.name || 'Pending'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Duration</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1E293B' }}>{item.startDate} to {item.endDate}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginTop: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>Curriculum & Milestone Progress</span>
                  <span style={{ fontWeight: 700, color: '#4F46E5' }}>{item.progress}% Completed</span>
                </div>
                <ProgressBar value={item.progress} height={7} />
              </div>

              {/* Metrics Grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: 12, marginTop: 18, padding: 14, background: '#F8FAFC', borderRadius: 8,
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Attendance Rate</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: attRate >= 80 ? '#16A34A' : '#D97706', marginTop: 2 }}>
                    {attRate}% ({item.presentDays}/{item.attendanceDays} Days)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Industry Tasks</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#4F46E5', marginTop: 2 }}>
                    {completedTasks} / {item.tasks.length} Completed
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Supervisor Review</div>
                  <div style={{ marginTop: 4 }}>
                    <StatusBadge status={item.supervisorEvalStatus === 'submitted' ? 'submitted_eval' : 'pending_eval'} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Guide Review</div>
                  <div style={{ marginTop: 4 }}>
                    <StatusBadge status={item.guideEvalStatus === 'submitted' ? 'submitted_eval' : 'pending_eval'} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
