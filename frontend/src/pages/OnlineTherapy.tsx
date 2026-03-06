import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Globe, Star, Clock, ArrowLeft } from 'lucide-react';
import '../styles/maps.css';

// Use the standard animejs import
import anime from 'animejs';

interface Therapist {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  pricing: string;
  slots: number;
  location: string;
}

const CONTINENTS = ['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania', 'Antarctica'];

const OnlineTherapy: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/therapists/global')
      .then(res => setTherapists(res.data))
      .catch(err => console.error('Failed to fetch global therapists:', err));
  }, []);

  // Animate continent ring on mount (no dependency on therapists)
  useEffect(() => {
    if (ringRef.current) {
      anime({
        targets: '.continent-segment',
        rotate: (_el: Element, i: number, total: number) => `${i * (360 / total)}deg`,
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutElastic(1, .8)',
      });
    }
  }, []); // runs once on mount

  // Animate therapist cards when data arrives
  useEffect(() => {
    if (therapists.length > 0) {
      anime({
        targets: '.therapist-card',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 200 }),
        easing: 'easeOutSine',
      });
    }
  }, [therapists]); // runs when therapists data loads

  return (
    <div className="therapy-view-container online-view">
      <div className="global-map-section">
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(15,23,42,0.8)',
            color: '#A5B4FC',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: '10px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            zIndex: 20,
            fontSize: '0.9rem',
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="globe-container">
          <Globe className="main-globe-icon" size={120} />
          <div className="continent-ring" ref={ringRef}>
            {CONTINENTS.map((cont, i) => (
              <div className="continent-segment" key={i}>
                <div className="segment-label">{cont}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h2>Global Therapists</h2>
        <div className="therapists-list">
          {therapists.map(t => (
            <div className="therapist-card" key={t.id}>
              <div className="card-header">
                <h3>{t.name}</h3>
                <span className="badge">{t.location}</span>
              </div>
              <div className="card-stats">
                <span><Star size={14} className="icon-star" /> {t.rating} ({t.reviews})</span>
                <span><Clock size={14} className="icon-clock" /> {t.slots} slots next 24h</span>
              </div>
              <div className="card-footer">
                <span className="pricing">{t.pricing}</span>
                <button className="book-btn">Book Video</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineTherapy;
