import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, Tabs, Modal, FormField, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { documents, activeInternships, getStudentById } from '../../data/mockData';
import { FileText, Download, CheckCircle, Upload, Eye, FileCheck } from 'lucide-react';

export default function SupervisorDocumentsPage() {
  const { addToast } = useApp();
  const [docList, setDocList] = useState(documents);
  const [activeTab, setActiveTab] = useState('all');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadStudent, setUploadStudent] = useState('s1');
  const [uploadType, setUploadType] = useState('progress_report');

  const filteredDocs = docList.filter(d => {
    if (activeTab === 'all') return true;
    if (activeTab === 'reports') return d.type === 'progress_report';
    if (activeTab === 'offers') return d.type === 'offer_letter';
    if (activeTab === 'certificates') return d.type === 'completion_certificate';
    return true;
  });

  const handleApprove = (docId) => {
    setDocList(prev => prev.map(d => (d.id === docId ? { ...d, status: 'reviewed' } : d)));
    addToast('Document marked as reviewed and approved', 'success');
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `doc-${Date.now()}`,
      activeInternshipId: 'ai1',
      studentId: uploadStudent,
      type: uploadType,
      title: uploadTitle || 'Uploaded Document',
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: 'supervisor',
      status: 'verified',
    };
    setDocList(prev => [newDoc, ...prev]);
    addToast('Document uploaded successfully', 'success');
    setIsUploadOpen(false);
    setUploadTitle('');
  };

  const tabs = [
    { key: 'all', label: 'All Documents', count: docList.length },
    { key: 'reports', label: 'Progress Reports', count: docList.filter(d => d.type === 'progress_report').length },
    { key: 'offers', label: 'Offer Letters', count: docList.filter(d => d.type === 'offer_letter').length },
    { key: 'certificates', label: 'Certificates', count: docList.filter(d => d.type === 'completion_certificate').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Documents & Reports"
        subtitle="Review weekly logbooks, progress reports, and verify official internship documentation"
        actions={
          <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
            <Upload size={16} /> Upload Document
          </button>
        }
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {filteredDocs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents found"
          description="There are no documents matching this category."
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
                        Student: <strong style={{ color: '#334155' }}>{student?.name}</strong> • Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setPreviewDoc(doc)}
                    >
                      <Eye size={14} /> Preview
                    </button>
                    {doc.status === 'pending_review' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleApprove(doc.id)}
                      >
                        <FileCheck size={14} /> Mark Reviewed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <Modal
          isOpen={Boolean(previewDoc)}
          onClose={() => setPreviewDoc(null)}
          title={`Document Preview: ${previewDoc.title}`}
          footer={<button className="btn btn-secondary" onClick={() => setPreviewDoc(null)}>Close</button>}
        >
          <div style={{ textAlign: 'center', padding: '30px 20px', background: '#F8FAFC', borderRadius: 8, border: '1px dashed #CBD5E1' }}>
            <FileText size={48} color="#4F46E5" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>{previewDoc.title}</h4>
            <p style={{ fontSize: 13, color: '#64748B', maxWidth: 380, margin: '0 auto 16px' }}>
              Simulated PDF document verified by the InternBridge document storage service.
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { addToast('Document download initiated', 'info'); setPreviewDoc(null); }}
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </Modal>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <Modal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          title="Upload Official Document"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsUploadOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUploadSubmit}>Upload Document</button>
            </div>
          }
        >
          <form onSubmit={handleUploadSubmit} style={{ display: 'grid', gap: 14 }}>
            <FormField label="Document Title" required>
              <input
                className="form-input"
                value={uploadTitle}
                onChange={e => setUploadTitle(e.target.value)}
                placeholder="e.g. Monthly Supervisor Performance Log"
                required
              />
            </FormField>

            <FormField label="Select Intern" required>
              <select
                className="form-select"
                value={uploadStudent}
                onChange={e => setUploadStudent(e.target.value)}
              >
                {activeInternships.map(ai => (
                  <option key={ai.studentId} value={ai.studentId}>
                    {getStudentById(ai.studentId)?.name} ({ai.studentId})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Document Type" required>
              <select
                className="form-select"
                value={uploadType}
                onChange={e => setUploadType(e.target.value)}
              >
                <option value="progress_report">Progress Report / Logbook</option>
                <option value="offer_letter">Offer Letter</option>
                <option value="completion_certificate">Completion Certificate</option>
              </select>
            </FormField>

            <div style={{ border: '2px dashed #CBD5E1', padding: 24, borderRadius: 8, textAlign: 'center', background: '#F8FAFC' }}>
              <Upload size={28} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>
                Drag and drop your file here, or browse from computer
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>PDF, DOCX up to 10MB</div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
