import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, Tabs, Modal, FormField, EmptyState, ProfileAvatar,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { feedbacks, activeInternships, getStudentById } from '../../data/mockData';
import { MessageSquare, Star, Plus, Send } from 'lucide-react';

export default function GuideFeedback() {
  const { addToast } = useApp();
  const [feedbackList, setFeedbackList] = useState(feedbacks.filter(f => f.authorRole === 'guide'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('s1');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: `fb-guide-${Date.now()}`,
      activeInternshipId: 'ai1',
      authorId: 'u6',
      authorRole: 'guide',
      studentId: selectedStudent,
      type: 'academic',
      content,
      createdAt: new Date().toISOString().split('T')[0],
      rating,
    };
    setFeedbackList(prev => [newFeedback, ...prev]);
    addToast('Academic guidance feedback recorded successfully', 'success');
    setIsModalOpen(false);
    setContent('');
  };

  return (
    <div className="page-container">
      <PageHeader
        title="College Guide Feedback"
        subtitle="Record periodic academic guidance, semester review notes, and curriculum alignment advice for mentees"
        actions={
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Guidance Note
          </button>
        }
      />

      {feedbackList.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No guidance notes recorded"
          description="Click 'Add Guidance Note' to provide academic mentorship."
        />
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {feedbackList.map(item => {
            const student = getStudentById(item.studentId);

            return (
              <div key={item.id} className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <ProfileAvatar name={student?.name} initials={student?.name?.split(' ').map(n => n[0]).join('')} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0F172A' }}>{student?.name}</h4>
                        <span className="badge badge-primary">Academic Mentorship</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 2 }}>
                        Roll No: {student?.rollNo} • Logged on {item.createdAt}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FEF3C7', padding: '4px 10px', borderRadius: 20 }}>
                    <Star size={14} color="#D97706" fill="#D97706" />
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#B45309' }}>{item.rating} / 5</span>
                  </div>
                </div>

                <div style={{ marginTop: 12, fontSize: 13.5, color: '#334155', background: '#F8FAFC', padding: 14, borderRadius: 8, lineHeight: 1.5 }}>
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Feedback Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Record Academic Mentorship Note"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Save Guidance Note</button>
            </div>
          }
        >
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
            <FormField label="Select Mentee" required>
              <select
                className="form-select"
                value={selectedStudent}
                onChange={e => setSelectedStudent(e.target.value)}
              >
                {activeInternships.map(ai => (
                  <option key={ai.studentId} value={ai.studentId}>
                    {getStudentById(ai.studentId)?.name} ({ai.studentId})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Academic Engagement Rating">
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    style={{
                      width: 36, height: 36, borderRadius: 6, border: 'none', cursor: 'pointer',
                      background: rating >= s ? '#FEF3C7' : '#E2E8F0',
                      color: rating >= s ? '#D97706' : '#94A3B8',
                      fontWeight: 700, fontSize: 13,
                    }}
                  >
                    {s}★
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="Mentorship Advice & Academic Review" required>
              <textarea
                className="form-textarea"
                rows={4}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Detail observations on technical progress, final year project integration, and upcoming academic deadlines..."
                required
              />
            </FormField>
          </form>
        </Modal>
      )}
    </div>
  );
}
