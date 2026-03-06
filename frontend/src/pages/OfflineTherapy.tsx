import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { MapPin, Star, Clock, ArrowLeft } from 'lucide-react';
import '../styles/maps.css';

// Use the standard animejs import - vite handles the ESM resolution
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
  lat?: number;
  lng?: number;
}

const OfflineTherapy: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/therapists/local')
      .then(res => setTherapists(res.data))
      .catch(err => console.error('Failed to fetch local therapists:', err));
  }, []);

  useEffect(() => {
    if (therapists.length > 0) {
      // Animate therapist pins dropping onto the mock isometric map
      anime({
        targets: '.map-pin-container',
        translateY: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, { start: 300 }),
        easing: 'easeOutElastic(1, .6)',
      });

      anime({
        targets: '.therapist-card',
        translateX: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 600 }),
        easing: 'easeOutQuad',
      });
    }
  }, [therapists]);

  return (
    <div className="therapy-view-container">
      <div className="map-section" ref={mapRef}>
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

        <div className="isometric-map">
          {therapists.map((t, i) => (
            <div
              key={t.id}
              className="map-pin-container"
              style={{
                left: `${30 + i * 20}%`,
                top: `${40 + (i % 2 === 0 ? 15 : -10)}%`,
              }}
            >
              <div className="pin-pulse" />
              <MapPin className="map-pin-icon" size={32} />
              <div className="pin-label">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h2>Local Therapists Near You</h2>
        <div className="therapists-list">
          {therapists.map(t => (
            <div className="therapist-card" key={t.id}>
              <div className="card-header">
                <h3>{t.name}</h3>
                <span className="badge">{t.type}</span>
              </div>
              <div className="card-stats">
                <span><Star size={14} className="icon-star" /> {t.rating} ({t.reviews})</span>
                <span><Clock size={14} className="icon-clock" /> {t.slots} slots</span>
              </div>
              <div className="card-footer">
                <span className="pricing">{t.pricing}</span>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfflineTherapy;
