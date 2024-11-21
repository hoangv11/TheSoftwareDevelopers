/* eslint-disable max-len */
import { Col, Image, Row, Button} from 'react-bootstrap';

/** The Landing page. */
const Home = () => (
  <main id="landing-page" className="vh-100 d-flex">
    <Row className="w-100 m-0">
      {/* Text Section */}
      <Col xs={6} className="d-flex flex-column justify-content-center align-items-center text-center p-5">
        <h1>ICStudy</h1>
        <p>
          Welcome to ICStudy, the ultimate tool for ICS students to connect, collaborate, and conquer coursework together! Whether you&apos;re looking for a group to brainstorm a project, tackle a tough assignment, or simply get some advice, ICStudy makes it easy to find peers ready to help or learn. Join the community where every student can be a teacher and a learner, all within the comfort and familiarity of the ICS spaces on campus. Get started by signing up or logging in!
        </p>
        {/* Buttons */}
        <div className="mt-4">
          <Button variant="primary" href="/auth/signin" className="me-3">
            Log in
          </Button>
          <Button variant="dark" href="/auth/signup">
            Sign up
          </Button>
        </div>
      </Col>

      {/* Image Section */}
      <Col xs={6} className="d-flex justify-content-center align-items-center p-5">
        <Image
          src="/POSTbuilding.png"
          alt="Home Image"
          className="h-100 w-100"
          style={{ objectFit: 'contain', maxWidth: '50vw' }}
        />
      </Col>
    </Row>
  </main>
);

export default Home;
