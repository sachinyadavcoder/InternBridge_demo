import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

// ============================================================
// StatusBadge
// ============================================================
export function StatusBadge({ status }) {
  const map = {
    // Application / internship statuses
    new: { label: 'New', cls: 'badge-primary' },
    under_review: { label: 'Under Review', cls: 'badge-cyan' },
    shortlisted: { label: 'Shortlisted', cls: 'badge-warning' },
    selected: { label: 'Selected', cls: 'badge-success' },
    rejected: { label: 'Rejected', cls: 'badge-error' },
    // Internship posting
    published: { label: 'Published', cls: 'badge-success' },
    draft: { label: 'Draft', cls: 'badge-gray' },
    paused: { label: 'Paused', cls: 'badge-warning' },
    closed: { label: 'Closed', cls: 'badge-error' },
    // Task
    not_started: { label: 'Not Started', cls: 'badge-gray' },
    in_progress: { label: 'In Progress', cls: 'badge-blue' },
    submitted: { label: 'Submitted', cls: 'badge-cyan' },
    revision_required: { label: 'Revision Required', cls: 'badge-warning' },
    approved: { label: 'Approved', cls: 'badge-success' },
    overdue: { label: 'Overdue', cls: 'badge-error' },
    // Attendance
    present: { label: 'Present', cls: 'badge-success' },
    absent: { label: 'Absent', cls: 'badge-error' },
    exception: { label: 'Exception', cls: 'badge-warning' },
    pending: { label: 'Pending', cls: 'badge-warning' },
    verified: { label: 'Verified', cls: 'badge-success' },
    // Evaluation
    pending_eval: { label: 'Pending', cls: 'badge-warning' },
    submitted_eval: { label: 'Submitted', cls: 'badge-success' },
    // Active internship
    active: { label: 'Active', cls: 'badge-success' },
    completed: { label: 'Completed', cls: 'badge-primary' },
    upcoming: { label: 'Upcoming', cls: 'badge-blue' },
    on_hold: { label: 'On Hold', cls: 'badge-warning' },
    withdrawn: { label: 'Withdrawn', cls: 'badge-error' },
    // User
    inactive: { label: 'Inactive', cls: 'badge-gray' },
    // Document
    reviewed: { label: 'Reviewed', cls: 'badge-success' },
    pending_review: { label: 'Pending Review', cls: 'badge-warning' },
    // Assessment
    passed: { label: 'Passed', cls: 'badge-success' },
    failed: { label: 'Failed', cls: 'badge-error' },
    unassigned: { label: 'Unassigned', cls: 'badge-gray' },
    in_progress_intern: { label: 'In Progress', cls: 'badge-blue' },
  };
  const s = map[status] || { label: status, cls: 'badge-gray' };
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

// ============================================================
// StatCard
// ============================================================
export function StatCard({ label, value, icon: Icon, iconBg, trend, trendLabel, onClick }) {
  return (
    <div className={`stat-card ${onClick ? 'card-hover' : ''}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className={`stat-card-icon`} style={{ background: iconBg || '#EEF2FF' }}>
          {Icon && <Icon size={22} color={iconBg ? '#FFFFFF' : '#4F46E5'} />}
        </div>
        {trend && (
          <span className="stat-card-trend" style={{ color: trend > 0 ? '#16A34A' : '#DC2626' }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
        {trendLabel && <div className="text-xs text-muted" style={{ marginTop: 2 }}>{trendLabel}</div>}
      </div>
    </div>
  );
}

// ============================================================
// PageHeader
// ============================================================
export function PageHeader({ title, subtitle, actions, breadcrumbs }) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        {breadcrumbs && (
          <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>
            {breadcrumbs.join(' / ')}
          </div>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
}

// ============================================================
// SearchInput
// ============================================================
export function SearchInput({ value, onChange, placeholder = 'Search...', style }) {
  return (
    <div className="search-wrapper" style={style}>
      <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        className="search-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

// ============================================================
// Tabs
// ============================================================
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs-container">
      {tabs.map(tab => (
        <div
          key={tab.key}
          className={`tab-item ${active === tab.key ? 'active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
          {tab.count !== undefined && <span className="tab-count">{tab.count}</span>}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Modal
// ============================================================
export function Modal({ isOpen, onClose, title, children, footer, size = '' }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${size === 'lg' ? 'modal-lg' : ''} ${size === 'xl' ? 'modal-xl' : ''}`}>
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ============================================================
// ConfirmationDialog
// ============================================================
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <p style={{ color: '#475569' }}>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`} onClick={() => { onConfirm(); onClose(); }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ToastContainer
// ============================================================
const TOAST_ICONS = {
  success: <CheckCircle size={18} color="#16A34A" />,
  error: <XCircle size={18} color="#DC2626" />,
  warning: <AlertTriangle size={18} color="#F59E0B" />,
  info: <Info size={18} color="#4F46E5" />,
};

export function ToastContainer() {
  const { toasts, removeToast } = useApp();
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {TOAST_ICONS[t.type]}
          <div style={{ flex: 1, fontSize: 13.5 }}>{t.message}</div>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeToast(t.id)} style={{ padding: 2 }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// EmptyState
// ============================================================
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, color: '#334155' }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>{description}</div>}
      </div>
      {action}
    </div>
  );
}

// ============================================================
// Avatar
// ============================================================
const AVATAR_COLORS = ['avatar-indigo', 'avatar-blue', 'avatar-green', 'avatar-amber', 'avatar-rose'];
export function ProfileAvatar({ initials, size = '', name }) {
  const idx = name ? name.charCodeAt(0) % AVATAR_COLORS.length : 0;
  return (
    <div className={`avatar ${size ? `avatar-${size}` : ''} ${AVATAR_COLORS[idx]}`} title={name}>
      {initials}
    </div>
  );
}

// ============================================================
// ProgressBar
// ============================================================
export function ProgressBar({ value, color = '#4F46E5', height = 6 }) {
  return (
    <div className="progress-bar" style={{ height }}>
      <div className="progress-fill" style={{ width: `${Math.min(100, value)}%`, background: color }} />
    </div>
  );
}

// ============================================================
// FormField
// ============================================================
export function FormField({ label, required, error, hint, children }) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}{required && <span className="required">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

// ============================================================
// LoadingState
// ============================================================
export function LoadingState({ text = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 12, color: '#64748B' }}>
      <div className="loading-spinner" />
      <span>{text}</span>
    </div>
  );
}

// ============================================================
// Pagination
// ============================================================
export function Pagination({ page, total, perPage = 10, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: 13, color: '#64748B' }}>
        Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
      </span>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
          ‹ Prev
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const p = i + 1;
          return (
            <button key={p} className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onChange(p)}>
              {p}
            </button>
          );
        })}
        <button className="btn btn-secondary btn-sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
          Next ›
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Chip / MultiSelect tags
// ============================================================
export function Chip({ label, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: '#EEF2FF', color: '#4F46E5', borderRadius: 9999,
      padding: '3px 10px', fontSize: 12, fontWeight: 600,
    }}>
      {label}
      {onRemove && (
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4F46E5', lineHeight: 1, padding: 0 }}>
          <X size={12} />
        </button>
      )}
    </span>
  );
}

// ============================================================
// SectionHeader (within pages)
// ============================================================
export function SectionHeader({ title, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{title}</h3>
      {action}
    </div>
  );
}

// ============================================================
// InfoRow (label:value pairs in detail views)
// ============================================================
export function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: '#64748B', minWidth: 140, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>{value || '—'}</span>
    </div>
  );
}
