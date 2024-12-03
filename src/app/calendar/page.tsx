'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '../../styles/calendarpage.module.css';

const Page = () => {
  const router = useRouter();

  // Example events
  const events = [
    { title: 'Meeting with Bob', date: '2024-12-01T10:00:00' },
    { title: 'Conference Call', date: '2024-12-10T14:00:00' },
    { title: 'Team Workshop', date: '2024-12-15T09:00:00' },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleCreateJoinSession = () => {
    router.push('/session');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Calendar</h1>
      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          editable
          selectable
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          allDaySlot={false}
          slotDuration="00:30:00" // Slot duration for time grid (e.g., 30-minute intervals)
          slotLabelInterval="01:00" // Interval for time slots (every hour)
          nowIndicator // Display a "now" indicator
          contentHeight="700px" // Set a fixed height for the calendar container
          height="auto"
        />
      </div>

      {/* Buttons below the calendar */}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.buttonLeft}
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className={styles.buttonRight}
          onClick={handleCreateJoinSession}
        >
          Create/Join Session
        </button>
      </div>
    </div>
  );
};

export default Page;
