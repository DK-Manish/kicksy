import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as authApi from '../api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    setResetLink(null);
    try {
      const res = await authApi.forgotPassword(email);
      setResetLink(res.data.reset_link || null);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Forgot password</h1>
      <p className="text-sm text-gray-500 mb-8">Enter your email and we'll generate a reset link.</p>

      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        {resetLink ? (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-md space-y-2">
            <p>Reset link generated (shown here for testing — in production this would be emailed):</p>
            <Link to={resetLink.replace(window.location.origin, '')} className="block break-all text-amber-600 hover:underline font-medium">
              {resetLink}
            </Link>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? 'Generating link...' : 'Send reset link'}
            </button>
          </>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Remembered your password?{' '}
        <Link to="/login" className="text-amber-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}