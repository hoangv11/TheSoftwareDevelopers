// pages/admin/sessions.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import AdminSessionManagement from '@/components/AdminSessionManagement'; // Import the component

const AdminSessionPage = async () => {
  const session = await getServerSession(authOptions);

  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const rawSessions = await prisma.studySession.findMany({
    include: {
      owner: {
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      user: {
        select: { id: true },
      },
    },
  });

  // Map over the sessions and exclude the unnecessary date and time properties
  const sessions = rawSessions.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    course: s.course,
    location: s.location,
    owner: s.owner,
    user: s.user,
  }));

  return (
    <Container>
      <h1>Admin: Manage Study Sessions</h1>
      <AdminSessionManagement sessions={sessions} />
    </Container>
  );
};

export default AdminSessionPage;
