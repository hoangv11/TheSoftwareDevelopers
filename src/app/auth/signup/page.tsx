// src/app/auth/signup/page.tsx

'use client';

import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Send email to backend to request verification code
      const res = await fetch('/api/auth/sendVerificationCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Verification code sent to your email!');
        console.log('Verification code sent:', data.code); // Check the code sent by the backend
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error while sending the verification email.');
      console.error('Error:', err);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code entered:', verificationCode);
    // Here you can add logic to verify the entered code with the backend if necessary
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Verification Code</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleVerifyCode}>
        <div>
          <label htmlFor="code">Enter Verification Code:</label>
          <input
            type="text"
            id="code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify Code</button>
      </form>
    </div>
  );
};

export default Signup;
