import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, FormField, SectionHeader, ProfileAvatar, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { users } from '../../data/mockData';
import { ShieldCheck, Plus, Search, User, Mail, UserCheck } from 'lucide-react';

export default function UserManagement() {
  const { addToast } = useApp();
  const [userList, setUserList] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('guide');
  const [title, setTitle] = useState('');

  const filteredUsers = userList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    return true;
  });

  const handleToggleStatus = (userId) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'inactive' : 'active';
        addToast(`User ${u.name} status updated to ${nextStatus}`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const newUser = {
      id: `u-${Date.now()}`,
      role,
      name,
      email,
      avatar: initials,
      title: title || 'Staff Member',
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0],
    };
    setUserList(prev => [newUser, ...prev]);
    addToast(`New ${role} user account created`, 'success');
    setIsAddOpen(false);
    setName('');
    setEmail('');
    setTitle('');
  };

  const tabs = [
    { key: 'all', label: 'All Users', count: userList.length },
    { key: 'company', label: 'Company HR', count: userList.filter(u => u.role === 'company').length },
    { key: 'supervisor', label: 'Supervisors', count: userList.filter(u => u.role === 'supervisor').length },
    { key: 'guide', label: 'Guides', count: userList.filter(u => u.role === 'guide').length },
    { key: 'admin', label: 'Admins', count: userList.filter(u => u.role === 'admin').length },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Users & Role-Based Access Control"
        subtitle="Manage platform accounts, security privileges, and multi-portal credentials across all institutional roles"
        actions={
          <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
            <Plus size={16} /> Create User Account
          </button>
        }
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <Tabs tabs={tabs} active={roleFilter} onChange={setRoleFilter} />
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search user name or email..." />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role Portal</th>
                <th>Designation / Title</th>
                <th>Account Status</th>
                <th>Joined Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ProfileAvatar name={user.name} initials={user.avatar} size="sm" />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${
                      user.role === 'company' ? 'badge-primary' :
                      user.role === 'supervisor' ? 'badge-cyan' :
                      user.role === 'guide' ? 'badge-purple' : 'badge-warning'
                    }`} style={{ textTransform: 'capitalize' }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: '#334155' }}>
                    {user.title || (user.department ? `${user.department} Faculty` : 'Staff')}
                  </td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td style={{ fontSize: 13, color: '#64748B' }}>{user.joinedAt}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Create New User Account"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddUser}>Create User</button>
            </div>
          }
        >
          <form onSubmit={handleAddUser} style={{ display: 'grid', gap: 12 }}>
            <FormField label="Full Name" required>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Dr. Kavita Deshmukh" required />
            </FormField>
            <FormField label="Email Address" required>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="kavita@institution.edu" required />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormField label="Assigned Role" required>
                <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="company">Company Recruiter</option>
                  <option value="supervisor">Industry Supervisor</option>
                  <option value="guide">College Faculty Guide</option>
                  <option value="admin">College Placement Admin</option>
                </select>
              </FormField>
              <FormField label="Job Title / Designation">
                <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Associate Professor" />
              </FormField>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
