import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, ProgressBar, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { activeInternships, tasks, attendanceRecords, getStudentById, getInternshipById } from '../../data/mockData';
import { TrendingUp, CheckSquare, Clock, MapPin, Calendar, Award, ChevronRight } from 'lucide-react';

export default function ProgressMonitoringPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <PageHeader
        title="Progress Monitoring"
        subtitle="Track learning milestones, weekly task completion rates, and attendance health for supervised interns"
      />

      <div style={{ display: 'grid', gap: 20 }}>
        {activeInternships.map(internship => {
          const student = getStudentById(internship.studentId);
          const posting = getInternshipById(internship.internshipId);
          const internTasks = tasks.filter(t => t.activeInternshipId === internship.id);
          const internAttendance = attendanceRecords.filter(a => a.activeInternshipId === internship.id);

          const completedTasks = internTasks.filter(t => t.status === 'approved').length;
          const pendingTasks = internTasks.filter(t => t.status === 'submitted').length;
          const inProgressTasks = internTasks.filter(t => t.status === 'in_progress').length;

          const totalDays = internship.attendanceDays || 1;
          const attendancePercent = Math.round(((internship.presentDays || 0) / totalDays) * 100);

          return (
            <div key={internship.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <ProfileAvatar name={student?.name} initials={student?.name?.split(' ').map(n => n[0]).join('')} size="lg" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#0F172A' }}>{student?.name}</h3>
                      <StatusBadge status={internship.status} />
                      <span className="badge badge-gray">{internship.workMode}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                      {posting?.title} • {student?.program} • Roll: {student?.rollNo}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate('/supervisor/tasks')}
                  >
                    Manage Tasks
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate('/supervisor/evaluations')}
                  >
                    Submit Evaluation
                  </button>
                </div>
              </div>

              {/* Progress and KPIs */}
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>Curriculum & Milestone Progress</span>
                  <span style={{ fontWeight: 700, color: '#4F46E5' }}>{internship.progress}% Complete</span>
                </div>
                <ProgressBar value={internship.progress} height={8} />
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 14, marginTop: 20, padding: 16, background: '#F8FAFC', borderRadius: 8,
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Completed Tasks</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#16A34A', marginTop: 2 }}>
                    {completedTasks} / {internTasks.length}
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>{pendingTasks} awaiting review</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Attendance Rate</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: attendancePercent >= 80 ? '#16A34A' : '#D97706', marginTop: 2 }}>
                    {attendancePercent}%
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>{internship.presentDays} of {internship.attendanceDays} days logged</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Duration & Dates</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#334155', marginTop: 4 }}>
                    {internship.startDate}
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>to {internship.endDate}</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Supervisor Evaluation</div>
                  <div style={{ marginTop: 4 }}>
                    <StatusBadge status={internship.supervisorEvalStatus === 'submitted' ? 'submitted_eval' : 'pending_eval'} />
                  </div>
                </div>
              </div>

              {/* Task list preview */}
              <div style={{ marginTop: 18 }}>
                <SectionHeader title="Current Tasks in Pipeline" />
                <div style={{ display: 'grid', gap: 8 }}>
                  {internTasks.slice(0, 3).map(task => (
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CheckSquare size={16} color={task.status === 'approved' ? '#16A34A' : '#64748B'} />
                        <span style={{ fontWeight: 600, color: '#1E293B' }}>{task.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ color: '#64748B', fontSize: 12 }}>Due: {task.dueDate}</span>
                        <StatusBadge status={task.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
