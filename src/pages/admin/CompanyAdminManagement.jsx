import React, { useState } from 'react';
import {
  PageHeader, StatusBadge, SearchInput, Tabs, Modal, FormField, SectionHeader, InfoRow, EmptyState,
} from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { companies, internships } from '../../data/mockData';
import { Building2, Plus, Globe, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function CompanyAdminManagement() {
  const { addToast } = useApp();
  const [compList, setCompList] = useState(companies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComp, setSelectedComp] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('Nashik');
  const [contact, setContact] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState('');

  const filteredCompanies = compList.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCompany = (e) => {
    e.preventDefault();
    const newComp = {
      id: `c${Date.now()}`,
      name,
      domain,
      location,
      website: `${name.toLowerCase().replace(/\s+/g, '')}.in`,
      contact,
      contactEmail,
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0],
      description,
    };
    setCompList(prev => [newComp, ...prev]);
    addToast('New corporate partner registered successfully', 'success');
    setIsAddOpen(false);
    setName('');
    setDomain('');
    setContact('');
    setContactEmail('');
    setDescription('');
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Corporate Partner Management"
        subtitle="Manage industrial partnerships, company agreements, and employer recruitment profiles"
        actions={
          <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
            <Plus size={16} /> Register Partner Company
          </button>
        }
      />

      <div className="card" style={{ marginBottom: 20 }}>
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search corporate partners by name, domain, city..." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
        {filteredCompanies.map(comp => {
          const compPostings = internships.filter(i => i.companyId === comp.id);

          return (
            <div key={comp.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={24} color="#4F46E5" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0F172A' }}>{comp.name}</h4>
                      <div style={{ fontSize: 12.5, color: '#64748B' }}>{comp.domain}</div>
                    </div>
                  </div>
                  <StatusBadge status={comp.status} />
                </div>

                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 14 }}>
                  {comp.description}
                </p>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 12.5, color: '#334155', display: 'grid', gap: 4 }}>
                  <div><strong>Location:</strong> {comp.location}</div>
                  <div><strong>Key Contact:</strong> {comp.contact} ({comp.contactEmail})</div>
                  <div><strong>Open Positions:</strong> {compPostings.length} Posted Roles</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setSelectedComp(comp)}>
                  Partner Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedComp && (
        <Modal
          isOpen={Boolean(selectedComp)}
          onClose={() => setSelectedComp(null)}
          title={`Corporate Partner: ${selectedComp.name}`}
          footer={<button className="btn btn-secondary" onClick={() => setSelectedComp(null)}>Close</button>}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            <InfoRow label="Industry Domain" value={selectedComp.domain} />
            <InfoRow label="Headquarters" value={selectedComp.location} />
            <InfoRow label="Corporate Website" value={selectedComp.website} />
            <InfoRow label="Primary HR POC" value={selectedComp.contact} />
            <InfoRow label="Contact Email" value={selectedComp.contactEmail} />
            <InfoRow label="Registered Date" value={selectedComp.registeredAt} />
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Company Overview</label>
              <div style={{ fontSize: 13.5, color: '#1E293B', marginTop: 4 }}>{selectedComp.description}</div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Company Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Register Corporate Partner"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <button className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddCompany}>Register Company</button>
            </div>
          }
        >
          <form onSubmit={handleAddCompany} style={{ display: 'grid', gap: 12 }}>
            <FormField label="Company Name" required>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Infosys Labs" required />
            </FormField>
            <FormField label="Industry Domain" required>
              <input className="form-input" value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. Cloud Computing & AI" required />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormField label="Location / City" required>
                <input className="form-input" value={location} onChange={e => setLocation(e.target.value)} required />
              </FormField>
              <FormField label="HR Contact Person" required>
                <input className="form-input" value={contact} onChange={e => setContact(e.target.value)} placeholder="Full Name" required />
              </FormField>
            </div>
            <FormField label="Contact Email" required>
              <input className="form-input" type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="hr@company.com" required />
            </FormField>
            <FormField label="Company Profile Overview">
              <textarea className="form-textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief company summary..." />
            </FormField>
          </form>
        </Modal>
      )}
    </div>
  );
}
