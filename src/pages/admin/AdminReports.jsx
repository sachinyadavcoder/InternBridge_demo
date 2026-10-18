import React from 'react';
import { PageHeader, SectionHeader, StatCard } from '../../components/ui';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Download, FileSpreadsheet, TrendingUp, Award, Building2, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminReports() {
  const { addToast } = useApp();

  const domainData = [
    { name: 'Web / Full Stack', value: 4, color: '#4F46E5' },
    { name: 'Data / AI / ML', value: 3, color: '#0EA5E9' },
    { name: 'Backend / Cloud', value: 2, color: '#10B981' },
    { name: 'Mobile / IoT', value: 1, color: '#F59E0B' },
  ];

  const deptData = [
    { dept: 'Information Technology', students: 4, placed: 3, stipend: 13500 },
    { dept: 'Computer Science', students: 2, placed: 1, stipend: 16000 },
  ];

  const handleExportAccreditationCSV = () => {
    const csv = 'Student ID,Roll Number,Student Name,Department,CGPA,Company,Industry Domain,Role,Stipend (INR),Work Mode,Start Date,End Date,Supervisor,College Guide,Academic Grade\n' +
      's1,IT2021001,Aditya Sharma,IT,8.4,TechSolutions,Web Development,Full Stack Intern,15000,Onsite,2025-01-15,2025-07-15,Rahul Desai,Prof. Anjali Patil,Pending\n' +
      's4,IT2021010,Sonal Desai,IT,7.5,DevNova Technologies,Backend,Backend Intern,14000,Onsite,2025-01-20,2025-05-20,Sneha Kulkarni,Prof. Suresh Nair,Pending\n' +
      's6,IT2022001,Tanvi Nair,IT,8.0,ByteCraft Systems,Mobile,Flutter Intern,10000,Remote,2024-09-01,2024-11-30,Sneha Kulkarni,Prof. Anjali Patil,Grade A\n';

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internbridge_university_accreditation_report.csv';
    a.click();
    addToast('NAAC / NBA institutional accreditation CSV exported', 'success');
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Institutional Reports & Accreditation Analytics"
        subtitle="Comprehensive placement statistics, corporate salary benchmarks, and official regulatory audit reports"
        actions={
          <button className="btn btn-primary" onClick={handleExportAccreditationCSV}>
            <Download size={16} /> Export Accreditation CSV (NAAC/NBA)
          </button>
        }
      />

      <div className="stats-grid">
        <StatCard label="Overall Placement Ratio" value="66.7%" icon={TrendingUp} iconBg="#ECFDF5" />
        <StatCard label="Average Monthly Stipend" value="₹14,000" icon={Award} iconBg="#EEF2FF" />
        <StatCard label="Recruitment Partners" value="4 Companies" icon={Building2} iconBg="#FEF3C7" />
        <StatCard label="Dual Supervision Compliance" value="100%" icon={Users} iconBg="#F5F3FF" />
      </div>

      <div className="dashboard-grid" style={{ marginTop: 24 }}>
        {/* Department Comparison */}
        <div className="card">
          <SectionHeader title="Departmental Internship Participation & Stipend" />
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="dept" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="students" name="Eligible Students" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placed" name="Internships Secured" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Distribution */}
        <div className="card">
          <SectionHeader title="Industry Domain Distribution" />
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
