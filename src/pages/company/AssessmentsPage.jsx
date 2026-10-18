import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, SectionHeader, FormField,
  EmptyState, Chip, ConfirmDialog,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { assessments as initialAssessments, internships, getQuestionsByAssessment } from '../../data/mockData';
import { Plus, CheckSquare, Edit, Trash2, Eye, ChevronDown, ChevronUp, Zap } from 'lucide-react';

const QUESTION_TYPES = [
  { value: 'mcq', label: 'Multiple Choice (MCQ)' },
  { value: 'technical', label: 'Technical / Short Answer' },
  { value: 'coding', label: 'Coding Problem' },
  { value: 'debugging', label: 'Debugging Problem' },
  { value: 'scenario', label: 'Scenario-Based' },
  { value: 'practical', label: 'Practical Task' },
];

const SKILLS_BY_INTERNSHIP = {
  'i1': ['React', 'JavaScript', 'HTML/CSS', 'Git'],
  'i2': ['React', 'Node.js', 'SQL', 'REST APIs', 'Git'],
  'i3': ['Python', 'SQL', 'Pandas', 'Power BI'],
  'i4': ['Python', 'Scikit-learn', 'TensorFlow', 'NLP'],
  'i5': ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
};

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'company', label: 'Company-Created' },
  { key: 'platform', label: 'Platform-Generated' },
  { key: 'published', label: 'Published' },
  { key: 'draft', label: 'Draft' },
];

function QuestionCard({ q, idx, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const typeMeta = QUESTION_TYPES.find(t => t.value === q.type);
  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', background: '#F8FAFC' }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
          {idx + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.text}</div>
          <div style={{ fontSize: 11, color: '#64748B' }}>{typeMeta?.label} · {q.skill} · {q.marks} marks</div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span className="badge badge-gray">{q.difficulty}</span>
          {open ? <ChevronUp size={14} color="#94A3B8" /> : <ChevronDown size={14} color="#94A3B8" />}
        </div>
      </div>
      {open && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 13, color: '#475569', whiteSpace: 'pre-wrap', marginBottom: 10 }}>{q.text}</div>
          {q.type === 'mcq' && q.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
              {q.options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, background: i === q.correct ? '#F0FDF4' : '#F8FAFC', border: `1px solid ${i === q.correct ? '#BBF7D0' : '#E2E8F0'}`, fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: '#64748B' }}>{String.fromCharCode(65 + i)}.</span>
                  <span>{opt}</span>
                  {i === q.correct && <span className="badge badge-success" style={{ marginLeft: 'auto' }}>Correct</span>}
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(q)}><Edit size={13} />Edit</button>
            <button className="btn btn-ghost btn-sm" style={{ color: '#DC2626' }} onClick={() => onDelete(q.id)}><Trash2 size={13} />Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AssessmentBuilderModal({ isOpen, onClose, onSave }) {
  const { addToast } = useApp();
  const [form, setForm] = useState({
    title: '', internshipId: '', skills: [], duration: 60, difficulty: 'Intermediate', passingScore: 70, instructions: '', type: 'company',
  });
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({ type: 'mcq', skill: '', difficulty: 'Medium', marks: 5, text: '', options: ['', '', '', ''], correct: 0 });
  const [skillInput, setSkillInput] = useState('');
  const [showQForm, setShowQForm] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generateQuestions = () => {
    const skills = SKILLS_BY_INTERNSHIP[form.internshipId] || form.skills;
    if (!skills.length) { addToast('Select an internship or add skills to generate questions.', 'warning'); return; }
    const generated = skills.flatMap((skill, si) => [
      { id: `gen_${si}_1`, type: 'mcq', skill, difficulty: 'Medium', marks: 5, text: `Which of the following is a core feature of ${skill}?`, options: [`Feature A`, `Feature B`, `Feature C (Correct)`, `Feature D`], correct: 2 },
      { id: `gen_${si}_2`, type: 'technical', skill, difficulty: 'Medium', marks: 10, text: `Describe a real-world scenario where ${skill} would be the best tool for the job. What are its advantages?`, options: null, correct: null },
    ]);
    setQuestions(generated.slice(0, 8));
    addToast('Draft questions generated from selected skills. Review and edit before publishing. These are template-based, not AI-generated.', 'info', 6000);
  };

  const addQ = () => {
    setQuestions(prev => [...prev, { ...newQ, id: `q_${Date.now()}` }]);
    setNewQ({ type: 'mcq', skill: '', difficulty: 'Medium', marks: 5, text: '', options: ['', '', '', ''], correct: 0 });
    setShowQForm(false);
  };

  const handleSave = (status) => {
    if (!form.title.trim()) { addToast('Assessment title is required.', 'error'); return; }
    if (questions.length < 1 && status === 'published') { addToast('Add at least one question before publishing.', 'error'); return; }
    onSave({ ...form, questions: questions.map(q => q.id), status, candidates: 0, completions: 0, createdAt: new Date().toISOString().slice(0, 10) });
    addToast(`Assessment "${form.title}" ${status === 'published' ? 'published' : 'saved as draft'}.`, 'success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-xl">
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Assessment Builder</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Config */}
          <div className="grid-2" style={{ gap: 16 }}>
            <FormField label="Assessment Title" required>
              <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. React Developer Skills Test" />
            </FormField>
            <FormField label="Associated Internship">
              <select className="form-select" value={form.internshipId} onChange={e => set('internshipId', e.target.value)}>
                <option value="">— Select internship —</option>
                {internships.filter(i => i.companyId === 'c1').map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
              </select>
            </FormField>
            <FormField label="Duration (minutes)">
              <input className="form-input" type="number" value={form.duration} onChange={e => set('duration', parseInt(e.target.value))} />
            </FormField>
            <FormField label="Difficulty">
              <select className="form-select" value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                {['Beginner', 'Intermediate', 'Advanced'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </FormField>
            <FormField label="Passing Score (%)">
              <input className="form-input" type="number" min="0" max="100" value={form.passingScore} onChange={e => set('passingScore', parseInt(e.target.value))} />
            </FormField>
            <FormField label="Assessment Type">
              <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="company">Company-Created</option>
                <option value="platform">Platform-Generated (Draft)</option>
              </select>
            </FormField>
          </div>
          <FormField label="Instructions">
            <textarea className="form-textarea" value={form.instructions} onChange={e => set('instructions', e.target.value)} placeholder="Instructions shown to candidates before they begin..." />
          </FormField>

          {/* Questions section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700 }}>Questions <span style={{ color: '#64748B', fontWeight: 500 }}>({questions.length})</span></h4>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {form.internshipId && (
                  <button className="btn btn-outline btn-sm" onClick={generateQuestions}>
                    <Zap size={14} />Auto-Generate (Draft)
                  </button>
                )}
                <button className="btn btn-secondary btn-sm" onClick={() => setShowQForm(v => !v)}>
                  <Plus size={14} />Add Question
                </button>
              </div>
            </div>

            {showQForm && (
              <div className="card" style={{ marginBottom: 12, background: '#F8FAFC' }}>
                <SectionHeader title="New Question" />
                <div className="grid-2" style={{ gap: 12, marginBottom: 12 }}>
                  <FormField label="Question Type">
                    <select className="form-select" value={newQ.type} onChange={e => setNewQ(q => ({ ...q, type: e.target.value }))}>
                      {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Skill / Topic">
                    <input className="form-input" value={newQ.skill} onChange={e => setNewQ(q => ({ ...q, skill: e.target.value }))} placeholder="e.g. React" />
                  </FormField>
                  <FormField label="Difficulty">
                    <select className="form-select" value={newQ.difficulty} onChange={e => setNewQ(q => ({ ...q, difficulty: e.target.value }))}>
                      {['Easy', 'Medium', 'Hard'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Marks">
                    <input className="form-input" type="number" value={newQ.marks} onChange={e => setNewQ(q => ({ ...q, marks: parseInt(e.target.value) }))} />
                  </FormField>
                </div>
                <FormField label="Question Text" required>
                  <textarea className="form-textarea" value={newQ.text} onChange={e => setNewQ(q => ({ ...q, text: e.target.value }))} placeholder="Enter the question..." rows={3} />
                </FormField>
                {newQ.type === 'mcq' && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Options (select correct answer)</div>
                    {newQ.options.map((opt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <input type="radio" name="correctOpt" checked={newQ.correct === i} onChange={() => setNewQ(q => ({ ...q, correct: i }))} style={{ accentColor: '#4F46E5' }} />
                        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 700, width: 20 }}>{String.fromCharCode(65 + i)}.</span>
                        <input className="form-input" value={opt} onChange={e => { const opts = [...newQ.options]; opts[i] = e.target.value; setNewQ(q => ({ ...q, options: opts })); }} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowQForm(false)}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={addQ} disabled={!newQ.text.trim()}>Add Question</button>
                </div>
              </div>
            )}

            {questions.length === 0 ? (
              <EmptyState icon={CheckSquare} title="No questions yet" description="Add questions manually or auto-generate a draft from internship skills." />
            ) : (
              questions.map((q, i) => (
                <QuestionCard key={q.id} q={q} idx={i}
                  onEdit={() => {}}
                  onDelete={(id) => setQuestions(prev => prev.filter(q => q.id !== id))}
                />
              ))
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-secondary" onClick={() => handleSave('draft')}>Save as Draft</button>
          <button className="btn btn-primary" onClick={() => handleSave('published')}>Publish Assessment</button>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentsPage() {
  const { addToast } = useApp();
  const [assessments, setAssessments] = useState(initialAssessments.filter(a => a.companyId === 'c1'));
  const [tab, setTab] = useState('all');
  const [showBuilder, setShowBuilder] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = assessments.filter(a => {
    if (tab === 'all') return true;
    if (tab === 'company') return a.type === 'company';
    if (tab === 'platform') return a.type === 'platform';
    return a.status === tab;
  });

  const tabCounts = TABS.reduce((acc, t) => {
    if (t.key === 'all') acc[t.key] = assessments.length;
    else if (t.key === 'company') acc[t.key] = assessments.filter(a => a.type === 'company').length;
    else if (t.key === 'platform') acc[t.key] = assessments.filter(a => a.type === 'platform').length;
    else acc[t.key] = assessments.filter(a => a.status === t.key).length;
    return acc;
  }, {});

  const handleSave = (data) => {
    setAssessments(prev => [{ ...data, id: `a_${Date.now()}`, companyId: 'c1' }, ...prev]);
  };

  return (
    <div>
      <PageHeader
        title="Assessments"
        subtitle="Manage competency assessments for your internship postings."
        actions={<button className="btn btn-primary" onClick={() => setShowBuilder(true)}><Plus size={16} />Create Assessment</button>}
      />

      <div className="card">
        <Tabs tabs={TABS.map(t => ({ ...t, count: tabCounts[t.key] }))} active={tab} onChange={setTab} />
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Assessment</th>
                <th>Type</th>
                <th>Skills</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Pass Score</th>
                <th>Candidates</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{a.createdAt}</div>
                  </td>
                  <td>
                    <span className={`badge ${a.type === 'company' ? 'badge-primary' : 'badge-cyan'}`}>
                      {a.type === 'company' ? 'Company-Created' : 'Platform-Generated'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {a.skills.slice(0, 3).map(s => <span key={s} className="badge badge-gray">{s}</span>)}
                      {a.skills.length > 3 && <span className="badge badge-gray">+{a.skills.length - 3}</span>}
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{a.duration} min</td>
                  <td><span className="badge badge-blue">{a.difficulty}</span></td>
                  <td style={{ fontSize: 13, fontWeight: 600 }}>{a.passingScore}%</td>
                  <td>
                    <div style={{ fontSize: 13 }}>{a.completions}/{a.candidates}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>completed</div>
                  </td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => setSelected(a)}>
                        <Eye size={13} />View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View detail modal */}
      {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected.title} size="lg"
          footer={<button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid-2">
              {[
                ['Type', selected.type === 'company' ? 'Company-Created' : 'Platform-Generated'],
                ['Duration', `${selected.duration} minutes`],
                ['Difficulty', selected.difficulty],
                ['Passing Score', `${selected.passingScore}%`],
                ['Candidates', selected.candidates],
                ['Completions', selected.completions],
              ].map(([l, v]) => (
                <div key={l} style={{ padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{l}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Skills Covered</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selected.skills.map(s => <span key={s} className="badge badge-primary">{s}</span>)}
              </div>
            </div>
            {selected.instructions && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Instructions</div>
                <p style={{ fontSize: 13, color: '#475569' }}>{selected.instructions}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      <AssessmentBuilderModal isOpen={showBuilder} onClose={() => setShowBuilder(false)} onSave={handleSave} />
    </div>
  );
}
