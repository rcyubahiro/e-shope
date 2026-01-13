import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useContexts';
import { useNotification } from '../hooks/useNotification';
import { LockKeyhole, Check } from 'lucide-react';
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First try to login with registered users
      const registeredUsers = localStorage.getItem('registeredUsers');
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers);
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          const { password: _, ...userData } = user;
          login(userData, 'mock-token-' + user.id);
          showNotification(`Welcome back, ${userData.firstName}!`, 'success');
          navigate('/');
          return;
        }
      }

      // If not found in registered users, try DummyJSON API
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password
      });

      const { token, ...userData } = response.data;
      login(userData, token);
      showNotification(`Welcome back, ${userData.firstName}!`, 'success');
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      showNotification('Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome to E-Shop</h2>
        <p className="text-gray-600 mb-6 text-center">Sign in to add items to cart & wishlist</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <LockKeyhole className="w-5 h-5" /> Account Benefits:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Save items to cart</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Create wishlist</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Manage products</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Track your orders</li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 bg-gray-100 p-3 rounded text-center">
            Forgot your login details? reset your password <Link to="/reset-password" className="text-blue-900 hover:text-blue-950 font-semibold">here</Link>.
        </p>
        
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-900 hover:text-blue-950 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
