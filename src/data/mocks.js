// Mock data for exams, assessments, and performance
export const mockExams = [
  { id: 1, title: 'Mathematics Final Exam', date: '2023-12-15', duration: '2 hours', status: 'upcoming' },
  { id: 2, title: 'Science Quiz', date: '2023-11-20', duration: '1 hour', status: 'completed' },
  { id: 3, title: 'History Assessment', date: '2023-10-10', duration: '90 mins', status: 'completed' },
];

export const mockAssessments = [
  { id: 1, title: 'Essay on Literature', dueDate: '2023-12-01', submitted: true, score: 85 },
  { id: 2, title: 'Physics Homework', dueDate: '2023-11-25', submitted: false, score: null },
  { id: 3, title: 'Biology Report', dueDate: '2023-12-05', submitted: true, score: 92 },
];

export const mockPerformance = [
  { name: 'Mathematics', value: 85 },
  { name: 'Science', value: 78 },
  { name: 'History', value: 92 },
  { name: 'Literature', value: 88 },
];

export const mockResults = [
  { id: 1, examId: 1, studentName: 'John Doe', score: 92, total: 100, date: '2023-12-15' },
  { id: 2, examId: 2, studentName: 'Jane Smith', score: 85, total: 100, date: '2023-11-20' },
  { id: 3, examId: 3, studentName: 'Bob Johnson', score: 78, total: 100, date: '2023-10-10' },
];

export const mockUsers = [
  { id: 1, name: 'Alice Teacher', role: 'teacher', email: 'alice@school.com' },
  { id: 2, name: 'Charlie Student', role: 'student', email: 'charlie@school.com' },
];