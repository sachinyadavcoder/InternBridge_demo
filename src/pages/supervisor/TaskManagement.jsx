import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SectionHeader, ProfileAvatar, Tabs, Modal, FormField, EmptyState, ConfirmDialog,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { tasks as initialTasks, activeInternships, getStudentById } from '../../data/mockData';
import { CheckSquare, Plus, Edit, Calendar } from 'lucide-react';

const TASK_TABS = [
  { key: 'all', label: 'All' },
  { key: 'not_started', label: 'Not Started' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'revision_required', label: 'Revision Needed' },
  { key: 'approved', label: 'Approved' },
];

const PRIORITIES = ['low', 'medium', 'high'];
const SKILLS = ['React', 'Node.js', 'SQL', 'Testing', 'Setup', 'Full Stack', 'Backend', 'Frontend', 'Design'];

function CreateTaskModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    title: '', description: '', activeInternshipId: '', skill: '', priority: 'medium',
    startDate: '', dueDate: '',
  });
  const [errors, setErrors] = useState({});
  const myInternships = activeInternships.filter(ai => ai.supervisorId === 'u3' && ai.status === 'active');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.activeInternshipId) e.activeInternshipId = 'Select an intern';
    if (!form.dueDate) e.dueDate = 'Due date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const ai = myInternships.find(a => a.id === form.activeInternshipId);
    onSave({ ...form, studentId: ai?.studentId, supervisorId: 'u3', status: 'not_started', submittedAt: null, reviewedAt: null, supervisorFeedback: '' });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Create New Task</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FormField label="Task Title" required error={errors.title}>
            <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Build user authentication module" />
          </FormField>
          <FormField label="Description">
            <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Detailed description of the task and expected deliverables..." rows={3} />
          </FormField>
          <FormField label="Assign To (Intern)" required error={errors.activeInternshipId}>
            <select className="form-select" value={form.activeInternshipId} onChange={e => set('activeInternshipId', e.target.value)}>
              <option value="">— Select intern —</option>
              {myInternships.map(ai => {
                const s = getStudentById(ai.studentId);
                return <option key={ai.id} value={ai.id}>{s?.name}</option>;
              })}
            </select>
          </FormField>
          <div className="grid-2" style={{ gap: 16 }}>
            <FormField label="Skill / Category">
              <select className="form-select" value={form.skill} onChange={e => set('skill', e.target.value)}>
                <option value="">— Select skill —</option>
                {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Priority">
              <select className="form-select" value={form.priority} onChange={e => set('priority', e.target.value)}>
                {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </FormField>
            <FormField label="Start Date">
              <input className="form-input" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
            </FormField>
            <FormField label="Due Date" required error={errors.dueDate}>
              <input className="form-input" type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
            </FormField>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Create Task</button>
        </div>
      </div>
    </div>
  );
}

export default function TaskManagement() {
  const { addToast } = useApp();
  const [taskList, setTaskList] = useState(initialTasks.filter(t => t.supervisorId === 'u3'));
  const [tab, setTab] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = taskList.filter(t => {
    const matchTab = tab === 'all' || t.status === tab;
    const student = getStudentById(t.studentId);
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || student?.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const tabCounts = TASK_TABS.reduce((acc, t) => {
    acc[t.key] = t.key === 'all' ? taskList.length : taskList.filter(tk => tk.status === t.key).length;
    return acc;
  }, {});

  const handleCreate = (task) => {
    setTaskList(prev => [...prev, { ...task, id: `t_${Date.now()}` }]);
    addToast('Task created and assigned successfully!', 'success');
  };

  const changeStatus = (id, status) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    addToast('Task status updated.', 'success');
  };

  return (
    <div>
      <PageHeader
        title="Task Management"
        subtitle="Create and manage tasks for your assigned interns."
        actions={<button className="btn btn-primary" onClick={() => setShowCreate(true)}><Plus size={16} />Create Task</button>}
      />

      <div className="card" style={{ marginBottom: 16, padding: '14px 20px' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <input className="form-input" style={{ maxWidth: 280 }} placeholder="Search tasks or interns..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="form-select" style={{ width: 140 }}>
            <option value="">All Priorities</option>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        <Tabs tabs={TASK_TABS.map(t => ({ ...t, count: tabCounts[t.key] }))} active={tab} onChange={setTab} />
        {filtered.length === 0 ? (
          <EmptyState icon={CheckSquare} title="No tasks found" action={<button className="btn btn-primary" onClick={() => setShowCreate(true)}><Plus size={14} />Create Task</button>} />
        ) : (
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Task</th><th>Intern</th><th>Skill</th><th>Priority</th><th>Due Date</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => {
                  const student = getStudentById(t.studentId);
                  return (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{t.description.slice(0, 55)}…</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <ProfileAvatar initials={student?.name.split(' ').map(n => n[0]).join('')} name={student?.name} size="sm" />
                          <span style={{ fontSize: 13 }}>{student?.name}</span>
                        </div>
                      </td>
                      <td><span className="badge badge-gray">{t.skill}</span></td>
                      <td>
                        <span className={`badge ${t.priority === 'high' ? 'badge-error' : t.priority === 'medium' ? 'badge-warning' : 'badge-gray'}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td style={{ fontSize: 13, color: '#64748B' }}>{t.dueDate}</td>
                      <td><StatusBadge status={t.status} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {t.status === 'not_started' && (
                            <button className="btn btn-outline btn-sm" onClick={() => changeStatus(t.id, 'in_progress')}>Start</button>
                          )}
                          {t.status === 'submitted' && (
                            <>
                              <button className="btn btn-success btn-sm" onClick={() => changeStatus(t.id, 'approved')}>Approve</button>
                              <button className="btn btn-secondary btn-sm" onClick={() => changeStatus(t.id, 'revision_required')}>Revision</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreateTaskModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSave={handleCreate} />
    </div>
  );
}
