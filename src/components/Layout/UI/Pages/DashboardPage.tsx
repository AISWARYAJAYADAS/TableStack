import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearAuth } from '@/store/slices/authSlice';

function DashboardPage() {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearAuth());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your TableStack Dashboard
              </h2>
              <p className="text-gray-600">
                You are successfully authenticated with Auth0!
              </p>
              {user && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-medium text-gray-900">User Information:</h3>
                  <p className="text-sm text-gray-600">Email: {user.email}</p>
                  <p className="text-sm text-gray-600">Name: {user.name}</p>
                  <p className="text-sm text-gray-600">Status: ✅ Authenticated</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;