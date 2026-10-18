import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, Tabs, Modal, FormField, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { evaluations, activeInternships, getStudentById, getInternshipById } from '../../data/mockData';
import { Award, Star, CheckCircle, FileText } from 'lucide-react';

export default function GuideEvaluations() {
  const { addToast } = useApp();
  const [evalList, setEvalList] = useState(evaluations.filter(e => e.type === 'guide'));
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(null);

  const [ratings, setRatings] = useState({
    learningOutcomes: 4,
    technicalRelevance: 5,
    reportQuality: 4,
    consistencyOfProgress: 4,
    documentationCompleteness: 4,
  });
  const [comments, setComments] = useState('');

  const academicRubrics = {
    learningOutcomes: 'Attainment of Program Learning Outcomes (PLOs)',
    technicalRelevance: 'Curriculum & Specialization Technical Relevance',
    reportQuality: 'Weekly Logbook & Technical Report Rigor',
    consistencyOfProgress: 'Consistency & Adherence to Internship Milestones',
    documentationCompleteness: 'Completeness of Industry Proofs & Deliverables',
  };

  const handleOpenGrading = (internship) => {
    setSelectedInternship(internship);
    setRatings({
      learningOutcomes: 4,
      technicalRelevance: 5,
      reportQuality: 4,
      consistencyOfProgress: 4,
      documentationCompleteness: 4,
    });
    setComments('');
    setIsModalOpen(true);
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!selectedInternship) return;

    const newEval = {
      id: `ev-guide-${Date.now()}`,
      activeInternshipId: selectedInternship.id,
      studentId: selectedInternship.studentId,
      type: 'guide',
      authorId: 'u6',
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      criteria: {
        ...ratings,
        overallAcademic: Math.round(Object.values(ratings).reduce((a, b) => a + b, 0) / 5),
      },
      comments,
    };

    setEvalList(prev => [newEval, ...prev]);
    addToast('Final university academic evaluation and grade submitted successfully', 'success');
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Final Academic Evaluation"
        subtitle="Formal university institutional grading and final semester credit award for completed internships"
      />

      <div className="card" style={{ marginBottom: 24 }}>
        <SectionHeader title="Mentees Academic Grading Pipeline" />
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
                      {posting?.title} • Roll: {student?.rollNo} • Status: {internship.status}
                    </div>
                  </div>
                </div>

                <div>
                  {existingEval ? (
                    <button className="btn btn-secondary btn-sm" onClick={() => setViewModal(existingEval)}>
                      View Academic Grade Sheet
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-sm" onClick={() => handleOpenGrading(internship)}>
                      Evaluate & Award Grade
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submitted Records */}
      <div className="card">
        <SectionHeader title="Final University Grade Records" />
        {evalList.length === 0 ? (
          <EmptyState
            icon={Award}
            title="No evaluations submitted yet"
            description="Grade eligible mentees using the button above."
          />
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {evalList.map(item => {
              const student = getStudentById(item.studentId);

              return (
                <div key={item.id} style={{ padding: 18, border: '1px solid #E2E8F0', borderRadius: 8, background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <Award size={22} color="#4F46E5" />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{student?.name}</div>
                        <div style={{ fontSize: 12.5, color: '#64748B' }}>Graded by College Guide on {item.submittedAt}</div>
                      </div>
                    </div>
                    <div style={{ background: '#DCFCE7', padding: '4px 12px', borderRadius: 20 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>
                        Grade A (Score: {item.criteria?.overallAcademic || 4}/5)
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, marginTop: 14 }}>
                    {Object.entries(item.criteria || {}).filter(([k]) => k !== 'overallAcademic').map(([k, score]) => (
                      <div key={k} style={{ fontSize: 12.5, display: 'flex', justifyContent: 'space-between', background: '#F8FAFC', padding: '6px 10px', borderRadius: 6 }}>
                        <span style={{ color: '#64748B' }}>{academicRubrics[k] || k}:</span>
                        <strong>{score} / 5</strong>
                      </div>
                    ))}
                  </div>

                  {item.comments && (
                    <div style={{ marginTop: 12, fontSize: 13, color: '#334155', background: '#EEF2FF', padding: 12, borderRadius: 6 }}>
                      <strong>Academic Remarks:</strong> {item.comments}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Grade Modal */}
      {isModalOpen && selectedInternship && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Academic Grade Sheet: ${getStudentById(selectedInternship.studentId)?.name}`}
          size="lg"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmitEvaluation}>
                Submit Final Academic Grade
              </button>
            </div>
          }
        >
          <form onSubmit={handleSubmitEvaluation}>
            <p style={{ fontSize: 13.5, color: '#475569', marginBottom: 16 }}>
              Evaluate according to the university final-year industrial internship grading rubrics.
            </p>

            <div style={{ display: 'grid', gap: 12 }}>
              {Object.entries(academicRubrics).map(([k, label]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '10px 14px', borderRadius: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: '#1E293B' }}>{label}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRatings(prev => ({ ...prev, [k]: star }))}
                        style={{
                          width: 32, height: 32, borderRadius: 6, border: 'none', cursor: 'pointer',
                          background: ratings[k] >= star ? '#DCFCE7' : '#E2E8F0',
                          color: ratings[k] >= star ? '#166534' : '#94A3B8',
                          fontWeight: 700, fontSize: 13,
                        }}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <FormField label="Official College Guide Evaluation Remarks" required>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="Record formal assessment of learning outcomes, final presentation performance, and industry readiness..."
                  required
                />
              </FormField>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {viewModal && (
        <Modal
          isOpen={Boolean(viewModal)}
          onClose={() => setViewModal(null)}
          title={`Grade Record: ${getStudentById(viewModal.studentId)?.name}`}
          footer={<button className="btn btn-secondary" onClick={() => setViewModal(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748B' }}>Submitted: {viewModal.submittedAt}</span>
              <span className="badge badge-success">Academic Credit Awarded</span>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {Object.entries(viewModal.criteria || {}).map(([k, val]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#475569' }}>{academicRubrics[k] || k}</span>
                  <strong>{val} / 5</strong>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, padding: 12, background: '#EEF2FF', borderRadius: 8, fontSize: 13, color: '#3730A3' }}>
              <strong>Evaluator Remarks:</strong> {viewModal.comments}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
