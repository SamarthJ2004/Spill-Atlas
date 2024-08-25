import React from 'react';
import { Circles } from 'react-loading-icons';
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <Circles stroke="#ffffff" />
        <p>Fetching data...</p>
      </div>
    </div>
  );
};

export default Loading;