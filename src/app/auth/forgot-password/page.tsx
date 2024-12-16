'use client';

import { useState } from 'react';
import styles from '@/styles/passwordpage.module.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Forgot Password</h1>
        <p className={styles.description}>
          Enter your email address, and we&apos;ll send you a temporary password to reset your account.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your email"
          />
          <button type="submit" className={styles.submitBtn}>
            Send Temporary Password
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.accountPromptWrapper}>
          <p>
            Remembered your password?&nbsp;
            <a href="/auth/signin" className={`${styles.signInLink} ${styles.boldLink}`}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
