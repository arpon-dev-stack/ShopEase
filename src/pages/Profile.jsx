import { CircleUserRound } from 'lucide-react';
import { logout } from '../services/auth/authSlice';
import { useDispatch } from 'react-redux';

function Profile() {
    const dispatch = useDispatch()

  return (
    <div className="flex bg-blue-200 min-h-screen">
      {/* Sidebar Column */}
      <div className="w-80 bg-white border-r p-4 flex flex-col gap-4">
        {/* User Icon and Header */}
        <div className="flex items-center gap-2 pb-4 border-b">
          <CircleUserRound className="h-8 w-8 text-gray-600" />
          <span className="font-semibold text-gray-700">User Account</span>
        </div>

        {/* Three Row Menu */}
        <nav className="flex flex-col gap-1">
          <button className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
            Profile
          </button>
          <button className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
            Settings
          </button>
          <button onClick={() => dispatch(logout())} className="flex items-center p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors whitespace-nowrap"> Log out
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-full p-8">
        <h1 className="text-2xl font-bold">Your buying history</h1>
      </div>
    </div>
  );
}

export default Profile;