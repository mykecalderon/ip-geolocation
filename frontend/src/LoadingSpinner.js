import React from 'react';
import spinner from './loading.gif';

const LoadingSpinner = () => (
  <div>
    <img src={spinner} className="loading-spinner" alt="loading-spinner" /> Loading...
  </div>
);

export default LoadingSpinner;