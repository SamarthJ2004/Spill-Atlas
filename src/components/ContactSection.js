import React from 'react';
import '../styles/ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Contact Us</h2>
        <p>For inquiries or support, feel free to reach out to us.</p>
        <a href="mailto:support@oilspilldetection.com" className="contact-btn">Get in Touch</a>
      </div>
    </section>
  );
};

export default ContactSection;
