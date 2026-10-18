import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, Tabs, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { attendanceRecords, activeInternships, getStudentById, getActiveInternshipById } from '../../data/mockData';
import { MapPin, ShieldCheck, Clock, AlertTriangle, Calendar } from 'lucide-react';

export default function GuideAttendance() {
  const [filterTab, setFilterTab] = useState('all');

  const filtered = attendanceRecords.filter(r => {
    if (filterTab === 'all') return true;
    if (filterTab === 'verified') return r.verificationStatus === 'verified';
    if (filterTab === 'exception') return r.verificationStatus === 'exception' || r.verificationStatus === 'pending';
    return true;
  });

  const tabs = [
    { key: 'all', label: 'All Attendance Logs', count: attendanceRecords.length },
    { key: 'verified', label: 'Geofence Verified', count: attendanceRecords.filter(r => r.verificationStatus === 'verified').length },
    { key: 'exception', label: 'Exceptions / Flaggable', count: attendanceRecords.filter(r => r.verificationStatus === 'exception' || r.verificationStatus === 'pending').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Attendance Review"
        subtitle="Institutional attendance monitoring, geofence audit trails, and minimum presence threshold tracking"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={filterTab} onChange={setFilterTab} />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Mentee</th>
                <th>Date</th>
                <th>Check In / Out</th>
                <th>Workplace & Geofence Verification</th>
                <th>Daily Status</th>
                <th>Supervisor Audit</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(record => {
                const student = getStudentById(record.studentId);

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
                        <Calendar size={13} color="#64748B" /> {record.date}
                      </div>
                    </td>
                    <td style={{ fontSize: 13, color: '#334155', whiteSpace: 'nowrap' }}>
                      {record.checkIn ? `${record.checkIn} — ${record.checkOut || 'Active'}` : '—'}
                    </td>
                    <td>
                      {record.locationLabel ? (
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>{record.locationLabel}</div>
                          {record.distance !== null && (
                            <div style={{ fontSize: 11, color: record.withinBoundary ? '#16A34A' : '#D97706' }}>
                              {record.distance}m radius • {record.withinBoundary ? 'Inside perimeter' : 'Outside boundary'}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: '#94A3B8' }}>Remote / Exempt</span>
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
                          <AlertTriangle size={12} /> Exception
                        </span>
                      )}
                      {record.verificationStatus === 'pending' && (
                        <span className="badge badge-cyan">Pending</span>
                      )}
                      {record.verificationStatus === 'n/a' && (
                        <span className="badge badge-gray">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
