import { useAuth } from '../context/AuthContext';
import { mockResults, mockPerformance } from '../data/mocks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Results = () => {
  const { user } = useAuth();
  const avgScore = mockResults.reduce((sum, r) => sum + r.score, 0) / mockResults.length || 0;

  // Filter results based on role (mock: for student, show only their results)
  const filteredResults = user?.role === 'student'
    ? mockResults.filter(r => r.studentName === 'John Doe') // Mock personal filter
    : mockResults;

  const renderAdminContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">System Results & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Results</h3>
          <p className="text-3xl font-bold text-blue-600">{filteredResults.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
          <p className="text-3xl font-bold text-blue-600">{avgScore.toFixed(1)}%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Results Table</h3>
          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResults.map(result => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Exam {result.examId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{result.score}/{result.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTeacherContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Class Results</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Average: {avgScore.toFixed(1)}%</h3>
        {/* Simplified table for teacher */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map(result => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{result.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStudentContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Results</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Average: {avgScore.toFixed(1)}%</h3>
        {/* Personal results list */}
        <ul className="space-y-4">
          {filteredResults.map(result => (
            <li key={result.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
              <div>
                <p className="font-medium text-gray-900">Exam {result.examId}</p>
                <p className="text-sm text-gray-500">{result.date}</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">{result.score}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const content = {
    admin: renderAdminContent(),
    teacher: renderTeacherContent(),
    student: renderStudentContent(),
  };

  return <div>{content[user?.role]}</div>;
};

export default Results;