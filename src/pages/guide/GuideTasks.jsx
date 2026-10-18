import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, FormField, EmptyState, ProfileAvatar,
} from '../../components/ui';
import { tasks, activeInternships, getStudentById, getUserById } from '../../data/mockData';
import { CheckSquare, MessageSquare, Clock, Filter, Eye } from 'lucide-react';

export default function GuideTasks() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'approved') return task.status === 'approved';
    if (activeTab === 'in_progress') return task.status === 'in_progress';
    if (activeTab === 'submitted') return task.status === 'submitted' || task.status === 'revision_required';
    return true;
  });

  const tabs = [
    { key: 'all', label: 'All Tasks', count: tasks.length },
    { key: 'approved', label: 'Approved by Supervisor', count: tasks.filter(t => t.status === 'approved').length },
    { key: 'in_progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length },
    { key: 'submitted', label: 'Under Review', count: tasks.filter(t => t.status === 'submitted' || t.status === 'revision_required').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Tasks & Progress Log"
        subtitle="Review company-assigned tasks, milestone deliveries, and supervisor remarks for all mentees"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks found"
          description="There are no tasks matching the selected filter criteria."
        />
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {filteredTasks.map(task => {
            const student = getStudentById(task.studentId);
            const supervisor = getUserById(task.supervisorId);

            return (
              <div key={task.id} className="card card-hover" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <ProfileAvatar name={student?.name} initials={student?.name?.split(' ').map(n => n[0]).join('')} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{task.title}</span>
                        <StatusBadge status={task.status} />
                        <span className="badge badge-primary">{task.skill}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>
                        Student: <strong style={{ color: '#334155' }}>{student?.name}</strong> • Supervisor: {supervisor?.name || 'Assigned Lead'} • Due: {task.dueDate}
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-secondary btn-sm" onClick={() => setSelectedTask(task)}>
                    <Eye size={14} /> Full Details
                  </button>
                </div>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 6, fontSize: 13, color: '#475569', marginTop: 12 }}>
                  {task.description}
                </div>

                {task.supervisorFeedback && (
                  <div style={{ marginTop: 10, padding: 10, background: '#EEF2FF', borderRadius: 6, fontSize: 12.5, color: '#3730A3' }}>
                    <strong>Supervisor Comment:</strong> {task.supervisorFeedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedTask && (
        <Modal
          isOpen={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          title={`Task: ${selectedTask.title}`}
          footer={<button className="btn btn-secondary" onClick={() => setSelectedTask(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Status & Priority</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <StatusBadge status={selectedTask.status} />
                <span className="badge badge-error">{selectedTask.priority?.toUpperCase()} Priority</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Scope & Requirements</label>
              <div style={{ fontSize: 13.5, color: '#1E293B', marginTop: 4 }}>{selectedTask.description}</div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Timeline</label>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>
                Started: {selectedTask.startDate} • Due: {selectedTask.dueDate} • Submitted: {selectedTask.submittedAt || 'Pending'}
              </div>
            </div>
            {selectedTask.supervisorFeedback && (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Industry Supervisor Feedback</label>
                <div style={{ padding: 12, background: '#EEF2FF', borderRadius: 6, color: '#3730A3', fontSize: 13, marginTop: 4 }}>
                  {selectedTask.supervisorFeedback}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
