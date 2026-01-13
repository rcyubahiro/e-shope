import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import { KeyRound, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [step, setStep] = useState(1); // 1: email, 2: verification, 3: new password
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if email exists in registered users
    const registeredUsers = localStorage.getItem('registeredUsers');
    if (registeredUsers) {
      const users = JSON.parse(registeredUsers);
      const user = users.find(u => u.email === email);
      
      if (user) {
        // Simulate sending email
        setTimeout(() => {
          setLoading(false);
          setStep(2);
          showNotification('Verification code sent to your email!', 'success');
        }, 1000);
        return;
      }
    }

    setLoading(false);
    showNotification('Email not found. Please check and try again.', 'error');
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    // Simulate verification (in real app, this would verify with backend)
    if (verificationCode === '123456' || verificationCode.length === 6) {
      setStep(3);
      showNotification('Code verified! Please set your new password.', 'success');
    } else {
      showNotification('Invalid verification code. Try 123456 for demo.', 'error');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showNotification('Password must be at least 6 characters long!', 'warning');
      return;
    }

    setLoading(true);

    // Update password in localStorage
    const registeredUsers = localStorage.getItem('registeredUsers');
    if (registeredUsers) {
      const users = JSON.parse(registeredUsers);
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        setTimeout(() => {
          setLoading(false);
          showNotification('Password reset successfully! Please login.', 'success');
          navigate('/login');
        }, 1000);
        return;
      }
    }

    setLoading(false);
    showNotification('Something went wrong. Please try again.', 'error');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 py-12">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-blue-900" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-600">
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && "Enter the verification code sent to your email"}
            {step === 3 && "Create your new password"}
          </p>
        </div>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {/* Step 2: Verification Code */}
        {step === 2 && (
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                A 6-digit verification code has been sent to <strong>{email}</strong>
              </p>
              <p className="text-xs text-blue-600 mt-2">Demo code: 123456</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                maxLength="6"
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-center text-2xl tracking-widest"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded transition-colors"
            >
              Verify Code
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-blue-900 hover:text-blue-950 font-semibold py-2 transition-colors"
            >
              Resend Code
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" /> New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-blue-900 hover:text-blue-950 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
