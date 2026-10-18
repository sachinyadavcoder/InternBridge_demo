import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, Tabs, Modal, FormField, EmptyState, ConfirmDialog,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { tasks, activeInternships, getStudentById, getActiveInternshipById } from '../../data/mockData';
import { CheckCircle, AlertTriangle, Eye, Clock, MessageSquare, ExternalLink, Filter } from 'lucide-react';

export default function SubmissionReview() {
  const { addToast } = useApp();
  const [taskList, setTaskList] = useState(tasks);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [actionType, setActionType] = useState(null); // 'approve' | 'revise'
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Filter tasks that have submissions or were reviewed
  const submittedTasks = taskList.filter(t => t.submittedAt || t.status === 'submitted' || t.status === 'revision_required' || t.status === 'approved');

  const filteredTasks = submittedTasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return task.status === 'submitted';
    if (activeTab === 'approved') return task.status === 'approved';
    if (activeTab === 'revision') return task.status === 'revision_required';
    return true;
  });

  const handleReviewAction = (task, type) => {
    setSelectedTask(task);
    setActionType(type);
    setFeedbackText(task.supervisorFeedback || '');
    setIsConfirmOpen(true);
  };

  const confirmAction = () => {
    if (!selectedTask || !actionType) return;
    const newStatus = actionType === 'approve' ? 'approved' : 'revision_required';
    setTaskList(prev => prev.map(t => {
      if (t.id === selectedTask.id) {
        return {
          ...t,
          status: newStatus,
          reviewedAt: new Date().toISOString().split('T')[0],
          supervisorFeedback: feedbackText,
        };
      }
      return t;
    }));

    addToast(
      actionType === 'approve' ? 'Task submission approved successfully' : 'Revision requested from intern',
      actionType === 'approve' ? 'success' : 'warning'
    );
    setIsConfirmOpen(false);
    setSelectedTask(null);
  };

  const tabs = [
    { key: 'all', label: 'All Submissions', count: submittedTasks.length },
    { key: 'pending', label: 'Needs Review', count: submittedTasks.filter(t => t.status === 'submitted').length },
    { key: 'approved', label: 'Approved', count: submittedTasks.filter(t => t.status === 'approved').length },
    { key: 'revision', label: 'Revision Required', count: submittedTasks.filter(t => t.status === 'revision_required').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Submission Review"
        subtitle="Evaluate and provide structured feedback on work submitted by assigned interns"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={CheckCircle}
          title="No submissions found"
          description="There are currently no intern submissions matching this filter."
        />
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredTasks.map(task => {
            const student = getStudentById(task.studentId);
            const activeInt = getActiveInternshipById(task.activeInternshipId);

            return (
              <div key={task.id} className="card card-hover" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <ProfileAvatar name={student?.name} initials={student?.name?.split(' ').map(n => n[0]).join('')} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{task.title}</span>
                        <StatusBadge status={task.status} />
                        <span className={`badge ${task.priority === 'high' ? 'badge-error' : 'badge-primary'}`}>
                          {task.priority?.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                        Submitted by <strong style={{ color: '#334155' }}>{student?.name}</strong> • Roll: {student?.rollNo} • Due: {task.dueDate}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    {task.status === 'submitted' && (
                      <>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#D97706', borderColor: '#FDE68A' }}
                          onClick={() => handleReviewAction(task, 'revise')}
                        >
                          Request Revision
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleReviewAction(task, 'approve')}
                        >
                          Approve Submission
                        </button>
                      </>
                    )}
                    {task.status !== 'submitted' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => { setSelectedTask(task); setFeedbackText(task.supervisorFeedback || ''); }}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 8, marginTop: 14, fontSize: 13.5, color: '#475569' }}>
                  <strong>Task Scope:</strong> {task.description}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 12.5, color: '#64748B', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <span>Submitted: {task.submittedAt || '—'}</span>
                    <span>Reviewed: {task.reviewedAt || 'Pending'}</span>
                    <span>Skill Area: <strong>{task.skill}</strong></span>
                  </div>
                  {task.supervisorFeedback && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4F46E5', fontWeight: 500 }}>
                      <MessageSquare size={14} /> Feedback provided
                    </div>
                  )}
                </div>

                {task.supervisorFeedback && (
                  <div style={{ marginTop: 12, padding: 10, background: '#EEF2FF', borderRadius: 6, fontSize: 13, color: '#3730A3' }}>
                    <strong>Supervisor Feedback:</strong> {task.supervisorFeedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {isConfirmOpen && selectedTask && (
        <Modal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title={actionType === 'approve' ? 'Approve Task Submission' : 'Request Task Revision'}
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
              <button
                className={`btn ${actionType === 'approve' ? 'btn-primary' : 'btn-warning'}`}
                onClick={confirmAction}
              >
                {actionType === 'approve' ? 'Approve' : 'Send Revision Request'}
              </button>
            </div>
          }
        >
          <div>
            <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
              {actionType === 'approve'
                ? `You are approving the submission for "${selectedTask.title}". You can leave commendations or notes for the student.`
                : `You are requesting revisions for "${selectedTask.title}". Please detail what specific fixes or additions are needed.`}
            </p>
            <FormField label="Supervisor Feedback / Review Comments" required={actionType === 'revise'}>
              <textarea
                className="form-textarea"
                rows={4}
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder={actionType === 'approve' ? 'Great work! Ready for production deployment...' : 'Please fix responsiveness and add unit test coverage before resubmission...'}
              />
            </FormField>
          </div>
        </Modal>
      )}

      {/* Detail Modal */}
      {selectedTask && !isConfirmOpen && (
        <Modal
          isOpen={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          title={`Task Submission: ${selectedTask.title}`}
          footer={<button className="btn btn-secondary" onClick={() => setSelectedTask(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Status</label>
              <div><StatusBadge status={selectedTask.status} /></div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Description</label>
              <div style={{ fontSize: 13.5, color: '#1E293B', marginTop: 2 }}>{selectedTask.description}</div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Submission Date</label>
              <div style={{ fontSize: 13.5, color: '#1E293B', marginTop: 2 }}>{selectedTask.submittedAt || '—'}</div>
            </div>
            {selectedTask.supervisorFeedback && (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Supervisor Feedback</label>
                <div style={{ fontSize: 13.5, color: '#3730A3', background: '#EEF2FF', padding: 12, borderRadius: 6, marginTop: 4 }}>
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
