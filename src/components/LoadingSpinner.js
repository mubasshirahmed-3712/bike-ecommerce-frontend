import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../styles/LoadingSpinner.css';  // Importing CSS for spinner

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <Spinner animation="border" variant="primary" />
  </div>
);

export default LoadingSpinner;
