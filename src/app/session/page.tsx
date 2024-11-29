'use client';

import { Form, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSession } from '@/lib/dbActions';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import { CreateSessionSchema } from '@/lib/validationSchemas';
import swal from 'sweetalert';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from '../../styles/sessionpage.module.css';

const onSubmit = async (
  data: {
    title: string;
    description: string;
    course: string;
    location: string;
    sessionDate: Date;
    startTime: Date;
    endTime: Date;
  },
  session: any,
) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  const userId = parseInt(session?.user?.id, 10);
  await createSession({
    ...data,
    added: true,
    userId,
    id: userId,
  });

  swal('Success', 'Created Session', 'success', {
    timer: 1000,
  });
};

const CreateSession: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(CreateSessionSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

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
        <Form onSubmit={handleSubmit((data) => onSubmit(data, session))}>
          <div className="d-flex justify-content-between">
            <Button
              type="button"
              variant="secondary"
              className={styles.backButton}
              onClick={() => {
                console.log('Back button clicked');
                // Handle back action
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              className={styles.submitButton}
            >
              Submit
            </Button>
          </div>
        </Form>
      </footer>
    </main>
  );
};

export default CreateSession;
