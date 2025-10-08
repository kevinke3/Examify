import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockExams } from '../data/mocks';
import { Button } from '../components/common/Button';

const Exams = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'completed'
  const [showModal, setShowModal] = useState(false); // For creating exams (Admin/Teacher only)

  const filteredExams = mockExams.filter(exam => {
    if (filter === 'upcoming') return exam.status === 'upcoming';
    if (filter === 'completed') return exam.status === 'completed';
    return true;
  });

  const handleCreateExam = () => {
    // Later: API call to backend, e.g., fetch('/api/exams', { method: 'POST', body: JSON.stringify(newExam) })
    alert('Exam created! (Mock - Integrate with backend later)');
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{user?.role === 'student' ? 'Upcoming Exams' : 'Exams Management'}</h2>
        {(user?.role === 'admin' || user?.role === 'teacher') && (
          <Button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Create New Exam
          </Button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {['all', 'upcoming', 'completed'].map(status => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Exams Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {(user?.role === 'admin' || user?.role === 'teacher') && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExams.map(exam => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    exam.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {exam.status}
                  </span>
                </td>
                {(user?.role === 'admin' || user?.role === 'teacher') && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button className="text-blue-600 hover:text-blue-500 mr-3">Edit</Button>
                    <Button className="text-red-600 hover:text-red-500">Delete</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExams.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">No exams found.</div>
        )}
      </div>

      {/* Create Exam Modal (Placeholder) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Exam</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Exam Title" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <input type="text" placeholder="Duration (e.g., 2 hours)" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </Button>
              <Button onClick={handleCreateExam} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;