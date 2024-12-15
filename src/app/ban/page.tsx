import React from 'react';
import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { adminProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { banUser } from '@/lib/dbActions';
import { Container, Table, Button } from 'react-bootstrap';

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

  const handleBan = async (userId: number) => {
    await banUser(userId);
    window.location.reload();
  };

  return (
    <Container>
      <h1>Manage Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.banned ? 'Yes' : 'No'}</td>
              <td>
                {!user.banned && (
                  <Button variant="danger" onClick={() => handleBan(user.id)}>
                    Ban
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminBanPage;
