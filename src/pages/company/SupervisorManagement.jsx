import React, { useState } from 'react';
import { PageHeader, StatusBadge, SectionHeader, ProfileAvatar, Modal, FormField, EmptyState } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { users, activeInternships, getStudentById, getInternshipById, companies } from '../../data/mockData';
import { UserCheck, Plus, UserPlus, ArrowRight } from 'lucide-react';

export default function SupervisorManagement() {
  const { addToast } = useApp();
  const supervisors = users.filter(u => u.role === 'supervisor' && u.company === 'c1');
  const [selected, setSelected] = useState(null);
  const [showAssign, setShowAssign] = useState(false);
  const [assignForm, setAssignForm] = useState({ supervisorId: '', activeInternshipId: '' });

  const getInternsBySupervisor = (supId) =>
    activeInternships.filter(ai => ai.supervisorId === supId && ai.status === 'active');

  const handleAssign = () => {
    addToast('Supervisor assigned successfully. This reflects in the Supervisor Portal.', 'success');
    setShowAssign(false);
    setAssignForm({ supervisorId: '', activeInternshipId: '' });
  };

  return (
    <div>
      <PageHeader
        title="Supervisor Management"
        subtitle="Manage company supervisors and their intern assignments."
        actions={<button className="btn btn-primary" onClick={() => setShowAssign(true)}><Plus size={16} />Assign Supervisor</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {supervisors.map(sup => {
          const interns = getInternsBySupervisor(sup.id);
          return (
            <div key={sup.id} className="card card-hover" onClick={() => setSelected(sup)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <ProfileAvatar initials={sup.avatar} name={sup.name} size="lg" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{sup.name}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{sup.title}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>{sup.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#4F46E5' }}>{interns.length}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>Active Interns</div>
                </div>
                <div style={{ flex: 1 }}>
                  {interns.length > 0 ? interns.map(ai => {
                    const student = getStudentById(ai.studentId);
                    return (
                      <div key={ai.id} style={{ fontSize: 12, color: '#475569', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A', flexShrink: 0 }} />
                        {student?.name}
                      </div>
                    );
                  }) : (
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>No active interns assigned.</div>
                  )}
                </div>
              </div>
              <StatusBadge status={sup.status} />
            </div>
          );
        })}
      </div>

      {/* Assign modal */}
      <Modal isOpen={showAssign} onClose={() => setShowAssign(false)} title="Assign Supervisor to Intern"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setShowAssign(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAssign}>Assign Supervisor</button>
        </>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FormField label="Select Supervisor" required>
            <select className="form-select" value={assignForm.supervisorId} onChange={e => setAssignForm(f => ({ ...f, supervisorId: e.target.value }))}>
              <option value="">— Choose supervisor —</option>
              {supervisors.map(s => <option key={s.id} value={s.id}>{s.name} · {s.title}</option>)}
            </select>
          </FormField>
          <FormField label="Active Internship / Intern" required>
            <select className="form-select" value={assignForm.activeInternshipId} onChange={e => setAssignForm(f => ({ ...f, activeInternshipId: e.target.value }))}>
              <option value="">— Choose internship record —</option>
              {activeInternships.filter(ai => ai.companyId === 'c1').map(ai => {
                const student = getStudentById(ai.studentId);
                const intern = getInternshipById(ai.internshipId);
                return <option key={ai.id} value={ai.id}>{student?.name} – {intern?.title}</option>;
              })}
            </select>
          </FormField>
          <div style={{ background: '#F0F9FF', borderRadius: 8, padding: 12, fontSize: 13, color: '#0369A1' }}>
            The assigned supervisor will see this intern in their Supervisor Portal immediately.
          </div>
        </div>
      </Modal>

      {/* Supervisor detail modal */}
      {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected.name} size="lg"
          footer={<button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <ProfileAvatar initials={selected.avatar} name={selected.name} size="xl" />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</div>
                <div style={{ color: '#64748B' }}>{selected.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{selected.email}</div>
              </div>
            </div>
            <SectionHeader title="Assigned Interns" />
            {getInternsBySupervisor(selected.id).map(ai => {
              const student = getStudentById(ai.studentId);
              const internship = getInternshipById(ai.internshipId);
              return (
                <div key={ai.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <ProfileAvatar initials={student?.name.split(' ').map(n => n[0]).join('')} name={student?.name} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{student?.name}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{internship?.title}</div>
                  </div>
                  <StatusBadge status={ai.status} />
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </div>
  );
}
