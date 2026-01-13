import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useContexts';
import { useNotification } from '../hooks/useNotification';
import { ShieldCheck, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAsAdmin } = useAuth();
  const { showNotification } = useNotification();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Admin credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    try {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const adminData = {
          id: 'admin-001',
          username: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@eshop.com',
          role: 'admin'
        };
        
        loginAsAdmin(adminData, 'admin-token-' + Date.now());
        showNotification('Admin login successful!', 'success');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials');
        showNotification('Invalid admin credentials', 'error');
      }
    } catch (err) {
      setError('Login failed');
      showNotification('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <ShieldCheck className="w-12 h-12 text-blue-900" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h2>
          <p className="text-gray-600">Secure access for administrators only</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Admin Access Only
          </h3>
          <p className="text-sm text-red-800">
            This area is restricted to authorized administrators. Unauthorized access attempts are logged.
          </p>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Admin Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter admin username"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Admin Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-100 rounded text-sm text-gray-600">
          <p className="font-semibold mb-2">Demo Admin Credentials:</p>
          <p>Username: <code className="bg-white px-2 py-1 rounded">admin</code></p>
          <p>Password: <code className="bg-white px-2 py-1 rounded">admin123</code></p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-blue-900 hover:text-blue-950 font-semibold"
          >
            ← Back to User Login
          </Link>
        </div>
      </div>
    </div>
  );
}
