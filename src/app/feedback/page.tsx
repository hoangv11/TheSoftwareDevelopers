'use client';

import React, { useState } from 'react';
import styles from '../../styles/feedbackpage.module.css';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    feedbackType: '',
    firstName: '',
    lastName: '',
    email: '',
    feedback: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headerLeft}>Share your feedback</h1>
      <p className={styles.subheader}>
        We would love to hear your thoughts, suggestions, concerns or problems with anything so we can improve.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="feedbackType">Feedback Type</label>
          <select
            id="feedbackType"
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleInputChange}
            className={styles.input}
            required
          >
            <option value="">Select Feedback Type</option>
            <option value="admin">Admin</option>
            <option value="user1">Lebron</option>
            <option value="user2">John Foo</option>
            <option value="user3">Tutor 1234</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          ></textarea>
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.buttonCentered}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;
