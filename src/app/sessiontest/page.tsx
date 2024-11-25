'use client';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/sessionpage.module.css';

export default function SessionPage() {
  const handleSubmit = () => {
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement)
      .value;
    const description = (
      document.getElementById('description') as HTMLTextAreaElement
    ).value;

    // You can handle validation and form submission logic here
    console.log('Session Details:', { title, location, description });
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
        {/* Session Title */}
        <div className={styles.inputFieldContainer}>
          <h3>Session Title</h3>
          <input
            id="title"
            type="text"
            placeholder="Enter session title"
            className={styles.inputField}
          />
        </div>
      </section>

      {/* Buttons */}
      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </footer>
    </main>
  );
}
