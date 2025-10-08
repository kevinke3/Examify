import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-0 right-0 left-64 z-40 w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex-1" />
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </span>
        <Button onClick={logout} className="text-sm text-gray-700 hover:text-gray-900">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;