'use client';

import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createUser, checkIfEmailExists, sendVerificationCode } from '@/lib/dbActions';
import { signIn } from 'next-auth/react';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailTaken, setEmailTaken] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const checkEmailTaken = async (email: string) => {
    const exists = await checkIfEmailExists(email);
    if (exists) {
      setEmailTaken(true);
      setError('email', { type: 'manual', message: 'Email is already taken.' });
    } else {
      setEmailTaken(false);
      clearErrors('email');
    }
  };

  const validateEmail = async (value: string) => {
    setValue('email', value);
    const isEmailValid = value.endsWith('@hawaii.edu');

    if (!isEmailValid) {
      setIsValidEmail(false);
      setError('email', { type: 'manual', message: 'Email must end with @hawaii.edu.' });
    } else {
      setIsValidEmail(true);
      clearErrors('email');
      await checkEmailTaken(value);
    }
  };

  const handleEmailChange = async (value: string) => {
    setEmailTaken(false);
    setIsValidEmail(true);
    clearErrors('email');
    await validateEmail(value);
  };

  const handlePasswordBlur = (confirmPassword: string) => {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      setPasswordsMatch(passwordField.value === confirmPassword);
    }
  };

  const onSubmit = async (data: SignUpForm) => {
    setIsSubmitting(true); // Start submission
    if (emailTaken) {
      setError('email', { type: 'manual', message: 'Email is already taken.' });
      setIsSubmitting(false); // Stop submission
      return;
    }

    // Send the verification code to the user's email
    const verificationCode = await sendVerificationCode(data.email);
    setVerificationCode(verificationCode);
    setVerificationCodeSent(true);

    setIsSubmitting(false); // Stop submission after code is sent
  };

  const handleVerificationCodeSubmit = async () => {
    if (inputCode === verificationCode) {
      setIsCodeValid(true);
      // Create the user account after successful code verification
      await createUser({ email: verificationCode, password: 'password' });
      await signIn('credentials', { callbackUrl: '/editprofile' });
    } else {
      setIsCodeValid(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>

        <p className={styles.descriptionCentered}>
          Sign up using your @hawaii.edu email
        </p>

        {!verificationCodeSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`${styles.input} ${(emailTaken || !isValidEmail) ? styles.invalid : ''}`}
                {...register('email', { required: 'Email is required' })}
                onBlur={(e) => validateEmail(e.target.value)}
                onChange={(e) => handleEmailChange(e.target.value)} // Ensure this matches the function name
                required
              />
              {(emailTaken || !isValidEmail) && (
                <p className={styles.error}>
                  {emailTaken ? 'Email is already taken.' : 'Email must end with @hawaii.edu.'}
                </p>
              )}
              {!emailTaken && isValidEmail && errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`${styles.input} ${errors.password ? styles.invalid : ''}`}
                {...register('password')}
                required
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Recheck Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`${styles.input} ${(!passwordsMatch && errors.confirmPassword) ? styles.invalid : ''}`}
                {...register('confirmPassword')}
                onBlur={(e) => handlePasswordBlur(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword.message}</p>
              )}
              {!passwordsMatch && !errors.confirmPassword && (
                <p className={styles.error}>Passwords must match.</p>
              )}
            </div>

            <button type="submit" className={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <div className={styles.verificationWrapper}>
            <h2>Enter the verification code sent to your email</h2>
            <input
              type="text"
              className={styles.input}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Verification Code"
            />
            <button onClick={handleVerificationCodeSubmit} className={styles.button}>
              Verify Code
            </button>
            {!isCodeValid && <p className={styles.error}>Invalid verification code.</p>}
          </div>
        )}
      </div>

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
