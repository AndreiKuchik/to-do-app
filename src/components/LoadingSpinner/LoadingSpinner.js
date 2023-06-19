import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import styles from './LoadingSpinner.module.css';

export default function Loading() {
  return (
    <p className={styles.loading} role="loading-spinner">
      <PacmanLoader color="#36d7b7" />
    </p>
  );
}
