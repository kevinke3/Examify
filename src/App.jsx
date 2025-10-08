import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Assessments from './pages/Assessments';
import Results from './pages/Results';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (roles.length && !roles.includes(user?.role)) return <Navigate to="/dashboard" />;
  return children;
};

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex flex-col flex-1 ml-64">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/exams"
          element={
            <ProtectedRoute roles={['admin', 'teacher', 'student']}>
              <Layout>
                <Exams />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessments"
          element={
            <ProtectedRoute roles={['admin', 'teacher', 'student']}>
              <Layout>
                <Assessments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute roles={['admin', 'teacher', 'student']}>
              <Layout>
                <Results />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;