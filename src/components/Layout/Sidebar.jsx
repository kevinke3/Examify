import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

const navItems = {
  admin: [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/exams', label: 'Exams', icon: '📝' },
    { to: '/assessments', label: 'Assessments', icon: '📋' },
    { to: '/results', label: 'Results', icon: '📈' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ],
  teacher: [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/exams', label: 'Exams', icon: '📝' },
    { to: '/assessments', label: 'Assessments', icon: '📋' },
    { to: '/results', label: 'Results', icon: '📈' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ],
  student: [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/exams', label: 'Upcoming Exams', icon: '📅' },
    { to: '/assessments', label: 'Assessments', icon: '📋' },
    { to: '/results', label: 'My Results', icon: '📈' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const items = navItems[user?.role] || [];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 bg-blue-50">
        <h1 className="text-xl font-bold text-blue-600">Examify</h1>
      </div>
      <nav className="mt-5 px-2 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;