'use client';

import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toggleBanUser } from '@/lib/dbActions'; // Import the action

const UserManagement = ({
  users,
}: {
  users: { id: number; email: string; role: string; banned: boolean }[];
}) => {
  const [localUsers, setLocalUsers] = useState(users);

  const handleToggleBan = async (userId: number, shouldBan: boolean) => {
    try {
    // Update the database
      await toggleBanUser(userId, shouldBan);

      // Update the local state
      // eslint-disable-next-line max-len
      setLocalUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, banned: shouldBan } : user)));
    } catch (error) {
      console.error('Failed to toggle user ban status:', error);
    }
  };

  return (
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
        {localUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.banned ? 'Yes' : 'No'}</td>
            <td>
              <Button
                variant={user.banned ? 'success' : 'danger'}
                onClick={() => handleToggleBan(user.id, !user.banned)}
              >
                {user.banned ? 'Unban' : 'Ban'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserManagement;
