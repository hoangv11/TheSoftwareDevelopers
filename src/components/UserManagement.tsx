'use client';

import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const UserManagement = ({ users }: { users: { id: number; email: string; role: string; banned: boolean }[] }) => {
  const [localUsers, setLocalUsers] = useState(users);

  const handleBan = async (userId: number) => {
    try {
      await fetch('/api/banUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      setLocalUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, banned: true } : user)));
    } catch (error) {
      console.error('Failed to ban user:', error);
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
  );
};

export default UserManagement;
