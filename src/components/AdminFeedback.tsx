/* eslint-disable max-len */

'use client';

import { getFeedback, resolveTrue } from '@/lib/dbActions';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

interface Feedback {
  id: number;
  feedbackType: string;
  firstName: string;
  lastName: string;
  email: string;
  feedback: string;
  isResolved: boolean;
  createdAt: string;
}

const AdminFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const feedback = await getFeedback();
      const formattedFeedback = feedback.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(), // Convert Date to string
      }));
      setFeedbacks(formattedFeedback);
    };

    fetchFeedbacks();
  }, []);

  const resolveFeedback = async (id: number) => {
    // Call the resolveTrue function to update the feedback as resolved in the database
    await resolveTrue(id);

    // Update the local state to reflect the change (optional)
    setFeedbacks((prevFeedbacks) => prevFeedbacks.map((feedback) => (feedback.id === id ? { ...feedback, isResolved: true } : feedback)));
  };

  return (
    <div>
      <h1>Admin Feedback Dashboard</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Type</th>
            <th style={{ padding: '10px' }}>First Name</th>
            <th style={{ padding: '10px' }}>Last Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Feedback</th>
            <th style={{ padding: '10px' }}>Resolved</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td style={{ padding: '10px' }}>{feedback.id}</td>
              <td style={{ padding: '10px' }}>{feedback.feedbackType}</td>
              <td style={{ padding: '10px' }}>{feedback.firstName}</td>
              <td style={{ padding: '10px' }}>{feedback.lastName}</td>
              <td style={{ padding: '10px' }}>{feedback.email}</td>
              <td style={{ padding: '10px' }}>{feedback.feedback}</td>
              <td style={{ padding: '10px' }}>
                {feedback.isResolved ? 'Yes' : 'No'}
              </td>
              <td style={{ padding: '10px' }}>
                {!feedback.isResolved && (
                  <Button onClick={() => resolveFeedback(feedback.id)}>
                    Resolve
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedback;
