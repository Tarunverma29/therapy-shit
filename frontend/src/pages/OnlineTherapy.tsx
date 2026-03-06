import React, { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import anime from 'animejs/lib/anime.es.js';
import { Globe, Star, Clock } from 'lucide-react';
import '../styles/maps.css';

const OnlineTherapy: React.FC = () => {
    const [therapists, setTherapists] = useState<any[]>([]);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch mock therapists
        api.get('/therapists/global')
            .then(res => setTherapists(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (ringRef.current) {
            anime({
                targets: '.continent-segment',
                rotate: (_el: Element, i: number, l: number) => (i * (360 / l)) + 'deg',
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: anime.stagger(100),
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
            });
        }

        if (therapists.length > 0) {
            anime({
                targets: '.therapist-card',
                translateY: [20, 0],
                opacity: [0, 1],
                delay: anime.stagger(100, { start: 500 }),
                easing: 'easeOutSine'
            });
        }
    }, [therapists]);

    const continents = ['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania', 'Antarctica'];

    return (
        <div className="therapy-view-container online-view">
            <div className="global-map-section">
                <div className="globe-container">
                    <Globe className="main-globe-icon" size={120} />
                    <div className="continent-ring" ref={ringRef}>
                        {continents.map((cont, i) => (
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
