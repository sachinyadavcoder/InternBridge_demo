import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, FormField, SectionHeader, InfoRow, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { users, activeInternships, getStudentById } from '../../data/mockData';
import { BookOpen, Plus, Mail, Users, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function GuideAdminManagement() {
  const { addToast } = useApp();
  const [guideList, setGuideList] = useState(users.filter(u => u.role === 'guide'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Information Technology');
  const [title, setTitle] = useState('Assistant Professor');

  const filteredGuides = guideList.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuide = (e) => {
    e.preventDefault();
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const newGuide = {
      id: `u-guide-${Date.now()}`,
      role: 'guide',
      name,
      email,
      avatar: initials,
      department,
      title,
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0],
    };
    setGuideList(prev => [newGuide, ...prev]);
    addToast('New college faculty guide onboarded', 'success');
    setIsAddOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="page-container">
      <PageHeader
        title="College Faculty Guide Directory"
        subtitle="Manage academic faculty guides, departmental mentor allocations, and institutional oversight"
        actions={
          <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
            <Plus size={16} /> Onboard Faculty Guide
          </button>
        }
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search faculty guide by name, department, email..." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {filteredGuides.map(guide => {
          const menteeCount = activeInternships.filter(ai => ai.guideId === guide.id).length;

          return (
            <div key={guide.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <ProfileAvatar name={guide.name} initials={guide.avatar} size="md" />
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0F172A' }}>{guide.name}</h4>
                      <div style={{ fontSize: 12.5, color: '#64748B' }}>{guide.title}</div>
                    </div>
                  </div>
                  <StatusBadge status={guide.status} />
                </div>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 12, display: 'grid', gap: 4 }}>
                  <div><strong>Department:</strong> {guide.department}</div>
                  <div><strong>Email:</strong> {guide.email}</div>
                  <div><strong>Onboarded:</strong> {guide.joinedAt}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#EEF2FF', borderRadius: 6, fontSize: 12.5, color: '#3730A3', fontWeight: 600 }}>
                  <span>Assigned Mentees</span>
                  <span>{menteeCount} Students</span>
                </div>
              </div>

              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => setSelectedGuide({ ...guide, menteeCount })}
                >
                  View Mentee Roster
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Details Modal */}
      {selectedGuide && (
        <Modal
          isOpen={Boolean(selectedGuide)}
          onClose={() => setSelectedGuide(null)}
          title={`Faculty Guide: ${selectedGuide.name}`}
          footer={<button className="btn btn-secondary" onClick={() => setSelectedGuide(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 14 }}>
            <InfoRow label="Academic Title" value={selectedGuide.title} />
            <InfoRow label="Department" value={selectedGuide.department} />
            <InfoRow label="Institutional Email" value={selectedGuide.email} />
            <InfoRow label="Status" value={selectedGuide.status} />
            <InfoRow label="Mentee Load" value={`${selectedGuide.menteeCount} Students Assigned`} />
          </div>
        </Modal>
      )}

      {/* Add Guide Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Onboard College Faculty Guide"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddGuide}>Onboard Guide</button>
            </div>
          }
        >
          <form onSubmit={handleAddGuide} style={{ display: 'grid', gap: 12 }}>
            <FormField label="Full Name with Honorific" required>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Prof. Rajesh Khanna" required />
            </FormField>
            <FormField label="College Email" required>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="rajesh@college.edu" required />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormField label="Department" required>
                <select className="form-select" value={department} onChange={e => setDepartment(e.target.value)}>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics & Telecomm">Electronics & Telecomm</option>
                </select>
              </FormField>
              <FormField label="Academic Designation" required>
                <select className="form-select" value={title} onChange={e => setTitle(e.target.value)}>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Professor">Professor</option>
                  <option value="Head of Department">Head of Department</option>
                </select>
              </FormField>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
