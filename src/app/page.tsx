'use client';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../styles/home.module.css';

/** The Landing page. */
const Home = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 500);
    const contentTimer = setTimeout(() => setContentVisible(true), 1500);
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <main className={styles.landingPage}>
      <div className={styles.fadeContainer}>
        {/* Title Section */}
        <h1 className={`${styles.title} ${titleVisible ? styles.visible : ''}`}>
          Welcome to
          {' '}
          <span className={styles.brand}>ICStudy</span>
        </h1>

        {/* Subtitle and Buttons Section */}
        <div className={`${styles.content} ${contentVisible ? styles.visible : ''}`}>
          <p className={styles.subtitle}>
            Join a vibrant community of learners. Collaborate, connect, and achieve more together.
          </p>
          <div className={styles.buttonGroup}>
            <Button variant="primary" href="/auth/signin" className={styles.primaryButton}>
              Log In
            </Button>
            <Button variant="outline-light" href="/auth/signup" className={styles.secondaryButton}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
