import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, Tabs, Modal, FormField, EmptyState, ConfirmDialog,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { attendanceRecords, activeInternships, getStudentById, getActiveInternshipById } from '../../data/mockData';
import { MapPin, CheckCircle2, AlertCircle, Clock, ShieldCheck, Navigation, Check, X, Calendar } from 'lucide-react';

export default function AttendanceGeofencePage() {
  const { addToast } = useApp();
  const [records, setRecords] = useState(attendanceRecords);
  const [filterTab, setFilterTab] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');

  const filteredRecords = records.filter(r => {
    if (filterTab === 'all') return true;
    if (filterTab === 'verified') return r.verificationStatus === 'verified';
    if (filterTab === 'exception') return r.verificationStatus === 'exception' || r.verificationStatus === 'pending';
    if (filterTab === 'absent') return r.status === 'absent';
    return true;
  });

  const handleVerify = (record) => {
    setSelectedRecord(record);
    setVerificationNotes(record.notes || '');
    setVerifyModalOpen(true);
  };

  const confirmVerification = (isExceptionApproved) => {
    if (!selectedRecord) return;
    setRecords(prev => prev.map(r => {
      if (r.id === selectedRecord.id) {
        return {
          ...r,
          verificationStatus: isExceptionApproved ? 'verified' : 'exception',
          notes: verificationNotes || (isExceptionApproved ? 'Approved by supervisor' : 'Rejected exception by supervisor'),
        };
      }
      return r;
    }));

    addToast(
      isExceptionApproved ? 'Attendance record verified successfully' : 'Attendance marked as flagged exception',
      isExceptionApproved ? 'success' : 'warning'
    );
    setVerifyModalOpen(false);
    setSelectedRecord(null);
  };

  const tabs = [
    { key: 'all', label: 'All Records', count: records.length },
    { key: 'verified', label: 'Verified Geofence', count: records.filter(r => r.verificationStatus === 'verified').length },
    { key: 'exception', label: 'Exceptions / Pending', count: records.filter(r => r.verificationStatus === 'exception' || r.verificationStatus === 'pending').length },
    { key: 'absent', label: 'Absent', count: records.filter(r => r.status === 'absent').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Attendance & Geofencing"
        subtitle="Real-time geofence-validated attendance logging and exception management for interns"
      />

      {/* Geofence info banner */}
      <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', color: '#FFFFFF', padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Navigation size={26} color="#818CF8" />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: '#FFFFFF' }}>Geofence Radar System Active</h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#C7D2FE' }}>
                Primary Office Hub: TechSolutions HQ (Nashik) • Verified Boundary: <strong>200m Radius</strong>
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '8px 14px', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>96.2%</div>
              <div style={{ fontSize: 11, color: '#C7D2FE' }}>Geofence Accuracy</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '8px 14px', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{records.filter(r => r.verificationStatus === 'verified').length}</div>
              <div style={{ fontSize: 11, color: '#C7D2FE' }}>Auto-Verified Today</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={filterTab} onChange={setFilterTab} />
      </div>

      {filteredRecords.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No attendance records found"
          description="There are currently no attendance logs matching your active filter."
        />
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Check In / Out</th>
                  <th>Location & Proximity</th>
                  <th>Status</th>
                  <th>Geofence Verification</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => {
                  const student = getStudentById(record.studentId);
                  const activeInt = getActiveInternshipById(record.activeInternshipId);

                  return (
                    <tr key={record.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <ProfileAvatar name={student?.name} initials={student?.name?.split(' ').map(n => n[0]).join('')} size="sm" />
                          <div>
                            <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>{student?.name}</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}>{student?.rollNo}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: 13, color: '#334155', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Calendar size={13} color="#64748B" />
                          {record.date}
                        </div>
                      </td>
                      <td style={{ fontSize: 13, color: '#334155', whiteSpace: 'nowrap' }}>
                        {record.checkIn ? (
                          <div>
                            <div><strong>In:</strong> {record.checkIn}</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}><strong>Out:</strong> {record.checkOut || 'Active'}</div>
                          </div>
                        ) : (
                          <span style={{ color: '#94A3B8' }}>—</span>
                        )}
                      </td>
                      <td>
                        {record.locationLabel ? (
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <MapPin size={13} color="#4F46E5" />
                              {record.locationLabel}
                            </div>
                            {record.distance !== null && (
                              <div style={{ fontSize: 12, color: record.withinBoundary ? '#16A34A' : '#DC2626', marginTop: 2 }}>
                                {record.distance}m from site ({record.withinBoundary ? 'Within radius' : 'Outside boundary'})
                              </div>
                            )}
                          </div>
                        ) : (
                          <span style={{ fontSize: 12.5, color: '#94A3B8' }}>Remote / Unrecorded</span>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={record.status} />
                      </td>
                      <td>
                        {record.verificationStatus === 'verified' && (
                          <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <ShieldCheck size={12} /> Verified
                          </span>
                        )}
                        {record.verificationStatus === 'exception' && (
                          <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <AlertCircle size={12} /> Exception
                          </span>
                        )}
                        {record.verificationStatus === 'pending' && (
                          <span className="badge badge-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={12} /> Pending Review
                          </span>
                        )}
                        {record.verificationStatus === 'n/a' && (
                          <span className="badge badge-gray">N/A</span>
                        )}
                        {record.notes && (
                          <div style={{ fontSize: 11, color: '#64748B', marginTop: 3, maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {record.notes}
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {(record.verificationStatus === 'pending' || record.verificationStatus === 'exception') ? (
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ color: '#4F46E5', borderColor: '#C7D2FE' }}
                            onClick={() => handleVerify(record)}
                          >
                            Review & Verify
                          </button>
                        ) : (
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleVerify(record)}
                          >
                            Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Verification / Review Modal */}
      {verifyModalOpen && selectedRecord && (
        <Modal
          isOpen={verifyModalOpen}
          onClose={() => setVerifyModalOpen(false)}
          title={`Attendance Record: ${selectedRecord.date}`}
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setVerifyModalOpen(false)}>Cancel</button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => confirmVerification(false)}
              >
                Flag as Exception
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => confirmVerification(true)}
              >
                Approve & Verify Attendance
              </button>
            </div>
          }
        >
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 8, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
              <div>
                <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Intern</span>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{getStudentById(selectedRecord.studentId)?.name}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Check In / Out</span>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{selectedRecord.checkIn || '—'} / {selectedRecord.checkOut || '—'}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Recorded Distance</span>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: selectedRecord.withinBoundary ? '#16A34A' : '#DC2626' }}>
                  {selectedRecord.distance ? `${selectedRecord.distance} meters` : 'N/A'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Geofence Radius</span>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>200 meters</div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' }}>
                Simulated Geofence Radar Coordinate View
              </label>
              <div style={{
                height: 120, background: '#F1F5F9', border: '2px dashed #CBD5E1', borderRadius: 8,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: selectedRecord.withinBoundary ? '#DCFCE7' : '#FEE2E2', border: `2px solid ${selectedRecord.withinBoundary ? '#16A34A' : '#DC2626'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={22} color={selectedRecord.withinBoundary ? '#16A34A' : '#DC2626'} />
                </div>
                <span style={{ fontSize: 12, color: '#475569' }}>
                  Recorded at {selectedRecord.locationLabel || 'Remote / External site'}
                </span>
              </div>
            </div>

            <FormField label="Supervisor Verification Notes / Justification">
              <textarea
                className="form-textarea"
                rows={3}
                value={verificationNotes}
                onChange={e => setVerificationNotes(e.target.value)}
                placeholder="e.g. Intern was on authorized client assignment or requested early leave..."
              />
            </FormField>
          </div>
        </Modal>
      )}
    </div>
  );
}
