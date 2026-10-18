import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, Tabs, Modal, FormField, EmptyState, ProfileAvatar,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { documents, getStudentById } from '../../data/mockData';
import { FileText, Eye, CheckCircle, Download, FileCheck } from 'lucide-react';

export default function GuideReports() {
  const { addToast } = useApp();
  const [docList, setDocList] = useState(documents.filter(d => d.type === 'progress_report'));
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [reviewNote, setReviewNote] = useState('');

  const filteredDocs = docList.filter(d => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return d.status === 'pending_review';
    if (activeTab === 'reviewed') return d.status === 'reviewed';
    return true;
  });

  const handleApproveReport = () => {
    if (!selectedDoc) return;
    setDocList(prev => prev.map(d => d.id === selectedDoc.id ? { ...d, status: 'reviewed' } : d));
    addToast('Progress report verified and academic credit recorded', 'success');
    setSelectedDoc(null);
  };

  const tabs = [
    { key: 'all', label: 'All Logbooks & Reports', count: docList.length },
    { key: 'pending', label: 'Pending Academic Sign-Off', count: docList.filter(d => d.status === 'pending_review').length },
    { key: 'reviewed', label: 'Endorsed', count: docList.filter(d => d.status === 'reviewed').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Reports & Weekly Logbooks"
        subtitle="Review, endorse, and sign off on weekly student internship progress reports and learning logs"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {filteredDocs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No reports found"
          description="There are no student reports matching this category."
        />
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {filteredDocs.map(doc => {
            const student = getStudentById(doc.studentId);

            return (
              <div key={doc.id} className="card card-hover" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={22} color="#4F46E5" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{doc.title}</span>
                        <StatusBadge status={doc.status} />
                      </div>
                      <div style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>
                        Student: <strong style={{ color: '#334155' }}>{student?.name}</strong> • Roll: {student?.rollNo} • Uploaded: {doc.uploadedAt}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => { setSelectedDoc(doc); setReviewNote(''); }}
                    >
                      <Eye size={14} /> Review & Sign Off
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {selectedDoc && (
        <Modal
          isOpen={Boolean(selectedDoc)}
          onClose={() => setSelectedDoc(null)}
          title={`Review Logbook: ${selectedDoc.title}`}
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedDoc(null)}>Close</button>
              {selectedDoc.status === 'pending_review' && (
                <button className="btn btn-primary" onClick={handleApproveReport}>
                  <FileCheck size={16} /> Sign Off & Approve
                </button>
              )}
            </div>
          }
        >
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ padding: 16, background: '#F8FAFC', borderRadius: 8, textAlign: 'center', border: '1px dashed #CBD5E1' }}>
              <FileText size={40} color="#4F46E5" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 700, color: '#0F172A' }}>{selectedDoc.title}</div>
              <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 2 }}>
                Submitted by {getStudentById(selectedDoc.studentId)?.name} on {selectedDoc.uploadedAt}
              </div>
            </div>

            <FormField label="College Guide Academic Remarks">
              <textarea
                className="form-textarea"
                rows={3}
                value={reviewNote}
                onChange={e => setReviewNote(e.target.value)}
                placeholder="Logbook verified. Satisfactory coverage of weekly milestones and industry learning objectives..."
              />
            </FormField>
          </div>
        </Modal>
      )}
    </div>
  );
}
