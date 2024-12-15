import React from 'react';
import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { adminProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';
import UserManagement from '@/components/UserManagement'; // Import the client component

const AdminBanPage = async () => {
  const session = await getServerSession(authOptions);

  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, banned: true },
  });

  return (
    <Container>
      <h1>Manage Users</h1>
      <UserManagement users={users} />
      {' '}
      {/* Pass data to the client component */}
    </Container>
  );
};

export default AdminBanPage;
