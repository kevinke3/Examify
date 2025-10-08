import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockExams, mockAssessments, mockPerformance, mockResults, mockUsers } from '../data/mocks';

const DashboardChart = ({ data, title }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="name" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const totalExams = mockExams.length;
  const upcomingAssessments = mockAssessments.filter(a => new Date(a.dueDate) > new Date()).length;
  const performanceData = mockPerformance;

  const renderAdminContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Exams</h3>
          <p className="text-3xl font-bold text-blue-600">{totalExams}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{mockUsers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h3 className="text-sm font-medium text-gray-500">Avg Performance</h3>
          <p className="text-3xl font-bold text-blue-600">82%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart data={performanceData} title="Overall Performance Trends" />
        <DashboardChart data={[{ name: 'Exams', value: totalExams }, { name: 'Assessments', value: upcomingAssessments }, { name: 'Results', value: mockResults.length }]} title="System Overview" />
      </div>
    </div>
  );

  const renderTeacherContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Teacher Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming Assessments to Grade</h3>
          <p className="text-2xl font-bold text-blue-600">{upcomingAssessments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Students Tracked</h3>
          <p className="text-2xl font-bold text-blue-600">45</p> {/* Mock */}
        </div>
      </div>
      <DashboardChart data={performanceData} title="Class Performance Trends" />
    </div>
  );

  const renderStudentContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming Exams</h3>
          <p className="text-2xl font-bold text-blue-600">{totalExams}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Completed Assessments</h3>
          <p className="text-2xl font-bold text-blue-600">{mockAssessments.filter(a => a.submitted).length}</p>
        </div>
      </div>
      <DashboardChart data={performanceData} title="My Performance Trends" />
    </div>
  );

  const content = {
    admin: renderAdminContent(),
    teacher: renderTeacherContent(),
    student: renderStudentContent(),
  };

  return <div>{content[user?.role]}</div>;
};

export default Dashboard;