import React from 'react';
import { PageHeader, SectionHeader, StatCard } from '../../components/ui';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, Users, Award, Download, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function GuideAnalytics() {
  const { addToast } = useApp();

  const gradeData = [
    { name: 'Grade O (Outstanding)', value: 1, color: '#10B981' },
    { name: 'Grade A+ (Excellent)', value: 2, color: '#4F46E5' },
    { name: 'Grade A (Very Good)', value: 0, color: '#0EA5E9' },
    { name: 'In Progress', value: 2, color: '#F59E0B' },
  ];

  const skillData = [
    { skill: 'React / Frontend', score: 88 },
    { skill: 'Node.js / Backend', score: 84 },
    { skill: 'Data Analytics / Python', score: 79 },
    { skill: 'Database / SQL', score: 82 },
    { skill: 'DevOps / Git', score: 90 },
  ];

  const handleExportCSV = () => {
    const csv = 'Student,RollNo,Company,Role,Attendance,Progress,Evaluation\nAditya Sharma,IT2021001,TechSolutions,Full Stack Intern,93%,40%,Pending\nSonal Desai,IT2021010,DevNova,Backend Intern,91%,35%,Pending\nTanvi Nair,IT2022001,ByteCraft,Flutter Intern,97%,100%,Grade A\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internbridge_guide_mentee_report.csv';
    a.click();
    addToast('Mentee academic performance CSV exported', 'success');
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Institutional Academic Analytics"
        subtitle="Departmental internship performance metrics, rubric outcome distribution, and accreditation compliance"
        actions={
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} /> Export Academic CSV
          </button>
        }
      />

      <div className="stats-grid">
        <StatCard label="Total Guided Students" value="3" icon={Users} iconBg="#EEF2FF" />
        <StatCard label="Average Attendance" value="93.6%" icon={TrendingUp} iconBg="#ECFDF5" />
        <StatCard label="Completed Internships" value="1" icon={CheckCircle} iconBg="#F5F3FF" />
        <StatCard label="Department Placement Index" value="94.2" icon={Award} iconBg="#FEF3C7" />
      </div>

      <div className="dashboard-grid" style={{ marginTop: 24 }}>
        {/* Skill attainment */}
        <div className="card">
          <SectionHeader title="Industry Skill Competency Attainment (%)" />
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis dataKey="skill" type="category" tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip formatter={val => [`${val}%`, 'Attainment']} />
                <Bar dataKey="score" fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="card">
          <SectionHeader title="Cohort Grade & Status Distribution" />
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeData.map((entry, index) => (
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
