'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import SessionCard from '../../components/SessionCards';
import '../../styles/sessionpage.css';

const SessionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main>
      <Container className="py-3">
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <h2>Study Sessions</h2>
          </Col>
        </Row>

        <Row className="mb-4 justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'rgba(180, 156, 200, 0.5)',
                  borderRadius: '25px 0 0 25px',
                  height: '50px',
                  fontSize: '16px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Button
                variant="outline-secondary"
                style={{
                  backgroundColor: '#b49cc8',
                  color: 'white',
                  borderColor: 'rgba(180, 156, 200, 0.5)',
                  borderRadius: '0 25px 25px 0',
                  height: '50px',
                  width: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Search size={24} />
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <Button
              className="create-session-btn"
              style={{
                backgroundColor: '#b49cc8',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                height: '50px',
                width: '180px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontSize: '16px',
              }}
            >
              Create Session
            </Button>
          </Col>
        </Row>

        <div className="session-card-grid">
          <SessionCard />
          <SessionCard />
          <SessionCard />
          <SessionCard />
        </div>
      </Container>
    </main>
  );
};

export default SessionsPage;
