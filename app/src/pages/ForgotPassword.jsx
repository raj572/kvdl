import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await apiRequest('/api/admin/password/forgot', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });

            if (response.success) {
                setMessage(response.message);
                setEmail('');
            }
        } catch (err) {
            setError(err.message || 'Failed to send reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f0dd] to-[#e8d5b7] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-black text-white p-8 text-center">
                        <h1 className="text-4xl font-[arkhip] mb-2">KVDL</h1>
                        <p className="text-sm uppercase tracking-widest opacity-60">Admin Panel</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <h2 className="text-2xl font-[arkhip] text-black mb-2">Forgot Password?</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        {message && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <p className="text-sm text-green-800">{message}</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                    placeholder="admin@example.com"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            <div className="text-center">
                                <Link
                                    to="/admin/login"
                                    className="text-sm text-black/60 hover:text-black transition-colors font-medium"
                                >
                                    ← Back to Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
