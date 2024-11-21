import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const Leaderboard = () => {
  // Sample leaderboard data
  const leaderboardData = [
    { name: 'Alice Johnson', points: 1200, strongestSubject: 'English' },
    { name: 'Bob Smith', points: 1150, strongestSubject: 'Mathematics' },
    { name: 'Charlie Brown', points: 1100, strongestSubject: 'Chemistry' },
    { name: 'Diana Ross', points: 1080, strongestSubject: 'Physics' },
    { name: 'Ethan Hunt', points: 1050, strongestSubject: 'Biology' },
  ];

  return (
    <Container
      className="d-flex flex-column justify-content-between p-4"
      style={{ backgroundColor: '#F7E7D6', minHeight: '100vh' }}
    >
      {/* Leaderboard Title */}
      <Row className="my-3">
        <Col className="text-center">
          <h3 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Leaderboard</h3>
        </Col>
      </Row>

      {/* Buttons */}
      <Row className="mb-3">
        {/* Left-aligned buttons */}
        <Col xs="auto">
          <Button variant="light" style={{ border: '1px solid #ddd' }}>
            Search User
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="light" style={{ border: '1px solid #ddd' }}>
            Sort by
          </Button>
        </Col>

        {/* Right-aligned button */}
        <Col xs="auto" className="ms-auto">
          <Button variant="secondary" style={{ backgroundColor: '#B49CC8', border: 'none' }}>
            Filter
          </Button>
        </Col>
      </Row>

      {/* Leaderboard Section */}
      <Row className="flex-grow-1">
        <Col className="p-3 border rounded" style={{ backgroundColor: '#FFFFFF' }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Points</th>
                <th>Strongest Subject</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.points}</td>
                  <td>{user.strongestSubject}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Back Button */}
      <Row className="mt-4">
        <Col>
          <Button
            variant="secondary"
            style={{ backgroundColor: '#B49CC8', border: 'none', width: '100%' }}
          >
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Leaderboard;
