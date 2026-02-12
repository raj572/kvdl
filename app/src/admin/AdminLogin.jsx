import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import { isAuthenticated, setAdminToken } from './adminAuth';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await adminLogin(formData);
            if (response?.success && response?.token) {
                setAdminToken(response.token);
                navigate('/admin', { replace: true });
            } else {
                setErrorMessage(response?.message || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            setErrorMessage(error?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-dvh bg-background text-foreground px-6 py-24">
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm">
                <p className="text-xs font-[arkhip] uppercase tracking-[0.35em] text-foreground/60">
                    Admin Access
                </p>
                <h1 className="mt-2 text-3xl font-[arkhip] tracking-wide">
                    Sign In
                </h1>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                    <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm text-foreground"
                            placeholder="admin@company.com"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm text-foreground"
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-sm text-primary">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.2em] text-background transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="text-center mt-4">
                        <a
                            href="/admin/forgot-password"
                            className="text-sm text-foreground/60 hover:text-primary transition-colors"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>

                <p className="mt-6 text-xs text-foreground/60">
                    Use the admin credentials configured on the backend.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
