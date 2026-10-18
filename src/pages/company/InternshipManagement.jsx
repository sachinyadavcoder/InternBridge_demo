import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Search, Filter, Eye, Edit, Play, Pause, RotateCcw, XCircle, ClipboardList,
  MapPin, Briefcase, Users, Calendar, DollarSign, MoreVertical,
} from 'lucide-react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, FormField, EmptyState, Chip, ConfirmDialog,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { internships as initialInternships } from '../../data/mockData';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'draft', label: 'Draft' },
  { key: 'published', label: 'Published' },
  { key: 'paused', label: 'Paused' },
  { key: 'closed', label: 'Closed' },
];

const DOMAINS = ['Web Development', 'Full Stack Development', 'Data Analytics', 'Machine Learning', 'Backend Development', 'Mobile Development', 'Design', 'DevOps'];
const WORK_MODES = ['Onsite', 'Remote', 'Hybrid'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

function CreateInternshipModal({ isOpen, onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '', role: '', description: '', domain: '', vacancies: '',
    requiredSkills: [], preferredSkills: [], minQualification: '', eligibility: '',
    location: '', workMode: '', duration: '', stipend: '', startDate: '', deadline: '',
    assessmentRequired: false, assessmentType: 'company', difficulty: 'Intermediate', passingScore: 70,
  });
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const addSkill = (field, val) => {
    if (val.trim() && !form[field].includes(val.trim())) {
      set(field, [...form[field], val.trim()]);
    }
  };
  const removeSkill = (field, skill) => set(field, form[field].filter(s => s !== skill));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Internship title is required';
    if (!form.domain) e.domain = 'Domain is required';
    if (!form.vacancies || isNaN(form.vacancies)) e.vacancies = 'Valid number of vacancies required';
    if (!form.workMode) e.workMode = 'Work mode is required';
    if (!form.duration.trim()) e.duration = 'Duration is required';
    if (!form.deadline) e.deadline = 'Application deadline is required';
    if (!form.stipend || isNaN(form.stipend)) e.stipend = 'Valid stipend amount required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (status) => {
    if (status === 'published' && !validate()) return;
    onSave({ ...form, status, vacancies: parseInt(form.vacancies) || 1, stipend: parseInt(form.stipend) || 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-xl">
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Create Internship Posting</h3>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Step {step} of 4</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #E2E8F0', padding: '0 24px' }}>
          {['Basic Info', 'Skills & Eligibility', 'Internship Details', 'Assessment'].map((s, i) => (
            <div key={i}
              onClick={() => setStep(i + 1)}
              style={{
                padding: '12px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                color: step === i + 1 ? '#4F46E5' : '#94A3B8',
                borderBottom: step === i + 1 ? '2px solid #4F46E5' : '2px solid transparent',
                marginBottom: -1,
              }}
            >{i + 1}. {s}</div>
          ))}
        </div>

        <div className="modal-body">
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="Internship Title" required error={errors.title}>
                <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Frontend Developer Intern" />
              </FormField>
              <FormField label="Job Role" required>
                <input className="form-input" value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Frontend Developer" />
              </FormField>
              <FormField label="Domain" required error={errors.domain} style={{ gridColumn: 'span 1' }}>
                <select className="form-select" value={form.domain} onChange={e => set('domain', e.target.value)}>
                  <option value="">Select domain</option>
                  {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </FormField>
              <FormField label="Number of Vacancies" required error={errors.vacancies}>
                <input className="form-input" type="number" min="1" value={form.vacancies} onChange={e => set('vacancies', e.target.value)} placeholder="e.g. 2" />
              </FormField>
              <FormField label="Description" required style={{ gridColumn: 'span 2' }}>
                <textarea className="form-textarea" rows="4" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the internship role and responsibilities..." />
              </FormField>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FormField label="Required Technical Skills" hint="Press Enter or comma to add a skill">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  {form.requiredSkills.map(s => (
                    <Chip key={s} label={s} onRemove={() => removeSkill('requiredSkills', s)} />
                  ))}
                </div>
                <input className="form-input" placeholder="e.g. React, Node.js"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill('requiredSkills', skillInput); setSkillInput(''); } }} />
              </FormField>
              <FormField label="Preferred Skills" hint="Nice-to-have skills">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  {form.preferredSkills.map(s => (
                    <Chip key={s} label={s} onRemove={() => removeSkill('preferredSkills', s)} style={{ background: '#F0FDF4', color: '#16A34A' }} />
                  ))}
                </div>
                <input className="form-input" placeholder="e.g. Docker, TypeScript"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill('preferredSkills', e.target.value); e.target.value = ''; } }} />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Minimum Qualification">
                  <input className="form-input" value={form.minQualification} onChange={e => set('minQualification', e.target.value)} placeholder="e.g. Final Year BE/BTech" />
                </FormField>
                <FormField label="Eligible Degree/Program">
                  <input className="form-input" value={form.eligibility} onChange={e => set('eligibility', e.target.value)} placeholder="e.g. BE IT, CS, or related" />
                </FormField>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="Location" required>
                <input className="form-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Nashik, Pune, Remote" />
              </FormField>
              <FormField label="Work Mode" required error={errors.workMode}>
                <select className="form-select" value={form.workMode} onChange={e => set('workMode', e.target.value)}>
                  <option value="">Select work mode</option>
                  {WORK_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </FormField>
              <FormField label="Duration" required error={errors.duration}>
                <input className="form-input" value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 3 months, 6 months" />
              </FormField>
              <FormField label="Monthly Stipend (₹)" required error={errors.stipend}>
                <input className="form-input" type="number" value={form.stipend} onChange={e => set('stipend', e.target.value)} placeholder="e.g. 12000" />
              </FormField>
              <FormField label="Start Date">
                <input className="form-input" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
              </FormField>
              <FormField label="Application Deadline" required error={errors.deadline}>
                <input className="form-input" type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
              </FormField>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FormField label="Assessment Required">
                <div style={{ display: 'flex', gap: 20 }}>
                  {[true, false].map(v => (
                    <label key={String(v)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input type="radio" name="assessReq" checked={form.assessmentRequired === v} onChange={() => set('assessmentRequired', v)} style={{ accentColor: '#4F46E5' }} />
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{v ? 'Yes' : 'No'}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              {form.assessmentRequired && (
                <>
                  <FormField label="Assessment Type">
                    <div style={{ display: 'flex', gap: 20 }}>
                      {[['company', 'Company-Created'], ['platform', 'Platform-Generated (Draft)']].map(([v, l]) => (
                        <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                          <input type="radio" name="assessType" checked={form.assessmentType === v} onChange={() => set('assessmentType', v)} style={{ accentColor: '#4F46E5' }} />
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{l}</span>
                        </label>
                      ))}
                    </div>
                  </FormField>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <FormField label="Difficulty Level">
                      <select className="form-select" value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                        {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Passing Score (%)">
                      <input className="form-input" type="number" min="0" max="100" value={form.passingScore} onChange={e => set('passingScore', parseInt(e.target.value))} />
                    </FormField>
                  </div>
                  {form.assessmentType === 'platform' && (
                    <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 10, padding: 14, fontSize: 13, color: '#0369A1' }}>
                      <strong>Note:</strong> Platform-generated assessments are prepared as drafts based on required skills using predefined question templates. They must be reviewed and edited before publishing. No live AI/ML service is connected in this prototype.
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {step > 1 && <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={() => handleSave('draft')}>Save as Draft</button>
            {step < 4
              ? <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Next →</button>
              : <button className="btn btn-primary" onClick={() => handleSave('published')}>Publish Internship</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InternshipManagement() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const [internships, setInternships] = useState(initialInternships.filter(i => i.companyId === 'c1'));
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = internships.filter(i => {
    const matchTab = tab === 'all' || i.status === tab;
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.domain.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const tabCounts = TABS.reduce((acc, t) => {
    acc[t.key] = t.key === 'all' ? internships.length : internships.filter(i => i.status === t.key).length;
    return acc;
  }, {});

  const handleSave = (data) => {
    const newI = {
      ...data,
      id: `i_${Date.now()}`,
      companyId: 'c1',
      applications: 0,
      postedAt: new Date().toISOString().slice(0, 10),
      requiredSkills: data.requiredSkills || [],
      preferredSkills: data.preferredSkills || [],
    };
    setInternships(prev => [newI, ...prev]);
    addToast(`Internship "${data.title}" ${data.status === 'published' ? 'published' : 'saved as draft'} successfully!`, 'success');
  };

  const changeStatus = (id, status) => {
    setInternships(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    addToast(`Internship status updated to ${status}.`, 'success');
    setOpenMenu(null);
  };

  return (
    <div>
      <PageHeader
        title="Internship Management"
        subtitle="Create, manage, and track your internship postings."
        actions={
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={16} />Create Internship
          </button>
        }
      />

      {/* Filter bar */}
      <div className="card" style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by title or domain..." style={{ maxWidth: 280 }} />
          <select className="form-select" style={{ width: 160 }}>
            <option value="">All Domains</option>
            {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="form-select" style={{ width: 140 }}>
            <option value="">All Modes</option>
            {WORK_MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        <Tabs tabs={TABS.map(t => ({ ...t, count: tabCounts[t.key] }))} active={tab} onChange={setTab} />

        {filtered.length === 0 ? (
          <EmptyState icon={Briefcase} title="No internships found" description="Try adjusting your search or create a new posting." action={<button className="btn btn-primary" onClick={() => setShowCreate(true)}><Plus size={14} />Create Internship</button>} />
        ) : (
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Internship</th>
                  <th>Domain</th>
                  <th>Mode</th>
                  <th>Stipend</th>
                  <th>Deadline</th>
                  <th>Applications</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(i => (
                  <tr key={i.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{i.title}</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>
                        <MapPin size={10} style={{ display: 'inline', marginRight: 3 }} />{i.location}
                        &nbsp;·&nbsp;{i.vacancies} seat{i.vacancies > 1 ? 's' : ''}
                      </div>
                    </td>
                    <td style={{ fontSize: 13 }}>{i.domain}</td>
                    <td><span className="badge badge-blue">{i.workMode}</span></td>
                    <td style={{ fontWeight: 600, color: '#0F172A' }}>₹{i.stipend?.toLocaleString()}/mo</td>
                    <td style={{ fontSize: 13, color: '#64748B' }}>{i.deadline || '—'}</td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#4F46E5' }}>{i.applications}</div>
                    </td>
                    <td><StatusBadge status={i.status} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, position: 'relative' }}>
                        <button className="btn btn-ghost btn-sm btn-icon" title="View Applications" onClick={() => navigate('/company/applications')}>
                          <ClipboardList size={15} />
                        </button>
                        <div style={{ position: 'relative' }}>
                          <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setOpenMenu(openMenu === i.id ? null : i.id)}>
                            <MoreVertical size={15} />
                          </button>
                          {openMenu === i.id && (
                            <div style={{
                              position: 'absolute', right: 0, top: '100%', zIndex: 50,
                              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10,
                              boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 160, overflow: 'hidden',
                            }}>
                              {[
                                { label: 'View Details', action: () => setOpenMenu(null) },
                                i.status === 'draft' && { label: 'Publish', action: () => changeStatus(i.id, 'published') },
                                i.status === 'published' && { label: 'Pause', action: () => changeStatus(i.id, 'paused') },
                                i.status === 'paused' && { label: 'Reopen', action: () => changeStatus(i.id, 'published') },
                                (i.status === 'published' || i.status === 'paused') && { label: 'Close', action: () => { setConfirm({ id: i.id, label: i.title }); setOpenMenu(null); } },
                              ].filter(Boolean).map(item => (
                                <button key={item.label} className="btn btn-ghost"
                                  style={{ width: '100%', justifyContent: 'flex-start', borderRadius: 0, padding: '9px 16px', fontSize: 13, gap: 8,
                                    color: item.label === 'Close' ? '#DC2626' : undefined }}
                                  onClick={item.action}>
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreateInternshipModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSave={handleSave} />

      <ConfirmDialog
        isOpen={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={() => changeStatus(confirm?.id, 'closed')}
        title="Close Internship"
        message={`Are you sure you want to close "${confirm?.label}"? No new applications will be accepted.`}
        confirmLabel="Close Posting"
        danger
      />
    </div>
  );
}
