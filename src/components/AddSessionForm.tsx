'use client';

import { useState } from 'react';

export default function SessionPage() {
  // State variables for form inputs
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // Handlers for the inputs
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value);
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const handleSubmit = () => {
    console.log('Session Details:', { time, location, description });
    alert('Session created successfully!');
  };

  const handleBack = () => {
    console.log('Back button clicked');
    alert('Going back to the previous page!');
  };

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navbar */}
      <header style={{ backgroundColor: '#f8f9fa', padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
        <nav>
          <h1 style={{ margin: 0 }}>Navbar</h1>
        </nav>
      </header>

      {/* Page Content */}
      <section style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2>Creating Session</h2>
      </section>

      {/* Time and Location */}
      <section style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', padding: '0 10%' }}>
        <div>
          <label htmlFor="time">
            <h3>Time</h3>
          </label>
          <input
            id="time"
            type="text"
            value={time}
            onChange={handleTimeChange}
            placeholder="Enter session time"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
            }}
          />
        </div>
        <div>
          <label htmlFor="location">
            <h3>Location</h3>
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter session location"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
            }}
          />
        </div>
      </section>

      {/* Description */}
      <section style={{ marginTop: '20px', textAlign: 'center' }}>
        <label htmlFor="description">
          <h3>Description</h3>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter session description"
          rows={4}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '80%',
            resize: 'vertical',
          }}
        />
      </section>

      {/* Footer Buttons */}
      <footer style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', padding: '0 10%' }}>
        <button
          type="button"
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </footer>
    </main>
  );
}
