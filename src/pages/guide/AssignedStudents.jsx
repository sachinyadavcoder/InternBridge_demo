import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, SectionHeader, InfoRow, ProgressBar, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { activeInternships, students, getStudentById, getInternshipById, getCompanyById, getUserById } from '../../data/mockData';
import { Users, Mail, Phone, ExternalLink, Building2, UserCheck, Calendar, Award } from 'lucide-react';

export default function AssignedStudents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mentees assigned to guide
  const mentees = activeInternships.map(ai => ({
    ...ai,
    student: getStudentById(ai.studentId),
    posting: getInternshipById(ai.internshipId),
    company: getCompanyById(ai.companyId),
    supervisor: getUserById(ai.supervisorId),
  }));

  const filteredMentees = mentees.filter(item => {
    const matchesSearch = item.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.student?.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.company?.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return item.status === 'active';
    if (statusFilter === 'completed') return item.status === 'completed';
    return true;
  });

  const tabs = [
    { key: 'all', label: 'All Mentees', count: mentees.length },
    { key: 'active', label: 'Active Interns', count: mentees.filter(m => m.status === 'active').length },
    { key: 'completed', label: 'Completed', count: mentees.filter(m => m.status === 'completed').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Assigned Students"
        subtitle="Manage academic supervision and track internship placement details for all student mentees"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <Tabs tabs={tabs} active={statusFilter} onChange={setStatusFilter} />
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search student name, roll no, company..." />
        </div>
      </div>

      {filteredMentees.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No students found"
          description="No student mentees match your search query."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 18 }}>
          {filteredMentees.map(item => (
            <div key={item.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <ProfileAvatar name={item.student?.name} initials={item.student?.name?.split(' ').map(n => n[0]).join('')} size="md" />
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0F172A' }}>{item.student?.name}</h4>
                      <div style={{ fontSize: 12.5, color: '#64748B' }}>Roll: {item.student?.rollNo} • CGPA: {item.student?.cgpa}</div>
                    </div>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#1E293B' }}>
                    <Building2 size={14} color="#4F46E5" /> {item.company?.name}
                  </div>
                  <div style={{ color: '#64748B', marginTop: 2, fontSize: 12 }}>
                    Role: {item.posting?.title} ({item.workMode})
                  </div>
                  <div style={{ color: '#64748B', marginTop: 2, fontSize: 12 }}>
                    Industry Supervisor: <strong>{item.supervisor?.name || 'Unassigned'}</strong>
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#475569', marginBottom: 4 }}>
                    <span>Internship Completion</span>
                    <span style={{ fontWeight: 700, color: '#4F46E5' }}>{item.progress}%</span>
                  </div>
                  <ProgressBar value={item.progress} height={6} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => setSelectedStudent(item)}
                >
                  Academic Profile
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => navigate('/guide/monitoring')}
                >
                  Internship Log
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile: ${selectedStudent.student?.name}`}
          size="lg"
          footer={<button className="btn btn-secondary" onClick={() => setSelectedStudent(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#F8FAFC', padding: 16, borderRadius: 8 }}>
              <ProfileAvatar name={selectedStudent.student?.name} initials={selectedStudent.student?.name?.split(' ').map(n => n[0]).join('')} size="lg" />
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{selectedStudent.student?.name}</h3>
                <div style={{ fontSize: 13, color: '#64748B' }}>
                  {selectedStudent.student?.program} • Roll No: {selectedStudent.student?.rollNo}
                </div>
                <div style={{ fontSize: 12.5, color: '#4F46E5', marginTop: 2 }}>
                  CGPA: {selectedStudent.student?.cgpa} / 10.0 • Semester 8
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              <InfoRow label="Email" value={selectedStudent.student?.email} />
              <InfoRow label="Phone" value={selectedStudent.student?.phone} />
              <InfoRow label="Company" value={selectedStudent.company?.name} />
              <InfoRow label="Supervisor" value={selectedStudent.supervisor?.name} />
              <InfoRow label="Start Date" value={selectedStudent.startDate} />
              <InfoRow label="End Date" value={selectedStudent.endDate} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: 6 }}>
                Technical Skills Verified
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {selectedStudent.student?.skills?.map(skill => (
                  <span key={skill} className="badge badge-primary">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: 6 }}>
                Academic Projects
              </label>
              <div style={{ display: 'grid', gap: 8 }}>
                {selectedStudent.student?.projects?.map((proj, idx) => (
                  <div key={idx} style={{ padding: 10, background: '#F1F5F9', borderRadius: 6, fontSize: 13 }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{proj.name} ({proj.tech})</div>
                    <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>{proj.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
