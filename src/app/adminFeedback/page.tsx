import AdminFeedback from '@/components/AdminFeedback';
import React from 'react';
import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { adminProtectedPage } from '@/lib/page-protection';
import { Container } from 'react-bootstrap';

const AdminFeedbackPage = async () => {
  const session = await getServerSession(authOptions);

  // Ensure the adminProtectedPage is executed for session validation
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const adminEmail = session?.user?.email;

  return ( // Ensure you return the JSX here
    <Container>
      <div>
        <h1>
          Welcome,
          {adminEmail}
        </h1>
        <AdminFeedback />
      </div>
    </Container>
  );
};

export default AdminFeedbackPage;
