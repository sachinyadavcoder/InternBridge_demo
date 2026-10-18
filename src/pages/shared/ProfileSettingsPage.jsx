import React, { useState } from 'react';
import { PageHeader, FormField, SectionHeader, ProfileAvatar } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { User, Mail, Shield, Bell, Save, KeyRound } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { currentUser, addToast } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Administrator');
  const [email, setEmail] = useState(currentUser?.email || 'admin@internbridge.edu');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [title, setTitle] = useState(currentUser?.title || 'System Lead');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [autoApproveGeo, setAutoApproveGeo] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Profile and institutional preferences updated successfully', 'success');
  };

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      <PageHeader
        title="Profile & Settings"
        subtitle="Manage personal account credentials, communication preferences, and security settings"
      />

      <form onSubmit={handleSave} style={{ display: 'grid', gap: 24 }}>
        {/* Profile Card */}
        <div className="card">
          <SectionHeader title="Personal Information" />
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #F1F5F9' }}>
            <ProfileAvatar name={name} initials={name.split(' ').map(n => n[0]).join('').substring(0, 2)} size="xl" />
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#0F172A' }}>{name}</h3>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{title} • Role: {currentUser?.role?.toUpperCase()}</div>
              <div style={{ fontSize: 12, color: '#4F46E5', fontWeight: 600, marginTop: 4 }}>ID: {currentUser?.id || 'U-SYS'}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormField label="Full Name" required>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} required />
            </FormField>
            <FormField label="Email Address" required>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </FormField>
            <FormField label="Direct Phone">
              <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} />
            </FormField>
            <FormField label="Designation / Title">
              <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} />
            </FormField>
          </div>
        </div>

        {/* Notifications & System Preferences */}
        <div className="card">
          <SectionHeader title="Notification Preferences" />
          <div style={{ display: 'grid', gap: 14 }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1E293B' }}>Email Notifications & Digest</div>
                <div style={{ fontSize: 12.5, color: '#64748B' }}>Receive email alerts when students submit logbooks or tasks</div>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={e => setEmailNotifs(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#4F46E5' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1E293B' }}>Auto-Verification for Geofence Matches</div>
                <div style={{ fontSize: 12.5, color: '#64748B' }}>Automatically verify attendance if check-in is strictly within 200m</div>
              </div>
              <input
                type="checkbox"
                checked={autoApproveGeo}
                onChange={e => setAutoApproveGeo(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#4F46E5' }}
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
