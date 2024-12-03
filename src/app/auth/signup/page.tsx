'use client';

import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createUser, checkIfEmailExists } from '@/lib/dbActions';
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

  // Function to check if email is already taken
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

  // Validate email when the user finishes typing (onBlur)
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

  // Handle when the user changes the email field
  const handleEmailChange = async (value: string) => {
    setEmailTaken(false);
    setIsValidEmail(true);
    clearErrors('email');
    await checkEmailTaken(value);
  };

  const handlePasswordBlur = (confirmPassword: string) => {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      setPasswordsMatch(passwordField.value === confirmPassword);
    }
  };

  const onSubmit = async (data: SignUpForm) => {
    if (emailTaken) {
      setError('email', { type: 'manual', message: 'Email is already taken.' });
      return;
    }

    setIsSubmitting(true);

    await createUser(data);
    await signIn('credentials', { callbackUrl: '/editprofile', ...data });

    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>

        <p className={styles.descriptionCentered}>
          Sign up using your @hawaii.edu email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Email Field */}
          <div className={styles.inputGroup}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${(emailTaken || !isValidEmail) ? styles.invalid : ''}`}
              {...register('email', { required: 'Email is required' })}
              onBlur={(e) => validateEmail(e.target.value)}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
            />
            {(emailTaken || !isValidEmail) && (
              <p className={styles.error}>
                {emailTaken ? 'Email is already taken.' : 'Email must end with @hawaii.edu.'}
              </p>
            )}
            {/* Only show react-hook-form error if there's no manual email error */}
            {!emailTaken && isValidEmail && errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.inputGroup}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
