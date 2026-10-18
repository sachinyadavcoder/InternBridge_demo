import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, FormField, SectionHeader, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { guideAssignments, students, users, activeInternships } from '../../data/mockData';
import { UserCog, UserCheck, AlertCircle, CheckCircle, Search, RefreshCw } from 'lucide-react';

export default function GuideAssignments() {
  const { addToast } = useApp();
  const [assignments, setAssignments] = useState(guideAssignments);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chosenGuideId, setChosenGuideId] = useState('u6');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const guides = users.filter(u => u.role === 'guide' && u.status === 'active');

  const enriched = assignments.map(ga => ({
    ...ga,
    student: students.find(s => s.id === ga.studentId),
    guide: users.find(u => u.id === ga.guideId),
    activeInt: activeInternships.find(ai => ai.id === ga.activeInternshipId),
  }));

  const filtered = enriched.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unassigned') return item.status === 'unassigned';
    if (activeTab === 'active') return item.status === 'active';
    if (activeTab === 'completed') return item.status === 'completed';
    return true;
  });

  const handleOpenAssign = (assignment) => {
    setSelectedStudent(assignment);
    setChosenGuideId(assignment.guideId || guides[0]?.id || 'u6');
    setIsAssignModalOpen(true);
  };

  const handleSaveAssignment = () => {
    if (!selectedStudent) return;
    setAssignments(prev => prev.map(ga => {
      if (ga.id === selectedStudent.id) {
        return {
          ...ga,
          guideId: chosenGuideId,
          assignedAt: new Date().toISOString().split('T')[0],
          status: 'active',
        };
      }
      return ga;
    }));

    const guideName = guides.find(g => g.id === chosenGuideId)?.name;
    addToast(`Assigned ${guideName} to ${selectedStudent.student?.name}`, 'success');
    setIsAssignModalOpen(false);
    setSelectedStudent(null);
  };

  const tabs = [
    { key: 'all', label: 'All Allocations', count: enriched.length },
    { key: 'unassigned', label: 'Pending Assignment', count: enriched.filter(e => e.status === 'unassigned').length },
    { key: 'active', label: 'Active Mentorship', count: enriched.filter(e => e.status === 'active').length },
    { key: 'completed', label: 'Completed', count: enriched.filter(e => e.status === 'completed').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="College Faculty Guide Assignments"
        subtitle="Allocate faculty guides to students for academic mentorship, logbook reviews, and grade evaluations"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Department & CGPA</th>
                <th>Internship Status</th>
                <th>Assigned Faculty Guide</th>
                <th>Allocation Date</th>
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
                        <div style={{ fontSize: 12, color: '#64748B' }}>{item.student?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>{item.student?.rollNo}</td>
                  <td style={{ fontSize: 13, color: '#334155' }}>
                    {item.student?.department} • <strong>{item.student?.cgpa} CGPA</strong>
                  </td>
                  <td>
                    {item.activeInt ? (
                      <span className="badge badge-success">Placed ({item.activeInt.workMode})</span>
                    ) : (
                      <span className="badge badge-gray">In Pipeline</span>
                    )}
                  </td>
                  <td style={{ fontSize: 13 }}>
                    {item.guide ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#4F46E5' }}>
                        <UserCheck size={14} /> {item.guide.name}
                      </div>
                    ) : (
                      <span style={{ color: '#DC2626', fontWeight: 600, fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <AlertCircle size={13} /> Unassigned
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: 13, color: '#64748B' }}>{item.assignedAt || '—'}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className={`btn btn-sm ${item.status === 'unassigned' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleOpenAssign(item)}
                    >
                      {item.status === 'unassigned' ? 'Assign Guide' : 'Reassign'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {isAssignModalOpen && selectedStudent && (
        <Modal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          title={`Allocate College Guide: ${selectedStudent.student?.name}`}
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveAssignment}>Save Allocation</button>
            </div>
          }
        >
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 13 }}>
              <div><strong>Student:</strong> {selectedStudent.student?.name} ({selectedStudent.student?.rollNo})</div>
              <div><strong>Program:</strong> {selectedStudent.student?.program}</div>
              <div><strong>Department:</strong> {selectedStudent.student?.department}</div>
            </div>

            <FormField label="Select College Faculty Guide" required>
              <select
                className="form-select"
                value={chosenGuideId}
                onChange={e => setChosenGuideId(e.target.value)}
              >
                {guides.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.title} ({g.department})
                  </option>
                ))}
              </select>
            </FormField>

            <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>
              Assigning a faculty guide notifies the faculty member and links student logbook submissions and academic evaluations to their portal.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
