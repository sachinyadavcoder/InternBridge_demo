import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, SectionHeader, InfoRow, ProgressBar,
  ProfileAvatar, ConfirmDialog, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import {
  applications as initialApps, students, internships, getStudentById, getInternshipById,
} from '../../data/mockData';
import {
  User, Briefcase, Star, CheckSquare, FileText, ArrowLeft, ChevronRight,
  GitBranch, Code, AlertCircle, CheckCircle, BookOpen,
} from 'lucide-react';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'selected', label: 'Selected' },
  { key: 'rejected', label: 'Rejected' },
];

function CompatibilityBadge({ score }) {
  const color = score >= 90 ? '#16A34A' : score >= 75 ? '#F59E0B' : '#DC2626';
  const bg = score >= 90 ? '#F0FDF4' : score >= 75 ? '#FFFBEB' : '#FEF2F2';
  return (
    <span style={{ background: bg, color, fontWeight: 700, fontSize: 13, padding: '3px 10px', borderRadius: 9999 }}>
      {score}% match
    </span>
  );
}

function CandidateDetailModal({ app, onClose, onAction }) {
  const student = getStudentById(app?.studentId);
  const internship = getInternshipById(app?.internshipId);
  const [note, setNote] = useState(app?.recruiterNotes || '');
  const [tab, setTab] = useState('profile');
  const { addToast } = useApp();
  const [confirmAction, setConfirmAction] = useState(null);

  if (!app || !student || !internship) return null;

  const skillTabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'skills', label: 'Skills & Assessment' },
    { key: 'evidence', label: 'Evidence' },
    { key: 'timeline', label: 'Timeline' },
  ];

  const doAction = (action) => {
    onAction(app.id, action, note);
    addToast(`Application ${action === 'selected' ? 'selected' : action === 'rejected' ? 'rejected' : 'shortlisted'}.`, action === 'rejected' ? 'warning' : 'success');
    setConfirmAction(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-xl" style={{ maxHeight: '92vh' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}><ArrowLeft size={16} /></button>
            <ProfileAvatar initials={student.name.split(' ').map(n => n[0]).join('')} name={student.name} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{student.name}</h3>
              <div style={{ fontSize: 12, color: '#64748B' }}>{internship.title}</div>
            </div>
            <CompatibilityBadge score={app.compatibilityScore} />
          </div>
          <StatusBadge status={app.status} />
        </div>

        <div style={{ padding: '0 24px', borderBottom: '1px solid #E2E8F0' }}>
          <Tabs tabs={skillTabs} active={tab} onChange={setTab} />
        </div>

        <div className="modal-body">
          {tab === 'profile' && (
            <div className="grid-2" style={{ gap: 20 }}>
              <div>
                <SectionHeader title="Student Information" />
                <InfoRow label="Full Name" value={student.name} />
                <InfoRow label="Roll No." value={student.rollNo} />
                <InfoRow label="Program" value={student.program} />
                <InfoRow label="College" value={student.college} />
                <InfoRow label="Year" value={`Year ${student.year}`} />
                <InfoRow label="CGPA" value={student.cgpa} />
                <InfoRow label="Email" value={student.email} />
              </div>
              <div>
                <SectionHeader title="Projects" />
                {student.projects.map((p, i) => (
                  <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{p.tech}</div>
                    <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>{p.desc}</div>
                  </div>
                ))}
                <SectionHeader title="Certifications" />
                {student.certifications.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <CheckCircle size={14} color="#16A34A" />
                    <span style={{ fontSize: 12 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <CheckCircle size={18} color="#16A34A" />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Matched Skills</span>
                  <span className="badge badge-success">{app.matchedSkills.length} skills</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {app.matchedSkills.map(s => <span key={s} className="badge badge-success">{s}</span>)}
                </div>
              </div>
              {app.skillGaps.length > 0 && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <AlertCircle size={18} color="#F59E0B" />
                    <span style={{ fontWeight: 700, fontSize: 14 }}>Skill Gaps</span>
                    <span className="badge badge-warning">{app.skillGaps.length} skills</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {app.skillGaps.map(s => <span key={s} className="badge badge-warning">{s}</span>)}
                  </div>
                  <div style={{ fontSize: 12, color: '#92400E', marginTop: 8 }}>
                    Skill gap analysis is simulated. Verify with the actual candidate during interview.
                  </div>
                </div>
              )}

              <div className="card" style={{ background: '#F8FAFC' }}>
                <SectionHeader title="Assessment Results" />
                {app.assessmentStatus === 'pending' ? (
                  <div style={{ fontSize: 13, color: '#F59E0B' }}>Assessment not yet completed by candidate.</div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 32, fontWeight: 800, color: app.assessmentScore >= 70 ? '#16A34A' : '#DC2626' }}>{app.assessmentScore}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>Assessment Score</div>
                        <StatusBadge status={app.assessmentStatus} />
                      </div>
                    </div>
                    <ProgressBar value={app.assessmentScore} color={app.assessmentScore >= 70 ? '#16A34A' : '#DC2626'} height={8} />
                  </div>
                )}
              </div>

              <div className="card" style={{ background: '#F8FAFC' }}>
                <SectionHeader title="Compatibility Score (Simulated)" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
                  <div style={{ fontSize: 40, fontWeight: 800, color: '#4F46E5' }}>{app.compatibilityScore}%</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>
                    Based on skill match, project relevance, and assessment performance.
                    <br /><strong style={{ color: '#F59E0B' }}>Simulated for prototype.</strong> Not a production ML prediction.
                  </div>
                </div>
                <ProgressBar value={app.compatibilityScore} color="#4F46E5" height={8} />
              </div>

              <div className="card" style={{ background: '#F8FAFC' }}>
                <SectionHeader title="Recruiter Notes" />
                <textarea className="form-textarea" value={note} onChange={e => setNote(e.target.value)} placeholder="Add notes about this candidate..." rows="3" />
              </div>
            </div>
          )}

          {tab === 'evidence' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ background: '#F8FAFC' }}>
                <SectionHeader title="GitHub Profile" />
                {student.github ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <GitBranch size={20} color="#0F172A" />
                    <a href={`https://${student.github}`} target="_blank" rel="noreferrer" style={{ color: '#4F46E5', fontSize: 13, fontWeight: 600 }}>{student.github}</a>
                    <span className="badge badge-gray">External link — data not automatically fetched in prototype</span>
                  </div>
                ) : <div style={{ fontSize: 13, color: '#94A3B8' }}>No GitHub profile provided.</div>}
              </div>
              <div className="card" style={{ background: '#F8FAFC' }}>
                <SectionHeader title="LeetCode / Coding Platform" />
                {student.leetcode ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Code size={20} color="#F59E0B" />
                    <a href={`https://${student.leetcode}`} target="_blank" rel="noreferrer" style={{ color: '#4F46E5', fontSize: 13, fontWeight: 600 }}>{student.leetcode}</a>
                    <span className="badge badge-gray">External link — not live integrated</span>
                  </div>
                ) : <div style={{ fontSize: 13, color: '#94A3B8' }}>No coding platform profile provided.</div>}
              </div>
              <div className="card" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <div style={{ fontSize: 13, color: '#92400E' }}>
                  <strong>Important:</strong> External evidence (GitHub, LeetCode) is shown as-declared by the candidate. No automated fetching or scoring is performed in this prototype. Future versions of InternBridge will include live integrations.
                </div>
              </div>
            </div>
          )}

          {tab === 'timeline' && (
            <div>
              <SectionHeader title="Application Timeline" />
              <div style={{ position: 'relative', paddingLeft: 20 }}>
                <div style={{ position: 'absolute', left: 7, top: 0, bottom: 0, width: 2, background: '#E2E8F0' }} />
                {app.timeline.map((ev, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: 16 }}>
                    <div style={{ position: 'absolute', left: -13, width: 10, height: 10, borderRadius: '50%', background: '#4F46E5', border: '2px solid #fff', top: 3 }} />
                    <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{ev.event}</div>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{ev.date} · {ev.actor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button className="btn btn-secondary" onClick={onClose}>← Back to Applications</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {app.status !== 'rejected' && (
              <button className="btn btn-danger btn-sm" onClick={() => setConfirmAction('rejected')}>Reject</button>
            )}
            {app.status !== 'shortlisted' && app.status !== 'selected' && (
              <button className="btn btn-outline btn-sm" onClick={() => doAction('shortlisted')}>Shortlist</button>
            )}
            {app.status !== 'selected' && (
              <button className="btn btn-success btn-sm" onClick={() => setConfirmAction('selected')}>Select</button>
            )}
          </div>
        </div>

        <ConfirmDialog
          isOpen={!!confirmAction}
          onClose={() => setConfirmAction(null)}
          onConfirm={() => doAction(confirmAction)}
          title={confirmAction === 'selected' ? 'Select Candidate' : 'Reject Application'}
          message={confirmAction === 'selected'
            ? `Are you sure you want to select ${student.name} for this internship? This is a human decision — InternBridge provides decision support only.`
            : `Reject ${student.name}'s application? This cannot be undone.`}
          confirmLabel={confirmAction === 'selected' ? 'Confirm Selection' : 'Confirm Rejection'}
          danger={confirmAction === 'rejected'}
        />
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  const [apps, setApps] = useState(initialApps.filter(a => a.companyId === 'c1'));
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const filtered = apps.filter(a => {
    const student = getStudentById(a.studentId);
    const matchTab = tab === 'all' || a.status === tab;
    const matchSearch = !search || student?.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const tabCounts = TABS.reduce((acc, t) => {
    acc[t.key] = t.key === 'all' ? apps.length : apps.filter(a => a.status === t.key).length;
    return acc;
  }, {});

  const handleAction = (appId, status, notes) => {
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status, recruiterNotes: notes } : a));
  };

  return (
    <div>
      <PageHeader
        title="Applications"
        subtitle="Review and manage all internship applications."
      />

      <div className="card" style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by applicant name..." style={{ maxWidth: 260 }} />
          <select className="form-select" style={{ width: 200 }}>
            <option value="">All Internships</option>
            {internships.filter(i => i.companyId === 'c1').map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
          </select>
          <select className="form-select" style={{ width: 160 }}>
            <option value="">All Assessment Results</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="card">
        <Tabs tabs={TABS.map(t => ({ ...t, count: tabCounts[t.key] }))} active={tab} onChange={setTab} />
        {filtered.length === 0 ? (
          <EmptyState icon={User} title="No applications found" description="Try adjusting the filter or tab." />
        ) : (
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Internship</th>
                  <th>Applied</th>
                  <th>Match</th>
                  <th>Assessment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(app => {
                  const student = getStudentById(app.studentId);
                  const internship = getInternshipById(app.internshipId);
                  if (!student) return null;
                  return (
                    <tr key={app.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <ProfileAvatar initials={student.name.split(' ').map(n => n[0]).join('')} name={student.name} size="sm" />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{student.name}</div>
                            <div style={{ fontSize: 11, color: '#64748B' }}>{student.program}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: 13 }}>{internship?.title}</td>
                      <td style={{ fontSize: 12, color: '#64748B' }}>{app.appliedAt}</td>
                      <td><CompatibilityBadge score={app.compatibilityScore} /></td>
                      <td>
                        {app.assessmentStatus === 'pending'
                          ? <span className="badge badge-warning">Pending</span>
                          : <span className={`badge ${app.assessmentStatus === 'passed' ? 'badge-success' : 'badge-error'}`}>
                            {app.assessmentScore} · {app.assessmentStatus}
                          </span>
                        }
                      </td>
                      <td><StatusBadge status={app.status} /></td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => setSelectedApp(app)}>
                          Review <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedApp && (
        <CandidateDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}
