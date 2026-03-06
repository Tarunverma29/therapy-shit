import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Mail, Lock, User as UserIcon, Activity, Phone, Briefcase } from 'lucide-react';
import '../styles/auth.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  mobile: string;
  profession: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    mobile: '',
    profession: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send profession as null if empty string - backend validator also handles this
      const payload = {
        ...formData,
        profession: formData.profession || null,
        mobile: formData.mobile || null,
      };

      await api.post('/signup', payload);
      setSuccess('Account created successfully! Redirecting to login…');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { detail?: string | { msg: string }[] } } };
        const detail = axiosErr.response?.data?.detail;
        if (Array.isArray(detail)) {
          setError(detail.map(d => d.msg).join(', '));
        } else {
          setError(detail || 'Signup failed. Please try again.');
        }
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
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
              autoComplete="name"
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
              autoComplete="email"
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
              autoComplete="new-password"
              minLength={8}
            />
          </div>

          <div className="input-group">
            <Phone className="input-icon" size={20} />
            <input
              name="mobile"
              type="tel"
              placeholder="Mobile Number (optional)"
              value={formData.mobile}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>

          <div className="input-group">
            <Briefcase className="input-icon" size={20} />
            <select name="profession" value={formData.profession} onChange={handleChange}>
              <option value="">Profession (optional)</option>
              <option value="therapist">Therapist</option>
              <option value="psychiatrist">Psychiatrist</option>
              <option value="counselor">Counselor</option>
            </select>
          </div>

          <button type="submit" className="primary-btn full-width" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
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
