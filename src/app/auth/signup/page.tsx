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
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailTaken, setEmailTaken] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .matches(/@hawaii.edu$/, 'Email must end with @hawaii.edu'),
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
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const validateEmail = async (value: string) => {
    setValue('email', value);
    setIsValidEmail(value.endsWith('@hawaii.edu'));
    if (value && isValidEmail) {
      const exists = await checkIfEmailExists(value);
      setEmailTaken(exists);
    }
  };

  const handlePasswordBlur = (confirmPassword: string) => {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      setPasswordsMatch(passwordField.value === confirmPassword);
    }
  };

  const onSubmit = async (data: SignUpForm) => {
    if (emailTaken) {
      return;
    }

    await createUser(data);
    await signIn('credentials', { callbackUrl: '/editprofile', ...data });
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
              className={`${styles.input} ${!isValidEmail || emailTaken ? styles.invalid : ''}`}
              {...register('email')}
              onBlur={(e) => validateEmail(e.target.value)}
              required
            />
            {!isValidEmail && (
              <p className={styles.error}>Email must end with @hawaii.edu.</p>
            )}
            {emailTaken && <p className={styles.error}>Email is already taken.</p>}
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
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
            {!passwordsMatch && (
              <p className={styles.error}>Passwords must match.</p>
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
