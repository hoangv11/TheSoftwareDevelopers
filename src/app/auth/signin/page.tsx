'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from '@/styles/signin.module.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const result = await signIn('credentials', {
      callbackUrl: '/userHome',
      email,
      password,
    });

    console.log(result); // Log the result to see the structure of the response

    if (result?.error) {
      if (result.error === 'Invalid credentials') {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError('Sign in failed. Please try again later.');
      }
    } else {
      setMessage('Sign in successful!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign In</h1>
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
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.accountPromptWrapper}>
          <p>
            Don&apos;t have an account?
            {' '}
            <a href="/auth/signup" className={`${styles.signInLink} ${styles.boldLink}`}>Sign up</a>
          </p>
          <p>
            <a href="/auth/forgot-password" className={styles.forgotPassword}>Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
