'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/sessionpage.module.css';

export default function SessionPage() {
  // State variables for form inputs
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Handlers for the inputs
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value);
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value);

  const handleSubmit = () => {
    if (new Date(`1970-01-01T${endTime}:00Z`) <= new Date(`1970-01-01T${startTime}:00Z`)) {
      alert('End time must be after the start time!'); // eslint-disable-line no-alert
      return;
    }

    console.log('Session Details:', { startDate, location, description, startTime, endTime });
    alert('Session created successfully!'); // eslint-disable-line no-alert
  };

  const handleBack = () => {
    console.log('Back button clicked');
    alert('Going back to the previous page!'); // eslint-disable-line no-alert
  };

  return (
    <main className={styles.container}>
      {/* Header */}
      <section className={styles.header}>
        <h1>Create a New Session</h1>
        <p>Fill in the details below to schedule a new session.</p>
      </section>

      {/* Form Container */}
      <section className={styles.formContainer}>

        {/* Date Picker */}
        <div className={styles.datePicker}>
          <h3>Select Date</h3>
          <DatePicker
            id="date"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            placeholderText="Select session date"
            dateFormat="MMMM d, yyyy"
            className={styles.inputField}
          />
        </div>

        {/* Time Input */}
        <div className={styles.timeInputs}>
          <div className={styles.timeInput}>
            <h3>Start Time</h3>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.timeInput}>
            <h3>End Time</h3>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              className={styles.inputField}
            />
          </div>
        </div>

        {/* Location Input */}
        <div className={styles.inputFieldContainer}>
          <h3>Location</h3>
          <input
            id="location"
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter session location"
            className={styles.inputField}
          />
        </div>

        {/* Description */}
        <div className={styles.textAreaField}>
          <h3>Description</h3>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter session description"
            rows={4}
            className={styles.descriptionTextarea}
          />
        </div>
      </section>

      {/* Buttons */}
      <footer className={styles.footer}>
        <button type="button" className={styles.backButton} onClick={handleBack}>
          Back
        </button>
        <button type="button" className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </footer>
    </main>
  );
}
