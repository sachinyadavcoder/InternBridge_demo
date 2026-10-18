import React, { useState } from 'react';
import { PageHeader, Tabs, EmptyState } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { notifications } from '../../data/mockData';
import { Bell, Check, CheckCheck, Clock, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const { currentUser, addToast } = useApp();
  const [notifList, setNotifList] = useState(notifications);
  const [activeTab, setActiveTab] = useState('all');

  const role = currentUser?.role || 'company';
  const roleNotifications = notifList.filter(n => n.recipientRole === role || !n.recipientRole);

  const filtered = roleNotifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const toggleRead = (id) => {
    setNotifList(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const tabs = [
    { key: 'all', label: 'All Notifications', count: roleNotifications.length },
    { key: 'unread', label: 'Unread', count: roleNotifications.filter(n => !n.read).length },
    { key: 'read', label: 'Read', count: roleNotifications.filter(n => n.read).length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Notifications & Alerts"
        subtitle="Real-time alerts, action reminders, and workflow status changes for your active portal"
        actions={
          <button className="btn btn-secondary" onClick={markAllRead}>
            <CheckCheck size={16} /> Mark All as Read
          </button>
        }
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You are completely caught up! No notifications to display."
        />
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {filtered.map(notif => (
            <div
              key={notif.id}
              className="card card-hover"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', background: notif.read ? '#FFFFFF' : '#F0F9FF',
                borderLeft: notif.read ? '1px solid #E2E8F0' : '4px solid #0EA5E9',
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: notif.read ? '#F1F5F9' : '#E0F2FE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bell size={18} color={notif.read ? '#64748B' : '#0284C7'} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: notif.read ? 500 : 700, color: '#0F172A' }}>
                    {notif.message}
                  </div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
                    {notif.createdAt} • Category: {notif.type}
                  </div>
                </div>
              </div>

              <button
                className="btn btn-ghost btn-sm"
                onClick={() => toggleRead(notif.id)}
                title={notif.read ? 'Mark as unread' : 'Mark as read'}
              >
                {notif.read ? <Clock size={16} color="#94A3B8" /> : <Check size={16} color="#0284C7" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
