import { useOutletContext, Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { logout } from '../store/slices/authSlice';

function DashboardPage() {
    const user = useOutletContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user.name || 'User'}</span>
                            <span className="text-sm text-gray-500">({user.email || 'Unknown'})</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {user.role === 'jobseeker' ? 'Job Seeker' :
                            user.role === 'employer' ? 'Employer' :
                                user.role === 'admin' ? 'Admin' : 'User'} Dashboard
                    </h2>
                    <p className="text-gray-600">Role: {user.role || 'Unknown'}</p>
                    <p className="text-gray-600">Email: {user.email || 'Unknown'}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">{user.role || 'Unknown'}</p>
                            <p className="text-gray-600">Your Role</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{user.name || 'Unknown'}</p>
                            <p className="text-gray-600">Display Name</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-purple-600 break-all">{user.email || 'Unknown'}</p>
                            <p className="text-gray-600">Email Address</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        to="/jobs"
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Jobs</h3>
                        <p className="text-gray-600">View all available job listings</p>
                    </Link>

                    {user.role === 'jobseeker' && (
                        <Link
                            to="/applications"
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Applications</h3>
                            <p className="text-gray-600">Track your job applications</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
