'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '../../styles/calendarpage.module.css';

// Define a type for the study sessions
type StudySession = {
  id: number;
  startTime: Date;
  endTime: Date;
  title: string;
  description?: string;
};

const Page = () => {
  const router = useRouter();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions');
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        const data = await response.json();

        // Transform sessions into FullCalendar event format
        const calendarEvents = data.map((session: StudySession) => ({
          id: session.id.toString(),
          title: session.title,
          start: new Date(session.startTime),
          end: new Date(session.endTime),
          allDay: false,
        }));

        setSessions(calendarEvents);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleCreateJoinSession = () => {
    router.push('/session');
  };

  if (isLoading) {
    return <div className={styles.container}>Loading sessions...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Calendar</h1>
      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={sessions}
          editable
          selectable
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          allDaySlot={false}
          slotDuration="00:30:00"
          slotLabelInterval="01:00"
          nowIndicator
          contentHeight="700px"
          height="auto"
        />
      </div>

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
