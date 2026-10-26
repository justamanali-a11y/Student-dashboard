import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const AnalyticsGraph = ({ students }) => {
  // Students data ko chart ke format me prepare karna
  const chartData = students.map((student) => ({
    name: student.name.split(' ')[0], // Sirf pehla naam dikhane ke liye
    attendance: student.attendance,
    assignments: student.assignmentsCompleted,
  }));

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Performance Analytics</h3>
          <p className="text-xs text-slate-400">Student-wise attendance and assignment progress</p>
        </div>
        <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-lg font-medium">
          Live Metrics
        </span>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
            />
            <Bar dataKey="attendance" fill="#6366f1" radius={[6, 6, 0, 0]} name="Attendance (%)" />
            <Bar dataKey="assignments" fill="#10b981" radius={[6, 6, 0, 0]} name="Assignments Done" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};