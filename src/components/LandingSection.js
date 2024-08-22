import React from 'react';
import '../styles/LandingSection.css'; // Create a CSS file if needed
import { Link } from 'react-router-dom';

const LandingSection = () => {
  return (
    <section id="home" className="landing-section">
      <div className="landing-content">
        <h2>Early Detection of Oil Spills and Vessel Distress</h2>
        <p>Integrating AIS and satellite datasets for real-time maritime monitoring.</p>
        <Link to='/map' className="cta-btn">Learn More</Link>
      </div>
    </section>
  );
};
export default LandingSection;
