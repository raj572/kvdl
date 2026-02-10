import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../services/api';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const token = window.location.pathname.split('/').pop();
    const email = searchParams.get('email');

    useEffect(() => {
        if (!token || !email) {
            setError('Invalid password reset link.');
        }
    }, [token, email]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setLoading(false);
            return;
        }

        try {
            const response = await apiRequest('/api/admin/password/reset', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    token,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                }),
            });

            if (response.success) {
                setMessage(response.message);
                setTimeout(() => {
                    navigate('/admin/login');
                }, 2000);
            }
        } catch (err) {
            setError(err.message || 'Failed to reset password. Please try again.');
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
                        <h2 className="text-2xl font-[arkhip] text-black mb-2">Reset Password</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Enter your new password below.
                        </p>

                        {message && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <p className="text-sm text-green-800">{message}</p>
                                <p className="text-xs text-green-600 mt-1">Redirecting to login...</p>
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
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Enter new password"
                                    disabled={loading || !token || !email}
                                    minLength={8}
                                />
                                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Confirm new password"
                                    disabled={loading || !token || !email}
                                    minLength={8}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !token || !email}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
