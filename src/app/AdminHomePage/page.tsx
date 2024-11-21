import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Leaderboard = () => (
  <Container className="p-4" style={{ backgroundColor: '#F7E7D6', maxWidth: '`400=px`' }}>
    {/* Navbar */}
    <Row>
      <Col className="bg-dark text-white text-center py-2">
        <h5>Navbar</h5>
      </Col>
    </Row>

    {/* Leaderboard Title */}
    <Row className="my-3">
      <Col className="text-center">
        <h3>Leaderboard</h3>
      </Col>
    </Row>

    {/* Buttons */}
    <Row className="mb-3">
      <Col className="d-flex justify-content-between">
        <Button variant="light" style={{ border: '1px solid #ddd' }}>
          Search User
        </Button>
        <Button variant="light" style={{ border: '1px solid #ddd' }}>
          Sort by
        </Button>
        <Button variant="secondary" style={{ backgroundColor: '#B49CC8', border: 'none' }}>
          Filter
        </Button>
      </Col>
    </Row>

    {/* Leaderboard Section */}
    <Row>
      <Col className="p-3 border rounded text-center" style={{ backgroundColor: '#FFFFFF' }}>
        <h4>Leaderboards</h4>
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

export default Leaderboard;
