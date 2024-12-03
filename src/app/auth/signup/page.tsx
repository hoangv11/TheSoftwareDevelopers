'use client';

import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';
import Link from 'next/link';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recheckPassword, setRecheckPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [recheckPasswordTouched, setRecheckPasswordTouched] = useState(false);

  const validateEmail = (value: string) => {
    setEmail(value);
    if (value) {
      setIsValidEmail(value.endsWith('@hawaii.edu'));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordsMatch(value === recheckPassword);
  };

  const handleRecheckPasswordChange = (value: string) => {
    setRecheckPassword(value);
  };

  const handleBlurRecheckPassword = () => {
    setRecheckPasswordTouched(true);
    setPasswordsMatch(password === recheckPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || !passwordsMatch) {
      return;
    }
    // Submit form logic here...
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>

        <p className={styles.descriptionCentered}>
          Sign up using your @hawaii.edu email
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${!isValidEmail ? styles.invalid : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              required
            />
            {!isValidEmail && (
              <p className={styles.error}>Email must end with @hawaii.edu.</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="recheckPassword" className={styles.label}>
              Recheck Password
            </label>
            <input
              type="password"
              id="recheckPassword"
              className={`${styles.input} ${!passwordsMatch && recheckPasswordTouched ? styles.invalid : ''}`}
              value={recheckPassword}
              onChange={(e) => handleRecheckPasswordChange(e.target.value)}
              onBlur={handleBlurRecheckPassword}
              required
            />
            {!passwordsMatch && recheckPasswordTouched && (
              <p className={styles.error}>Passwords do not match.</p>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </div>

      {/* Centered account prompt */}
      <div className={styles.accountPromptWrapper}>
        <p>
          Already have an account?
          <Link href="/auth/signin" className={styles.signInLink}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
