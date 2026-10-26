// Grade ke hisaab se CSS color classes return karta hai
export const getGradeBadgeColor = (grade) => {
  switch (grade) {
    case 'A+':
    case 'A':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'B+':
    case 'B':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'C':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

// Overall stats calculate karne ke liye helper
export const calculateStats = (students = []) => {
  if (!students.length) {
    return {
      totalStudents: 0,
      avgAttendance: 0,
      topPerformers: 0,
      avgCompletionRate: 0
    };
  }

  const totalStudents = students.length;
  
  const totalAttendance = students.reduce((acc, curr) => acc + curr.attendance, 0);
  const avgAttendance = Math.round(totalAttendance / totalStudents);

  const topPerformers = students.filter(s => s.grade === 'A+' || s.grade === 'A').length;

  const totalRate = students.reduce((acc, curr) => {
    return acc + ((curr.assignmentsCompleted / curr.totalAssignments) * 100);
  }, 0);
  const avgCompletionRate = Math.round(totalRate / totalStudents);

  return {
    totalStudents,
    avgAttendance,
    topPerformers,
    avgCompletionRate
  };
};