import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingSection from './components/LandingSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import TeamSection from './components/TeamSection';
import MapComponent from './components/mapComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/map" element={<MapComponent />} />
          </Routes>
      </div>
      </Router>
      <Footer />
    </div>
  );
}

const HomePage = () => (
  <>
    <LandingSection />
    <FeaturesSection />
    <ContactSection />
    <TeamSection />
  </>
);

export default App;