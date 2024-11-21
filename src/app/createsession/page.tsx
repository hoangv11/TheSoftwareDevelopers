import { Col, Container, Row } from 'react-bootstrap';
import '../../styles/createsession.css';

const CreateSessionPage = () => (
  <main>
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <div className="session-form">
            <h2>Create Session</h2>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="session"
                placeholder="Session Name"
              />
            </div>

            <div className="form-group">
              <input
                type="datetime-local"
                className="form-control"
                name="time"
                placeholder="Select Time"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Enter Location"
              />
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                name="description"
                placeholder="Description"
              />
            </div>

            <div className="button-group">
              <button type="button" className="btn btn-secondary">
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default CreateSessionPage;
