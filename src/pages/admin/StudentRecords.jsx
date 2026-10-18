import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, FormField, SectionHeader, InfoRow, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { students, activeInternships, guideAssignments, users } from '../../data/mockData';
import { GraduationCap, Search, Plus, Filter, Mail, Phone, ExternalLink, Download } from 'lucide-react';

export default function StudentRecords() {
  const { addToast } = useApp();
  const [studentList, setStudentList] = useState(students);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New student form
  const [newName, setNewName] = useState('');
  const [newRollNo, setNewRollNo] = useState('');
  const [newDept, setNewDept] = useState('IT');
  const [newCgpa, setNewCgpa] = useState('8.0');
  const [newEmail, setNewEmail] = useState('');

  const filteredStudents = studentList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (deptFilter !== 'all' && s.department !== deptFilter) return false;
    return true;
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: `s${Date.now()}`,
      name: newName,
      rollNo: newRollNo,
      program: `BE ${newDept === 'IT' ? 'Information Technology' : 'Computer Science'}`,
      department: newDept,
      college: 'Government College of Engineering, Nashik',
      year: 4,
      cgpa: parseFloat(newCgpa) || 8.0,
      email: newEmail,
      phone: '+91 98000 00000',
      skills: ['Java', 'C++', 'Python', 'SQL'],
      certifications: [],
      projects: [],
      resumeUrl: '#',
    };
    setStudentList(prev => [newStudent, ...prev]);
    addToast('Student record added to institutional database', 'success');
    setIsAddOpen(false);
    setNewName('');
    setNewRollNo('');
    setNewEmail('');
  };

  const tabs = [
    { key: 'all', label: 'All Students', count: studentList.length },
    { key: 'IT', label: 'Information Tech', count: studentList.filter(s => s.department === 'IT').length },
    { key: 'CS', label: 'Computer Science', count: studentList.filter(s => s.department === 'CS').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Student Records & Directory"
        subtitle="Master institutional database of eligible students, academic records, and internship placement status"
        actions={
          <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
            <Plus size={16} /> Enroll New Student
          </button>
        }
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <Tabs tabs={tabs} active={deptFilter} onChange={setDeptFilter} />
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search name, roll no, email..." />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year / CGPA</th>
                <th>Placement Status</th>
                <th>Faculty Guide</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                const activeInt = activeInternships.find(ai => ai.studentId === student.id);
                const guideAssign = guideAssignments.find(ga => ga.studentId === student.id);
                const guideUser = users.find(u => u.id === guideAssign?.guideId);

                return (
                  <tr key={student.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <ProfileAvatar name={student.name} initials={student.name.split(' ').map(n => n[0]).join('')} size="sm" />
                        <div>
                          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>{student.name}</div>
                          <div style={{ fontSize: 12, color: '#64748B' }}>{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>{student.rollNo}</td>
                    <td>
                      <span className="badge badge-primary">{student.department}</span>
                    </td>
                    <td style={{ fontSize: 13, color: '#334155' }}>
                      Yr {student.year} • <strong>{student.cgpa} CGPA</strong>
                    </td>
                    <td>
                      {activeInt ? (
                        <StatusBadge status={activeInt.status} />
                      ) : (
                        <span className="badge badge-gray">Not Placed</span>
                      )}
                    </td>
                    <td style={{ fontSize: 13, color: '#334155' }}>
                      {guideUser ? (
                        <span style={{ fontWeight: 500, color: '#4F46E5' }}>{guideUser.name}</span>
                      ) : (
                        <span style={{ color: '#94A3B8' }}>Unassigned</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setSelectedStudent(student)}>
                        Full Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedStudent && (
        <Modal
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          title={`Student Academic Record: ${selectedStudent.name}`}
          size="lg"
          footer={<button className="btn btn-secondary" onClick={() => setSelectedStudent(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#F8FAFC', padding: 16, borderRadius: 8 }}>
              <ProfileAvatar name={selectedStudent.name} initials={selectedStudent.name.split(' ').map(n => n[0]).join('')} size="lg" />
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{selectedStudent.name}</h3>
                <div style={{ fontSize: 13, color: '#64748B' }}>
                  {selectedStudent.program} • Roll: {selectedStudent.rollNo}
                </div>
                <div style={{ fontSize: 13, color: '#4F46E5', fontWeight: 600, marginTop: 2 }}>
                  CGPA: {selectedStudent.cgpa} / 10.0 • College of Engineering, Nashik
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              <InfoRow label="Institutional Email" value={selectedStudent.email} />
              <InfoRow label="Contact Phone" value={selectedStudent.phone} />
              <InfoRow label="GitHub Handle" value={selectedStudent.github} />
              <InfoRow label="LeetCode" value={selectedStudent.leetcode || 'N/A'} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: 6 }}>
                Extracted & Verified Skills
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {selectedStudent.skills?.map(skill => (
                  <span key={skill} className="badge badge-primary">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: 6 }}>
                Certifications
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {selectedStudent.certifications?.length > 0 ? (
                  selectedStudent.certifications.map((cert, idx) => (
                    <span key={idx} className="badge badge-success">{cert}</span>
                  ))
                ) : (
                  <span style={{ fontSize: 13, color: '#94A3B8' }}>No external certifications uploaded</span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Enroll Student in Placement System"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddStudent}>Save Student Record</button>
            </div>
          }
        >
          <form onSubmit={handleAddStudent} style={{ display: 'grid', gap: 12 }}>
            <FormField label="Full Name" required>
              <input className="form-input" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Rahul Verma" required />
            </FormField>
            <FormField label="Roll Number" required>
              <input className="form-input" value={newRollNo} onChange={e => setNewRollNo(e.target.value)} placeholder="e.g. IT2021025" required />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormField label="Department" required>
                <select className="form-select" value={newDept} onChange={e => setNewDept(e.target.value)}>
                  <option value="IT">Information Technology</option>
                  <option value="CS">Computer Science</option>
                </select>
              </FormField>
              <FormField label="Current CGPA" required>
                <input className="form-input" type="number" step="0.1" value={newCgpa} onChange={e => setNewCgpa(e.target.value)} required />
              </FormField>
            </div>
            <FormField label="Institutional Email" required>
              <input className="form-input" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="name@student.edu" required />
            </FormField>
          </form>
        </Modal>
      )}
    </div>
  );
}
