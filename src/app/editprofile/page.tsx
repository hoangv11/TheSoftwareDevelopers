'use client';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../../styles/editProfile.css';

const editProfile = () => (
  <div className="p-5">
    <h1 className="createSessionTitle text-center">
      <strong>Edit Profile</strong>
    </h1>
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="thebox">
            <Card.Body>
              <div className="profile-image-container">
                <div className="profile-image">
                  <div className="add-icon-circle">
                    <span className="add-icon">+</span>
                  </div>
                </div>
              </div>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                      />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                      />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                </Row>
                <input type="hidden" />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col />
                    <Col />
                    <Col />
                    <Col>
                      <Button
                        className="cSbutton"
                        type="submit"
                        variant="primary"
                      >
                        Save Profile
                      </Button>
                    </Col>
                    <Col />
                    <Col />
                    <Col />
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default editProfile;
