import React from 'react';
import { PageHeader, SectionHeader } from '../../components/ui';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  internships, applications, activeInternships, applicationActivityData, applicationStatusData, monthlyInternshipData,
} from '../../data/mockData';
import { Download } from 'lucide-react';

const COLORS = ['#4F46E5', '#0EA5E9', '#16A34A', '#F59E0B', '#DC2626'];

export default function CompanyReports() {
  const myInternships = internships.filter(i => i.companyId === 'c1');
  const myApps = applications.filter(a => a.companyId === 'c1');
  const myActive = activeInternships.filter(ai => ai.companyId === 'c1');

  const applicationsPerInternship = myInternships.map(i => ({
    name: i.title.split(' ').slice(0, 3).join(' '),
    applications: i.applications,
    vacancies: i.vacancies,
  }));

  const handleExport = () => {
    const rows = myApps.map(a => `${a.studentId},${a.internshipId},${a.status},${a.compatibilityScore},${a.assessmentScore || ''}`);
    const csv = ['Student,Internship,Status,Match%,AssessScore', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'internbridge_applications.csv';
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Insights into your internship program performance."
        actions={<button className="btn btn-outline" onClick={handleExport}><Download size={15} />Export CSV</button>}
      />

      {/* Summary row */}
      <div className="grid-4" style={{ gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Applications', value: myApps.length, color: '#4F46E5' },
          { label: 'Selection Rate', value: `${Math.round((myApps.filter(a => a.status === 'selected').length / Math.max(myApps.length, 1)) * 100)}%`, color: '#16A34A' },
          { label: 'Assessment Completion', value: `${Math.round((myApps.filter(a => a.assessmentStatus !== 'pending').length / Math.max(myApps.length, 1)) * 100)}%`, color: '#0EA5E9' },
          { label: 'Active Interns', value: myActive.filter(ai => ai.status === 'active').length, color: '#F59E0B' },
        ].map(m => (
          <div key={m.label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 20, marginBottom: 20 }}>
        <div className="card">
          <SectionHeader title="Applications per Internship" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={applicationsPerInternship} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="applications" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Applications" />
              <Bar dataKey="vacancies" fill="#E0E7FF" radius={[4, 4, 0, 0]} name="Vacancies" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <SectionHeader title="Application Status Distribution" />
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={applicationStatusData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {applicationStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <SectionHeader title="Monthly Internship Activity" />
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={applicationActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4, fill: '#4F46E5' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
