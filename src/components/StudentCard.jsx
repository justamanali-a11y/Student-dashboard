import React from 'react';
import { getGradeBadgeColor } from '../utils/helper';
// import { withLogger } from './withLogger'; // Agar logger HOC use karna ho

export const StudentCard = ({ student, onSelectStudent }) => {
  const completionPercentage = Math.round(
    (student.assignmentsCompleted / student.totalAssignments) * 100
  );

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-950/20 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header - Clickable Avatar & Name */}
        <div className="flex items-start justify-between gap-3">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onSelectStudent(student)}
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700 group-hover:border-indigo-500 transition-colors"
            />
            <div>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                {student.name}
              </h3>
              <p className="text-xs text-slate-400">{student.email}</p>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getGradeBadgeColor(
              student.grade
            )}`}
          >
            {student.grade}
          </span>
        </div>

        {/* Course Info */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
            {student.course}
          </span>
        </div>

        {/* Stats Row */}
        <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Attendance</p>
            <p className="text-sm font-bold text-slate-200 mt-0.5">{student.attendance}%</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Status</p>
            <p className="text-sm font-bold text-emerald-400 mt-0.5">{student.status}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Assignments Done</span>
            <span className="text-slate-200 font-semibold">
              {student.assignmentsCompleted}/{student.totalAssignments} ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-4 pt-3 border-t border-slate-800/50 flex justify-between items-center text-xs text-slate-500">
        <span>ID: {student.id}</span>
        <button 
          onClick={() => onSelectStudent(student)}
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          View Profile →
        </button>
      </div>
    </div>
  );
};