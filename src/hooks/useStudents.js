import { useState, useEffect, useMemo } from 'react';
import { initialStudents } from '../utils/studentData';
import { useLocalStorage } from './useLocalStorage'; // Custom hook import kiya

export const useStudents = () => {
  // LocalStorage use karke students state maintain karna
  const [students, setStudents] = useLocalStorage('dashboard_students', initialStudents);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('ALL');

  // Simulated Async Data Fetching (First load par thoda delay)
  const fetchStudents = () => {
    setLoading(true);
    setTimeout(() => {
      // Agar localStorage me pehle se data hai toh wahi rahega, warna initialStudents
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Naya student add karne ka function
  const addStudent = (newStudent) => {
    setStudents((prevStudents) => [newStudent, ...prevStudents]);
  };

  // Filtered students based on search query & selected grade
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGrade = 
        selectedGrade === 'ALL' || student.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [students, searchTerm, selectedGrade]);

  return {
    students: filteredStudents,
    rawStudents: students,
    loading,
    searchTerm,
    setSearchTerm,
    selectedGrade,
    setSelectedGrade,
    refetch: fetchStudents,
    addStudent
  };
};