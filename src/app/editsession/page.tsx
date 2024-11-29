'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { getSessionById, updateSession } from '../../lib/dbActions';
import styles from '../../styles/sessionpage.module.css';

interface FormData {
  title: string;
  description: string;
  course: string;
  location: string;
  sessionDate: Date;
  startTime: Date;
  endTime: Date;
}

interface Session {
  id: number;
  title: string;
  description: string;
  course: string;
  location: string;
  sessionDate: Date;
  startTime: Date;
  endTime: Date;
  userId: number;
}

const EditSession = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [session, setSession] = useState<Session | null>(null);
  const { register, handleSubmit, control, setValue } = useForm<FormData>();

  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;

      const sessionData = await getSessionById(parseInt(id, 10));

      if (!sessionData) return;

      setSession(sessionData);
      setValue('title', sessionData.title);
      setValue('description', sessionData.description);
      setValue('course', sessionData.course);
      setValue('location', sessionData.location);
      setValue('sessionDate', new Date(sessionData.sessionDate));
      setValue('startTime', new Date(sessionData.startTime));
      setValue('endTime', new Date(sessionData.endTime));
    };

    fetchSession();
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!id || !session) return;

    await updateSession(parseInt(id, 10), {
      ...data,
      userId: session.userId,
    });

    swal('Success', 'Session Updated', 'success', {
      timer: 1500,
    });
  };

  return (
    <main className={styles.container}>
      {/* Header */}
      <section className={styles.header}>
        <h1>Edit Session</h1>
        <p>Fill in the details below to schedule a new session.</p>
      </section>

      {/* Form Container */}
      <section className={styles.formContainer}>
        {/* Date Picker */}
        <div className={styles.datePicker}>
          <h5>Select Date</h5>
          <Controller
            name="sessionDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="MMMM d, yyyy"
                className={styles.inputField}
                placeholderText="Select session date"
                todayButton="Today"
              />
            )}
          />
        </div>

        {/* Time Input */}
        <div className={styles.timeInputs}>
          <div className={styles.timeInput}>
            <h5>Start Time</h5>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <input
                  id="startTime"
                  type="time"
                  className={styles.inputField}
                  value={
                    field.value ? field.value.toTimeString().slice(0, 5) : ''
                  }
                  onChange={(e) => {
                    const time = new Date();
                    const [hours, minutes] = e.target.value.split(':');
                    time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                    field.onChange(time);
                  }}
                />
              )}
            />
          </div>

          <div className={styles.timeInput}>
            <h5>End Time</h5>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <input
                  id="endTime"
                  type="time"
                  className={styles.inputField}
                  value={
                    field.value ? field.value.toTimeString().slice(0, 5) : ''
                  }
                  onChange={(e) => {
                    const time = new Date();
                    const [hours, minutes] = e.target.value.split(':');
                    time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                    field.onChange(time);
                  }}
                />
              )}
            />
          </div>
        </div>
        {/* Session Title */}
        <div className={styles.inputFieldContainer}>
          <h5>Session Title</h5>
          <input
            type="text"
            placeholder="Enter session title"
            className={styles.inputField}
            {...register('title')}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <h5>Session Subject</h5>
          <input
            type="text"
            placeholder="Enter session subject"
            className={styles.inputField}
            {...register('course')}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <h5>Session Location</h5>
          <input
            type="text"
            placeholder="Enter session location"
            className={styles.inputField}
            {...register('location')}
          />
        </div>
        <div className={styles.textAreaField}>
          <h5>Description</h5>
          <textarea
            placeholder="Enter session description"
            rows={4}
            className={styles.descriptionTextarea}
            {...register('description')}
          />
        </div>
      </section>

      {/* Form with Buttons */}
      <footer className={styles.footer}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              type="button"
              variant="secondary"
              className={styles.backButton}
              as="a"
              href="../sessions"
            >
              Back
            </Button>
            <Button
              variant="danger"
              as="a"
              href="../sessions"
              className={styles.submitButton}
            >
              Delete
            </Button>
            <Button
              type="submit"
              variant="primary"
              as="a"
              href="../sessions"
              className={styles.submitButton}
            >
              Update
            </Button>
          </div>
        </Form>
      </footer>
    </main>
  );
};

export default EditSession;
