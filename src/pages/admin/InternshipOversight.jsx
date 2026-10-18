import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, SectionHeader, InfoRow, ProgressBar, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { activeInternships, students, internships, companies, users } from '../../data/mockData';
import { Briefcase, Building2, UserCheck, Calendar, MapPin, DollarSign, Eye } from 'lucide-react';

export default function InternshipOversight() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const enriched = activeInternships.map(ai => ({
    ...ai,
    student: students.find(s => s.id === ai.studentId),
    posting: internships.find(i => i.id === ai.internshipId),
    company: companies.find(c => c.id === ai.companyId),
    supervisor: users.find(u => u.id === ai.supervisorId),
    guide: users.find(u => u.id === ai.guideId),
  }));

  const filtered = enriched.filter(item => {
    const matchesSearch = item.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.posting?.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return item.status === 'active';
    if (activeTab === 'completed') return item.status === 'completed';
    return true;
  });

  const tabs = [
    { key: 'all', label: 'All Internships', count: enriched.length },
    { key: 'active', label: 'Currently Active', count: enriched.filter(e => e.status === 'active').length },
    { key: 'completed', label: 'Completed & Certified', count: enriched.filter(e => e.status === 'completed').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Internship Oversight"
        subtitle="Institutional monitoring of all industry engagements, stipend compliance, and graduation requirements"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search student, company, or role..." />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Intern</th>
                <th>Company & Role</th>
                <th>Work Mode & Location</th>
                <th>Stipend</th>
                <th>Curriculum Progress</th>
                <th>Supervisors</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ProfileAvatar name={item.student?.name} initials={item.student?.name?.split(' ').map(n => n[0]).join('')} size="sm" />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>{item.student?.name}</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>{item.student?.rollNo}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13 }}>{item.company?.name}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{item.posting?.title}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, color: '#334155' }}>{item.workMode}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{item.location}</div>
                  </td>
                  <td style={{ fontSize: 13, fontWeight: 600, color: '#16A34A' }}>
                    ₹{item.posting?.stipend?.toLocaleString()}/mo
                  </td>
                  <td style={{ minWidth: 120 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, color: '#4F46E5' }}>{item.progress}%</span>
                    </div>
                    <ProgressBar value={item.progress} height={5} />
                  </td>
                  <td style={{ fontSize: 12, color: '#475569' }}>
                    <div>Industry: <strong>{item.supervisor?.name || 'Unassigned'}</strong></div>
                    <div>Guide: <strong>{item.guide?.name || 'Unassigned'}</strong></div>
                  </td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedRecord(item)}>
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRecord && (
        <Modal
          isOpen={Boolean(selectedRecord)}
          onClose={() => setSelectedRecord(null)}
          title={`Internship Audit Record: ${selectedRecord.student?.name}`}
          size="lg"
          footer={<button className="btn btn-secondary" onClick={() => setSelectedRecord(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, background: '#F8FAFC', padding: 14, borderRadius: 8 }}>
              <InfoRow label="Student" value={selectedRecord.student?.name} />
              <InfoRow label="Company" value={selectedRecord.company?.name} />
              <InfoRow label="Position" value={selectedRecord.posting?.title} />
              <InfoRow label="Monthly Stipend" value={`₹${selectedRecord.posting?.stipend?.toLocaleString()}`} />
              <InfoRow label="Industry Supervisor" value={selectedRecord.supervisor?.name} />
              <InfoRow label="Faculty Guide" value={selectedRecord.guide?.name} />
              <InfoRow label="Duration" value={`${selectedRecord.startDate} to ${selectedRecord.endDate}`} />
              <InfoRow label="Attendance Logged" value={`${selectedRecord.presentDays} of ${selectedRecord.attendanceDays} Days`} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: 12, border: '1px solid #E2E8F0', borderRadius: 6 }}>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Company Supervisor Sign-Off</span>
                <div style={{ marginTop: 4 }}>
                  <StatusBadge status={selectedRecord.supervisorEvalStatus === 'submitted' ? 'submitted_eval' : 'pending_eval'} />
                </div>
              </div>
              <div style={{ padding: 12, border: '1px solid #E2E8F0', borderRadius: 6 }}>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>University Guide Sign-Off</span>
                <div style={{ marginTop: 4 }}>
                  <StatusBadge status={selectedRecord.guideEvalStatus === 'submitted' ? 'submitted_eval' : 'pending_eval'} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
