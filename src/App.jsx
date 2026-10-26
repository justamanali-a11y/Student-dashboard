import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StatsCard } from './components/StatsCard';
import { StudentCard } from './components/StudentCard';
import { AddStudentModal } from './components/AddStudentModal';
import { withLoading } from './components/withLoading';
import { useStudents } from './hooks/useStudents';
import { AnalyticsGraph } from './components/AnalyticsGraph';
import { calculateStats, getGradeBadgeColor } from './utils/helper';

// Student Profile Detail Modal
const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  const completionRate = Math.round(
    (student.assignmentsCompleted / student.totalAssignments) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{student.name}</h2>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-md border ${getGradeBadgeColor(student.grade)}`}>
                {student.grade}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{student.email}</p>
            <span className="inline-block mt-2 text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md font-medium">
              {student.course}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Student ID</span>
              <p className="text-sm font-bold text-slate-200 mt-0.5">{student.id}</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Account Status</span>
              <p className="text-sm font-bold text-emerald-400 mt-0.5">{student.status}</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Overall Attendance</span>
              <p className="text-sm font-bold text-indigo-400 mt-0.5">{student.attendance}%</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Grade Average</span>
              <p className="text-sm font-bold text-amber-400 mt-0.5">{student.grade}</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400">Assignments Completion</span>
              <span className="text-white font-bold">{student.assignmentsCompleted} / {student.totalAssignments} ({completionRate}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

// HOC-Wrapped Components
const StudentGridWithLoading = withLoading(({ students, onSelectStudent }) => {
  if (students.length === 0) {
    return (
      <div className="col-span-full py-16 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
        <p className="text-slate-400 font-medium">No students found matching your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} onSelectStudent={onSelectStudent} />
      ))}
    </div>
  );
});

const StatsGridWithLoading = withLoading(({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard title="Total Students" value={stats.totalStudents} subtitle="Active Enrolled" icon="👨‍🎓" color="indigo" />
      <StatsCard title="Avg Attendance" value={`${stats.avgAttendance}%`} subtitle="Across all courses" icon="📅" trend="+2.4%" color="emerald" />
      <StatsCard title="Top Performers" value={stats.topPerformers} subtitle="Grade A & A+" icon="🏆" color="amber" />
      <StatsCard title="Avg Completion" value={`${stats.avgCompletionRate}%`} subtitle="Assignments submitted" icon="📈" color="blue" />
    </div>
  );
});

export default function App() {
  const {
    students,
    rawStudents,
    loading,
    searchTerm,
    setSearchTerm,
    selectedGrade,
    setSelectedGrade,
    refetch,
    addStudent
  } = useStudents();

  const [showConceptGuide, setShowConceptGuide] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stats = calculateStats(rawStudents);
  const gradeOptions = ['ALL', 'A+', 'A', 'B+', 'B', 'C'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={refetch}
        isRefreshing={loading}
      />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Student Dashboard UI
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              React demo showing Custom Hooks, HOCs, LocalStorage persistence, Analytics Graph, and interactive modals.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <span>➕</span>
              <span>Add Student</span>
            </button>
            <button
              onClick={() => setShowConceptGuide(!showConceptGuide)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 rounded-xl border border-slate-700 transition-colors whitespace-nowrap"
            >
              {showConceptGuide ? 'Hide Concepts' : '💡 View Concepts'}
            </button>
          </div>
        </div>

        {showConceptGuide && (
          <div className="mb-8 p-6 bg-slate-900/90 border border-indigo-500/30 rounded-2xl text-xs space-y-4 text-slate-300">
            <div>
              <span className="font-bold text-indigo-400 text-sm">1. Custom Hooks (`useStudents` & `useLocalStorage`)</span>
              <p className="mt-1 text-slate-400">Encapsulates search, filters, data fetching, and browser persistent storage.</p>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <span className="font-bold text-emerald-400 text-sm">2. Higher-Order Component (`withLoading`)</span>
              <p className="mt-1 text-slate-400">Wraps grid components to handle asynchronous loading states smoothly.</p>
            </div>
          </div>
        )}

        {/* Stats Grid Overview */}
        <StatsGridWithLoading isLoading={loading} stats={stats} />

        {/* Analytics Graph Component */}
        <AnalyticsGraph students={rawStudents} />

        {/* Student Roster Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">Student Roster</h3>
            <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full font-medium border border-slate-700">
              {students.length} showing
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-500 mr-1 font-medium">Filter Grade:</span>
            {gradeOptions.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  selectedGrade === grade
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        <StudentGridWithLoading
          isLoading={loading}
          students={students}
          onSelectStudent={(student) => setSelectedStudent(student)}
        />
      </main>

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={addStudent}
      />
    </div>
  );
}