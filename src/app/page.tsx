/* eslint-disable max-len */
import { Col, Image, Row } from 'react-bootstrap';

/** The Landing page. */
const Home = () => (
  <main id="landing-page" className="vh-100 d-flex">
    <Row className="w-100 m-0">
      {/* Text Section */}
      <Col xs={6} className="d-flex flex-column justify-content-center align-items-start p-5">
        <h1>ICStudy</h1>
        <p>
          Placeholder
        </p>
      </Col>

      {/* Image Section */}
      <Col xs={6} className="d-flex justify-content-center align-items-center p-5">
        <Image
          src="https://via.placeholder.com/600x400"
          alt="Home Image"
          className="w-100 h-auto"
          style={{ maxHeight: '100%' }}
        />
      </Col>
    </Row>
  </main>
);

export default Home;
