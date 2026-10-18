import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, SectionHeader, InfoRow, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { users, companies, activeInternships, getStudentById } from '../../data/mockData';
import { UserCheck, Building2, Mail, Phone, Users, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SupervisorRecords() {
  const { addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);

  const supervisors = users.filter(u => u.role === 'supervisor');

  const filtered = supervisors.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Industry Supervisor Directory"
        subtitle="Master directory of corporate technical leads and supervisors overseeing student interns"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search industry supervisors..." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {filtered.map(sup => {
          const comp = companies.find(c => c.id === sup.company);
          const assignedInterns = activeInternships.filter(ai => ai.supervisorId === sup.id);

          return (
            <div key={sup.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <ProfileAvatar name={sup.name} initials={sup.avatar} size="md" />
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0F172A' }}>{sup.name}</h4>
                      <div style={{ fontSize: 12.5, color: '#64748B' }}>{sup.title}</div>
                    </div>
                  </div>
                  <StatusBadge status={sup.status} />
                </div>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 12, display: 'grid', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#1E293B' }}>
                    <Building2 size={14} color="#4F46E5" /> {comp?.name || 'Corporate Partner'}
                  </div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>Email: {sup.email}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>Phone: {sup.phone}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#EEF2FF', borderRadius: 6, fontSize: 12.5, color: '#3730A3', fontWeight: 600 }}>
                  <span>Assigned Interns</span>
                  <span>{assignedInterns.length} Students</span>
                </div>
              </div>

              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => setSelectedSupervisor({ ...sup, comp, assignedInterns })}
                >
                  View Supervised Interns
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedSupervisor && (
        <Modal
          isOpen={Boolean(selectedSupervisor)}
          onClose={() => setSelectedSupervisor(null)}
          title={`Supervisor Record: ${selectedSupervisor.name}`}
          footer={<button className="btn btn-secondary" onClick={() => setSelectedSupervisor(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 14 }}>
            <InfoRow label="Designation" value={selectedSupervisor.title} />
            <InfoRow label="Corporate Employer" value={selectedSupervisor.comp?.name} />
            <InfoRow label="Email Address" value={selectedSupervisor.email} />
            <InfoRow label="Direct Phone" value={selectedSupervisor.phone} />
            <InfoRow label="Onboarded On" value={selectedSupervisor.joinedAt} />

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: 8 }}>
                Currently Supervised Interns
              </label>
              {selectedSupervisor.assignedInterns?.length === 0 ? (
                <div style={{ fontSize: 13, color: '#94A3B8' }}>No interns assigned yet.</div>
              ) : (
                <div style={{ display: 'grid', gap: 8 }}>
                  {selectedSupervisor.assignedInterns.map(ai => {
                    const student = getStudentById(ai.studentId);
                    return (
                      <div key={ai.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, background: '#F8FAFC', borderRadius: 6, fontSize: 13 }}>
                        <div>
                          <strong>{student?.name}</strong> ({student?.rollNo})
                        </div>
                        <StatusBadge status={ai.status} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
