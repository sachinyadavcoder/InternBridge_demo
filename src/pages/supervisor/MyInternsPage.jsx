import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, Tabs, SectionHeader, ProfileAvatar, ProgressBar, InfoRow, Modal, FormField, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import {
  activeInternships, tasks, attendanceRecords, feedbacks, documents,
  getStudentById, getInternshipById, getUserById,
} from '../../data/mockData';
import { User, CheckSquare, FileText, MapPin, MessageSquare, Award, FolderOpen, ArrowLeft } from 'lucide-react';

const DETAIL_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'submissions', label: 'Submissions' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'documents', label: 'Documents' },
  { key: 'feedback', label: 'Feedback' },
];

function InternDetail({ ai, onBack }) {
  const [tab, setTab] = useState('overview');
  const student = getStudentById(ai.studentId);
  const internship = getInternshipById(ai.internshipId);
  const guide = getUserById(ai.guideId);
  const aiTasks = tasks.filter(t => t.activeInternshipId === ai.id);
  const aiAttendance = attendanceRecords.filter(a => a.activeInternshipId === ai.id);
  const aiFeedbacks = feedbacks.filter(f => f.activeInternshipId === ai.id);
  const aiDocs = documents.filter(d => d.activeInternshipId === ai.id);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn btn-ghost btn-icon" onClick={onBack}><ArrowLeft size={18} /></button>
        <ProfileAvatar initials={student?.name.split(' ').map(n => n[0]).join('')} name={student?.name} size="lg" />
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>{student?.name}</h1>
          <div style={{ color: '#64748B', fontSize: 13 }}>{internship?.title} · {internship?.companyId === 'c1' ? 'TechSolutions' : ''}</div>
        </div>
        <StatusBadge status={ai.status} />
      </div>

      <div className="tabs-container" style={{ marginBottom: 20 }}>
        {DETAIL_TABS.map(t => (
          <div key={t.key} className={`tab-item ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</div>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid-2" style={{ gap: 20 }}>
          <div className="card">
            <SectionHeader title="Student Info" />
            <InfoRow label="Full Name" value={student?.name} />
            <InfoRow label="Program" value={student?.program} />
            <InfoRow label="College" value={student?.college} />
            <InfoRow label="College Guide" value={guide?.name || 'Unassigned'} />
            <InfoRow label="Start Date" value={ai.startDate} />
            <InfoRow label="End Date" value={ai.endDate} />
            <InfoRow label="Work Mode" value={ai.workMode} />
            <InfoRow label="Location" value={ai.location} />
          </div>
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <SectionHeader title="Overall Progress" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#4F46E5' }}>{ai.progress}%</div>
                <div style={{ fontSize: 13, color: '#64748B' }}>Task-based estimate</div>
              </div>
              <ProgressBar value={ai.progress} color="#4F46E5" height={8} />
            </div>
            <div className="card">
              <SectionHeader title="Task Summary" />
              <div className="grid-2" style={{ gap: 8 }}>
                {[
                  { label: 'Total', value: aiTasks.length, color: '#4F46E5' },
                  { label: 'Completed', value: aiTasks.filter(t => t.status === 'approved').length, color: '#16A34A' },
                  { label: 'In Progress', value: aiTasks.filter(t => t.status === 'in_progress').length, color: '#0EA5E9' },
                  { label: 'Overdue', value: aiTasks.filter(t => t.status === 'overdue').length, color: '#DC2626' },
                ].map(m => (
                  <div key={m.label} style={{ textAlign: 'center', padding: 10, background: '#F8FAFC', borderRadius: 8 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'tasks' && (
        <div className="card">
          <SectionHeader title="Assigned Tasks" />
          {aiTasks.length === 0 ? <EmptyState icon={CheckSquare} title="No tasks yet" /> : (
            <div className="table-container" style={{ border: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>Task</th><th>Skill</th><th>Priority</th><th>Due Date</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {aiTasks.map(t => (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{t.description.slice(0, 60)}…</div>
                      </td>
                      <td><span className="badge badge-gray">{t.skill}</span></td>
                      <td><span className={`badge ${t.priority === 'high' ? 'badge-error' : t.priority === 'medium' ? 'badge-warning' : 'badge-gray'}`}>{t.priority}</span></td>
                      <td style={{ fontSize: 13, color: '#64748B' }}>{t.dueDate}</td>
                      <td><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'submissions' && (
        <div className="card">
          <SectionHeader title="Submitted Work" />
          {aiTasks.filter(t => t.submittedAt).length === 0 ? <EmptyState icon={FileText} title="No submissions yet" /> : (
            aiTasks.filter(t => t.submittedAt).map(t => (
              <div key={t.id} style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>Submitted: {t.submittedAt} · Reviewed: {t.reviewedAt || 'Pending'}</div>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
                {t.supervisorFeedback && (
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 6, background: '#F8FAFC', borderRadius: 6, padding: '6px 10px' }}>
                    <strong>Feedback:</strong> {t.supervisorFeedback}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'attendance' && (
        <div className="card">
          <SectionHeader title="Attendance Records" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Present', value: ai.presentDays, color: '#16A34A' },
              { label: 'Absent', value: ai.absentDays, color: '#DC2626' },
              { label: 'Exceptions', value: ai.exceptionDays, color: '#F59E0B' },
            ].map(m => (
              <div key={m.label} style={{ textAlign: 'center', padding: 12, background: '#F8FAFC', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{m.label}</div>
              </div>
            ))}
          </div>
          {aiAttendance.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <StatusBadge status={a.status} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.date}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{a.checkIn && `In: ${a.checkIn}`}{a.checkOut && ` · Out: ${a.checkOut}`}</div>
                {a.notes && <div style={{ fontSize: 12, color: '#F59E0B' }}>{a.notes}</div>}
              </div>
              <span className={`badge ${a.verificationStatus === 'verified' ? 'badge-success' : a.verificationStatus === 'exception' || a.verificationStatus === 'pending' ? 'badge-warning' : 'badge-gray'}`}>
                {a.verificationStatus}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === 'documents' && (
        <div className="card">
          <SectionHeader title="Documents" />
          {aiDocs.length === 0 ? <EmptyState icon={FolderOpen} title="No documents uploaded" /> : (
            aiDocs.map(d => (
              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={16} color="#4F46E5" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Uploaded: {d.uploadedAt}</div>
                </div>
                <StatusBadge status={d.status} />
                <button className="btn btn-ghost btn-sm" style={{ color: '#4F46E5' }}>Preview</button>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'feedback' && (
        <div className="card">
          <SectionHeader title="Feedback History" />
          {aiFeedbacks.length === 0 ? <EmptyState icon={MessageSquare} title="No feedback recorded" /> : (
            aiFeedbacks.map(f => (
              <div key={f.id} style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className={`badge ${f.authorRole === 'supervisor' ? 'badge-primary' : 'badge-success'}`}>
                    {f.authorRole === 'supervisor' ? 'Supervisor' : 'College Guide'}
                  </span>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>{f.createdAt}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 13, color: '#F59E0B' }}>{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>
                </div>
                <p style={{ fontSize: 13, color: '#475569' }}>{f.content}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function MyInternsPage() {
  const myInternships = activeInternships.filter(ai => ai.supervisorId === 'u3');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  if (selected) return <InternDetail ai={selected} onBack={() => setSelected(null)} />;

  const filtered = myInternships.filter(ai => {
    const student = getStudentById(ai.studentId);
    return !search || student?.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <PageHeader
        title="My Interns"
        subtitle="View and manage your assigned interns."
      />
      <div style={{ marginBottom: 20 }}>
        <input className="form-input" style={{ maxWidth: 280 }} placeholder="Search by intern name..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(ai => {
          const student = getStudentById(ai.studentId);
          const internship = getInternshipById(ai.internshipId);
          const guide = getUserById(ai.guideId);
          const aiTasks = tasks.filter(t => t.activeInternshipId === ai.id);
          return (
            <div key={ai.id} className="card card-hover" onClick={() => setSelected(ai)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <ProfileAvatar initials={student?.name.split(' ').map(n => n[0]).join('')} name={student?.name} size="lg" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{student?.name}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{internship?.title}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>College Guide: {guide?.name || 'Unassigned'}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>{ai.startDate} → {ai.endDate} · {ai.workMode}</div>
                </div>
                <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#4F46E5' }}>{ai.progress}%</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Progress</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#16A34A' }}>{aiTasks.filter(t => t.status === 'approved').length}/{aiTasks.length}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Tasks</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#F59E0B' }}>{ai.presentDays}/{ai.attendanceDays}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Present</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <ProgressBar value={ai.progress} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
