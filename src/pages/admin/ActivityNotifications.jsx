import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, Tabs, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { activityEvents, notifications } from '../../data/mockData';
import { Activity, Bell, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function ActivityNotifications() {
  const [activeTab, setActiveTab] = useState('events');

  const tabs = [
    { key: 'events', label: 'System Audit Events', count: activityEvents.length },
    { key: 'notifications', label: 'Admin Alerts', count: notifications.filter(n => n.recipientRole === 'admin').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Activity Audit & Notifications"
        subtitle="Institutional system activity logs, security trails, and real-time operational notifications"
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === 'events' ? (
        <div className="card">
          <div style={{ display: 'grid', gap: 16 }}>
            {activityEvents.map((evt, idx) => (
              <div
                key={evt.id}
                style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  paddingBottom: idx === activityEvents.length - 1 ? 0 : 16,
                  borderBottom: idx === activityEvents.length - 1 ? 'none' : '1px solid #F1F5F9',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Activity size={18} color="#4F46E5" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', lineHeight: 1.4 }}>
                    {evt.message}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    Triggered by <strong style={{ color: '#334155' }}>{evt.actor}</strong> • {evt.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div style={{ display: 'grid', gap: 12 }}>
            {notifications.filter(n => n.recipientRole === 'admin').map(notif => (
              <div key={notif.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, background: notif.read ? '#FFFFFF' : '#F0FDF4', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <Bell size={18} color={notif.read ? '#64748B' : '#16A34A'} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: notif.read ? 400 : 600, color: '#1E293B' }}>{notif.message}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{notif.createdAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
