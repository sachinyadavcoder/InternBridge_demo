import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, SectionHeader, InfoRow, ProgressBar, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { applications, students, internships, getStudentById, getInternshipById } from '../../data/mockData';
import { Star, CheckCircle, AlertTriangle, ShieldCheck, FileText, Code2, Users, ArrowUpRight } from 'lucide-react';

export default function CandidateReviewPage() {
  const { addToast } = useApp();
  const [appList, setAppList] = useState(applications);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const enriched = appList.map(app => ({
    ...app,
    student: getStudentById(app.studentId),
    posting: getInternshipById(app.internshipId),
  }));

  const filtered = enriched.filter(app => {
    const matchesSearch = app.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.posting?.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'shortlisted') return app.status === 'shortlisted';
    if (activeTab === 'selected') return app.status === 'selected';
    if (activeTab === 'under_review') return app.status === 'under_review' || app.status === 'new';
    return true;
  });

  const handleUpdateStatus = (appId, newStatus) => {
    setAppList(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    addToast(`Candidate status updated to ${newStatus}`, 'success');
    if (selectedApp) {
      setSelectedApp(prev => ({ ...prev, status: newStatus }));
    }
  };

  const tabs = [
    { key: 'all', label: 'All Candidates', count: enriched.length },
    { key: 'shortlisted', label: 'Shortlisted', count: enriched.filter(a => a.status === 'shortlisted').length },
    { key: 'selected', label: 'Selected & Hired', count: enriched.filter(a => a.status === 'selected').length },
    { key: 'under_review', label: 'Under Review', count: enriched.filter(a => a.status === 'under_review' || a.status === 'new').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Candidate Discovery & Verification Review"
        subtitle="Intelligent ML-driven skill gap matching, technical assessment scoring, and evidence verification"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search candidate or role..." />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 18 }}>
        {filtered.map(app => (
          <div key={app.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <ProfileAvatar name={app.student?.name} initials={app.student?.name?.split(' ').map(n => n[0]).join('')} size="md" />
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0F172A' }}>{app.student?.name}</h4>
                    <div style={{ fontSize: 12.5, color: '#64748B' }}>
                      {app.student?.program} • CGPA: {app.student?.cgpa}
                    </div>
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </div>

              {/* Compatibility Score Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                padding: '10px 14px', borderRadius: 8, marginBottom: 14,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={18} color="#4F46E5" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#3730A3' }}>NLP Skill Match</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#4F46E5' }}>
                  {app.compatibilityScore}%
                </div>
              </div>

              <div style={{ fontSize: 13, color: '#334155', marginBottom: 10 }}>
                Applying for: <strong style={{ color: '#0F172A' }}>{app.posting?.title}</strong>
              </div>

              {/* Matched vs Gaps */}
              <div style={{ display: 'grid', gap: 6, marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  <strong style={{ color: '#16A34A' }}>Verified Skills:</strong> {app.matchedSkills?.join(', ')}
                </div>
                {app.skillGaps?.length > 0 && (
                  <div style={{ fontSize: 12, color: '#64748B' }}>
                    <strong style={{ color: '#DC2626' }}>Skill Gaps:</strong> {app.skillGaps?.join(', ')}
                  </div>
                )}
              </div>

              {/* Assessment Score */}
              {app.assessmentScore && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: '#F8FAFC', borderRadius: 6, fontSize: 12.5 }}>
                  <span style={{ color: '#64748B' }}>Assessment Score:</span>
                  <strong style={{ color: '#16A34A' }}>{app.assessmentScore}% (Passed)</strong>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
              <button
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
                onClick={() => setSelectedApp(app)}
              >
                Deep Inspection
              </button>
              {app.status !== 'selected' && (
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleUpdateStatus(app.id, 'selected')}
                >
                  Select Candidate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Deep Inspection Modal */}
      {selectedApp && (
        <Modal
          isOpen={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          title={`Candidate Dossier: ${selectedApp.student?.name}`}
          size="lg"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
              {selectedApp.status !== 'shortlisted' && (
                <button className="btn btn-warning btn-sm" onClick={() => handleUpdateStatus(selectedApp.id, 'shortlisted')}>
                  Shortlist
                </button>
              )}
              {selectedApp.status !== 'selected' && (
                <button className="btn btn-primary btn-sm" onClick={() => handleUpdateStatus(selectedApp.id, 'selected')}>
                  Confirm Selection
                </button>
              )}
            </div>
          }
        >
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#F8FAFC', padding: 14, borderRadius: 8 }}>
              <ProfileAvatar name={selectedApp.student?.name} initials={selectedApp.student?.name?.split(' ').map(n => n[0]).join('')} size="lg" />
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{selectedApp.student?.name}</h3>
                <div style={{ fontSize: 13, color: '#64748B' }}>
                  {selectedApp.student?.program} • CGPA: {selectedApp.student?.cgpa}
                </div>
                <div style={{ fontSize: 12.5, color: '#4F46E5', marginTop: 2 }}>
                  Role: {selectedApp.posting?.title} • Applied: {selectedApp.appliedAt}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              <InfoRow label="Compatibility Match" value={`${selectedApp.compatibilityScore}% ML Match`} />
              <InfoRow label="Assessment Score" value={`${selectedApp.assessmentScore}%`} />
              <InfoRow label="GitHub Portfolio" value={selectedApp.student?.github} />
              <InfoRow label="LeetCode" value={selectedApp.student?.leetcode || 'N/A'} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: 6 }}>
                Matched Skills
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {selectedApp.matchedSkills?.map(s => (
                  <span key={s} className="badge badge-success">{s}</span>
                ))}
              </div>
            </div>

            {selectedApp.skillGaps?.length > 0 && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: 6 }}>
                  Identified Skill Gaps
                </label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selectedApp.skillGaps.map(g => (
                    <span key={g} className="badge badge-error">{g}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedApp.recruiterNotes && (
              <div style={{ background: '#FFFBEB', padding: 12, borderRadius: 6, border: '1px solid #FDE68A', fontSize: 13, color: '#92400E' }}>
                <strong>Recruiter Notes:</strong> {selectedApp.recruiterNotes}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
