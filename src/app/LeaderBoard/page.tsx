import React from 'react';
import { Table } from 'react-bootstrap';
import { getAllProfilesSorted } from '@/lib/dbActions';

export default async function Leaderboard() {
  const profiles = await getAllProfilesSorted();

  return (
    <div
      className="leaderboardContainer p-4"
      style={{
        backgroundColor: '#F6E6D5',
        minHeight: '100vh',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '80%',
        margin: '0 auto',
      }}
    >
      <div
        className="text-center mb-4"
        style={{
          padding: '20px',
          backgroundColor: '#B49CC8',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Leaderboard</h1>
        <p style={{ fontSize: '1.2rem', margin: '0' }}>
          See the top performers ranked by points!
        </p>
      </div>

      <Table
        hover
        responsive
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
        className="text-center"
      >
        <thead style={{ backgroundColor: '#B49CC8', color: 'white' }}>
          <tr>
            <th style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Rank</th>
            <th style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Name</th>
            <th style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Points</th>
            <th style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Major</th>
          </tr>
        </thead>
        <tbody>
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <tr key={profile.id}>
                <td style={{ fontWeight: '600' }}>{index + 1}</td>
                <td
                  style={{ fontWeight: '500' }}
                >{`${profile.firstName} ${profile.lastName}`}</td>
                <td style={{ fontWeight: '600' }}>{profile.points}</td>
                <td style={{ fontWeight: '600' }}>{profile.major}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center" style={{ color: 'gray' }}>
                No profiles available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
