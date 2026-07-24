"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

export interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  faculty: string;
  group: string;
  hormone: string;
}

interface StudentContextType {
  student: Student | null;
  setStudent: (student: Student | null) => void;
  clearStudent: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudentState] = useState<Student | null>(null);

  const setStudent = useCallback((student: Student | null) => {
    setStudentState(student);
  }, []);

  const clearStudent = useCallback(() => {
    setStudentState(null);
  }, []);

  const contextValue = useMemo(() => ({
    student,
    setStudent,
    clearStudent
  }), [student, setStudent, clearStudent]);

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
