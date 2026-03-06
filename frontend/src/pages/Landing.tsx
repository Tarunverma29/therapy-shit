import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Map, Globe, User } from 'lucide-react';
import '../styles/landing.css';

const Landing: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="landing-container">
            <nav className="navbar">
                <div className="nav-brand">TherapyPlatform</div>
                <div className="nav-user">
                    <span className="user-greeting">
                        <User size={18} /> Hi, {user?.name || 'User'}
                    </span>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </nav>

            <main className="landing-content">
                <header className="hero-section">
                    <h1>Choose Your Therapy Path</h1>
                    <p>Find the right connection, whether locally or globally.</p>
                </header>

                <div className="choices-grid">
                    <div className="choice-card" onClick={() => navigate('/offline')}>
                        <div className="choice-icon-wrapper">
                            <Map size={48} className="choice-icon" />
                        </div>
                        <h2>Local Offline Therapy</h2>
                        <p>Explore an immersive isometric city view to find therapists near you. Step into local clinics virtually.</p>
                        <div className="choice-action">Explore City Map →</div>
                    </div>

                    <div className="choice-card" onClick={() => navigate('/online')}>
                        <div className="choice-icon-wrapper">
                            <Globe size={48} className="choice-icon global" />
                        </div>
                        <h2>Global Online Therapy</h2>
                        <p>Connect with professionals worldwide through our interactive 7-segment continent ring.</p>
                        <div className="choice-action">Explore Globe →</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;
