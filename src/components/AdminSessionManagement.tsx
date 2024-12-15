'use client';

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; // Use next/navigation instead
import swal from 'sweetalert';
import { deleteSession } from '../lib/dbActions'; // Import the deleteSession function

type AdminSessionManagementProps = {
  sessions: {
    id: number;
    title: string;
    description: string;
    course: string;
    location: string;
    owner: {
      id: number;
      profile?: {
        firstName: string;
        lastName: string;
      } | null;
    };
    user: {
      id: number;
    }[];
  }[];
};

const AdminSessionManagement: React.FC<AdminSessionManagementProps> = ({ sessions }) => {
  const router = useRouter();

  // Function to handle delete button click
  const handleDeleteClick = async (sessionId: number) => {
    // Confirm with the user before deleting
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this session!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteSession(sessionId); // Use deleteSession function to delete the session
          swal('Your session has been deleted!', {
            icon: 'success',
          });
          router.refresh(); // Refresh the page after deletion
        } catch (error) {
          console.error('Error deleting session:', error);
        }
      } else {
        swal('Cancelled Deletion!');
      }
    });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Course</th>
          <th>Location</th>
          <th>Owner</th>
          <th>Users</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session) => (
          <tr key={session.id}>
            <td>{session.id}</td>
            <td>{session.title}</td>
            <td>{session.description}</td>
            <td>{session.course}</td>
            <td>{session.location}</td>
            <td>
              {session.owner.profile
                ? `${session.owner.profile.firstName} ${session.owner.profile.lastName}`
                : 'No profile'}
            </td>
            <td>
              {session.user.map((user) => (
                <div key={user.id}>
                  User
                  {' '}
                  {user.id}
                </div>
              ))}
            </td>
            <td>
              {/* Delete button */}
              <Button
                variant="danger"
                className="ml-2"
                onClick={() => handleDeleteClick(session.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminSessionManagement;
