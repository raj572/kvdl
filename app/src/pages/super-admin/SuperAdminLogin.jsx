import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { superAdminLogin } from '../../services/api';
import { setSuperToken, isSuperAuthenticated } from '../../super-admin/superAuth';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuperAuthenticated()) {
      navigate('/super-admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await superAdminLogin({ email, password });
      if (response.success && response.token) {
        setSuperToken(response.token);
        navigate('/super-admin/dashboard', { replace: true });
      } else {
        setError('Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden font-noto">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#AF221F] opacity-10 blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#AF221F] opacity-5 blur-[120px]"></div>
      
      {/* Login Card */}
      <div className="w-full max-w-md bg-[#121212] border border-[#f8f0dd]/10 p-8 rounded-2xl shadow-2xl relative z-10 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-[#AF221F] text-[#f8f0dd] font-[arkhip] px-4 py-2 text-xl mb-4 rounded-lg tracking-wider">
            KVDL
          </div>
          <h1 className="text-2xl font-[arkhip] text-[#f8f0dd] uppercase tracking-wide">
            Super-Admin Panel
          </h1>
          <p className="text-sm text-[#f8f0dd]/50 mt-2">
            Authorized Personnel Only
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#AF221F]/10 border border-[#AF221F]/30 text-[#AF221F] text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
              placeholder="developer@kvdl.in"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#AF221F] hover:bg-[#8e1b18] text-[#f8f0dd] font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 cursor-pointer text-sm uppercase tracking-wider"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
