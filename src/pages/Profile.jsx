import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

const Profile = () => {
  const { user, login } = useAuth(); // login can update user if needed
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || 'john@example.com', // Mock email if not in auth
    role: user?.role || '',
    bio: user?.bio || 'Student at Example University', // Mock bio
  });

  const handleSave = () => {
    // Validation
    if (!profileData.name || !profileData.email) {
      alert('Name and email are required.');
      return;
    }
    // Later: API call, e.g., fetch('/api/profile', { method: 'PUT', body: JSON.stringify(profileData) })
    alert('Profile updated successfully! (Mock - Integrate with backend later)');
    setIsEditing(false);
    // Update auth context: login({ ...user, ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original if needed
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
      <div className="max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-blue-600">{profileData.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
            <p className="text-sm text-blue-600 capitalize">{profileData.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p className={`px-3 py-2 bg-gray-50 rounded-md ${isEditing ? 'text-gray-500 italic' : 'text-gray-900'}`}>
              {profileData.role} (Admin/Teacher/Student)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          {isEditing ? (
            <>
              <Button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;