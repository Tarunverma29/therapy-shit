import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Mail, Lock, User as UserIcon, Activity, Phone, Briefcase } from 'lucide-react';
import '../styles/auth.css';

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        profession: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/signup', formData);
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card signup-card">
                <div className="auth-header">
                    <div className="logo-container">
                        <Activity className="app-logo" size={32} />
                    </div>
                    <h2>Create Account</h2>
                    <p>Join our platform today</p>
                </div>

                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                <form onSubmit={handleSignup} className="auth-form two-col-form">
                    <div className="input-group full-width">
                        <UserIcon className="input-icon" size={20} />
                        <input
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Phone className="input-icon" size={20} />
                        <input
                            name="mobile"
                            type="tel"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <Briefcase className="input-icon" size={20} />
                        <select name="profession" value={formData.profession} onChange={handleChange}>
                            <option value="">Select Profession (Optional)</option>
                            <option value="therapist">Therapist</option>
                            <option value="psychiatrist">Psychiatrist</option>
                            <option value="counselor">Counselor</option>
                        </select>
                    </div>

                    <button type="submit" className="primary-btn full-width">
                        Create Account
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
