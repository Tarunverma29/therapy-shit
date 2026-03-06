import React, { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import anime from 'animejs/lib/anime.es.js';
import { MapPin, Star, Clock } from 'lucide-react';
import '../styles/maps.css';

const OfflineTherapy: React.FC = () => {
    const [therapists, setTherapists] = useState<any[]>([]);
    const mapRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch mock therapists
        api.get('/therapists/local')
            .then(res => setTherapists(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (therapists.length > 0 && mapRef.current) {
            // Animate therapist pins dropping onto the mock isometric map
            anime({
                targets: '.map-pin-container',
                translateY: [-50, 0],
                opacity: [0, 1],
                delay: anime.stagger(150, { start: 300 }),
                easing: 'easeOutElastic(1, .6)'
            });

            anime({
                targets: '.therapist-card',
                translateX: [40, 0],
                opacity: [0, 1],
                delay: anime.stagger(100, { start: 600 }),
                easing: 'easeOutQuad'
            });
        }
    }, [therapists]);

    return (
        <div className="therapy-view-container">
            <div className="map-section" ref={mapRef}>
                <div className="isometric-map">
                    {therapists.map((t, i) => (
                        <div
                            key={t.id}
                            className="map-pin-container"
                            style={{
                                left: `${30 + (i * 20)}%`,
                                top: `${40 + (i % 2 === 0 ? 15 : -10)}%`
                            }}
                        >
                            <div className="pin-pulse"></div>
                            <MapPin className="map-pin-icon" size={32} />
                            <div className="pin-label">{t.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-section" ref={cardsRef}>
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
