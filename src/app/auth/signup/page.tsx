'use client';

import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createUser, checkIfEmailExists } from '@/lib/dbActions';
import { useRouter } from 'next/navigation';
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
  const [enteredCode, setEnteredCode] = useState('');
  const [isVerificationValid, setIsVerificationValid] = useState(true);
  const [sentVerificationCode, setSentVerificationCode] = useState<number | null>(null);
  const [formData, setFormData] = useState<SignUpForm | null>(null);

  const router = useRouter();

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

  const handlePasswordBlur = (confirmPassword: string) => {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      setPasswordsMatch(passwordField.value === confirmPassword);
    }
  };

  // Send the verification code
  const sendVerificationCode = async (email: string) => {
    try {
      const response = await fetch('/api/auth/sendVerificationCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.error) {
        alert(result.error);
        return;
      }

      setVerificationCodeSent(true);
      setSentVerificationCode(result.code);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const onSubmit = async (data: SignUpForm) => {
    if (emailTaken || !isValidEmail) {
      return;
    }

    setIsSubmitting(true);

    // Save form data in state to use later
    setFormData(data);

    // Send verification code first
    await sendVerificationCode(data.email);

    // After code is sent, proceed to the next step where the user enters the verification code
    setVerificationCodeSent(true);
    setIsSubmitting(false);
  };

  const handleVerifyCode = async () => {
    if (Number(enteredCode) === sentVerificationCode && formData) {
      setIsSubmitting(true);
      console.log('Verification successful, creating user...');

      // Create user after successful verification
      await createUser(formData);
      console.log('User created successfully');

      await signIn('credentials', { callbackUrl: '/editprofile', ...formData });

      setIsSubmitting(false);
      router.push('/editprofile'); // Navigate after successful sign-up
    } else {
      setIsVerificationValid(false);
    }
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
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${(emailTaken || !isValidEmail) ? styles.invalid : ''}`}
              {...register('email', { required: 'Email is required' })}
              onBlur={(e) => validateEmail(e.target.value)}
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

          {verificationCodeSent && (
            <div className={styles.inputGroup}>
              <label htmlFor="verificationCode" className={styles.label}>
                Enter Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                className={`${styles.input} ${!isVerificationValid ? styles.invalid : ''}`}
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)} // Set entered code
                required
              />
              {!isVerificationValid && <p className={styles.error}>Invalid code entered.</p>}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting || !isValidEmail} // Disable button if email is invalid
          >
            {isSubmitting ? 'SENDING CODE...' : 'SIGN UP'}
          </button>

          {verificationCodeSent && (
            <button
              type="button"
              className={styles.button}
              onClick={handleVerifyCode}
              disabled={isSubmitting}
            >
              Verify Code and Create Account
            </button>
          )}
        </form>

        {/* Moved account prompt inside the form wrapper */}
        <div className={styles.accountPromptWrapper}>
          <p>
            Already have an account?&nbsp;
            <Link href="/auth/signin" className={styles.logIn}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
