import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, Tabs, Modal, FormField, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { evaluations, activeInternships, getStudentById, getInternshipById } from '../../data/mockData';
import { Award, Star, CheckCircle, FileText, Send, User } from 'lucide-react';

export default function SupervisorEvaluationsPage() {
  const { addToast } = useApp();
  const [evalList, setEvalList] = useState(evaluations.filter(e => e.type === 'supervisor'));
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewEvalModal, setViewEvalModal] = useState(null);

  // Form state
  const [ratings, setRatings] = useState({
    technicalPerformance: 4,
    qualityOfWork: 4,
    taskCompletion: 4,
    problemSolving: 4,
    communication: 4,
    professionalConduct: 5,
  });
  const [comments, setComments] = useState('');

  const criteriaLabels = {
    technicalPerformance: 'Technical & Domain Knowledge',
    qualityOfWork: 'Quality & Accuracy of Deliverables',
    taskCompletion: 'Punctuality & Task Completion',
    problemSolving: 'Analytical & Problem-Solving Ability',
    communication: 'Teamwork & Communication Skills',
    professionalConduct: 'Professional Ethics & Conduct',
  };

  const handleOpenEvaluation = (internship) => {
    setSelectedInternship(internship);
    setRatings({
      technicalPerformance: 4,
      qualityOfWork: 4,
      taskCompletion: 4,
      problemSolving: 4,
      communication: 4,
      professionalConduct: 5,
    });
    setComments('');
    setIsModalOpen(true);
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!selectedInternship) return;

    const newEval = {
      id: `ev-sup-${Date.now()}`,
      activeInternshipId: selectedInternship.id,
      studentId: selectedInternship.studentId,
      type: 'supervisor',
      authorId: 'u3',
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      criteria: { ...ratings, overall: Math.round(Object.values(ratings).reduce((a, b) => a + b, 0) / 6) },
      comments,
    };

    setEvalList(prev => [newEval, ...prev]);
    addToast('Formal internship performance evaluation submitted successfully', 'success');
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Feedback & Evaluation"
        subtitle="Submit structured mid-term and final performance assessments for assigned interns"
      />

      {/* Intern Evaluation Pipeline */}
      <div className="card" style={{ marginBottom: 24 }}>
        <SectionHeader title="Internship Cohort & Evaluation Status" />
        <div style={{ display: 'grid', gap: 14 }}>
          {activeInternships.map(internship => {
            const student = getStudentById(internship.studentId);
            const posting = getInternshipById(internship.internshipId);
            const existingEval = evalList.find(e => e.activeInternshipId === internship.id);

            return (
              <div
                key={internship.id}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 16, background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <ProfileAvatar name={student?.name} initials={student?.name?.split(' ').map(n => n[0]).join('')} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{student?.name}</span>
                      <StatusBadge status={existingEval ? 'submitted_eval' : 'pending_eval'} />
                    </div>
                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                      {posting?.title} • Roll: {student?.rollNo} • CGPA: {student?.cgpa}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  {existingEval ? (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setViewEvalModal(existingEval)}
                    >
                      View Submitted Evaluation
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpenEvaluation(internship)}
                    >
                      Conduct Evaluation
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submitted evaluations history */}
      <div className="card">
        <SectionHeader title="Submitted Evaluations Record" />
        {evalList.length === 0 ? (
          <EmptyState
            icon={Award}
            title="No evaluations submitted yet"
            description="Complete evaluations for active interns using the cohort list above."
          />
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {evalList.map(item => {
              const student = getStudentById(item.studentId);
              return (
                <div key={item.id} style={{ padding: 18, border: '1px solid #E2E8F0', borderRadius: 8, background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <Award size={22} color="#4F46E5" />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{student?.name}</div>
                        <div style={{ fontSize: 12.5, color: '#64748B' }}>Submitted: {item.submittedAt}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FEF3C7', padding: '4px 10px', borderRadius: 20 }}>
                      <Star size={14} color="#D97706" fill="#D97706" />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#B45309' }}>
                        {item.criteria?.overall || 4} / 5 Rating
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginTop: 14 }}>
                    {Object.entries(item.criteria || {}).filter(([k]) => k !== 'overall').map(([k, score]) => (
                      <div key={k} style={{ fontSize: 12.5, display: 'flex', justifyContent: 'space-between', background: '#F8FAFC', padding: '6px 10px', borderRadius: 6 }}>
                        <span style={{ color: '#64748B' }}>{criteriaLabels[k] || k}:</span>
                        <strong style={{ color: '#0F172A' }}>{score} / 5</strong>
                      </div>
                    ))}
                  </div>

                  {item.comments && (
                    <div style={{ marginTop: 12, fontSize: 13, color: '#334155', background: '#EEF2FF', padding: 12, borderRadius: 6 }}>
                      <strong>Comments:</strong> {item.comments}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Conduct Evaluation Modal */}
      {isModalOpen && selectedInternship && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Supervisor Evaluation: ${getStudentById(selectedInternship.studentId)?.name}`}
          size="lg"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmitEvaluation}>
                Submit Official Evaluation
              </button>
            </div>
          }
        >
          <form onSubmit={handleSubmitEvaluation}>
            <p style={{ fontSize: 13.5, color: '#475569', marginBottom: 16 }}>
              Rate the intern across the standardized 6-factor industry competence rubric (1 = Needs Significant Improvement, 5 = Outstanding).
            </p>

            <div style={{ display: 'grid', gap: 14 }}>
              {Object.entries(criteriaLabels).map(([key, label]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '10px 14px', borderRadius: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: '#1E293B' }}>{label}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRatings(prev => ({ ...prev, [key]: star }))}
                        style={{
                          width: 32, height: 32, borderRadius: 6, border: 'none', cursor: 'pointer',
                          background: ratings[key] >= star ? '#FEF3C7' : '#E2E8F0',
                          color: ratings[key] >= star ? '#D97706' : '#94A3B8',
                          fontWeight: 700, fontSize: 13,
                        }}
                      >
                        {star}★
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <FormField label="Comprehensive Feedback & Qualitative Comments" required>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="Detail the intern's strengths, areas of growth, work ethics, and readiness for full-time conversion..."
                  required
                />
              </FormField>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {viewEvalModal && (
        <Modal
          isOpen={Boolean(viewEvalModal)}
          onClose={() => setViewEvalModal(null)}
          title={`Evaluation Record: ${getStudentById(viewEvalModal.studentId)?.name}`}
          footer={<button className="btn btn-secondary" onClick={() => setViewEvalModal(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748B' }}>Submitted on {viewEvalModal.submittedAt}</span>
              <span className="badge badge-success">Approved & Logged</span>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {Object.entries(viewEvalModal.criteria || {}).map(([k, val]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#475569' }}>{criteriaLabels[k] || k}</span>
                  <strong>{val} / 5</strong>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, padding: 12, background: '#EEF2FF', borderRadius: 8, fontSize: 13, color: '#3730A3' }}>
              <strong>Evaluator Remarks:</strong> {viewEvalModal.comments}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
