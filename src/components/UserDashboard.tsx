/* eslint-disable react/prop-types */

'use client';

import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component from Next.js

interface UserDashboardProps {
  userName: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userName }) => (
  <Container
    fluid
    className="d-flex flex-column align-items-center"
    style={{
      backgroundColor: '#ffffff',
      height: '100vh',
      padding: '0',
    }}
  >
    {/* Full-width section */}
    <Row
      className="w-100 d-flex align-items-center"
      style={{
        backgroundColor: '#f6e6d5',
        height: '50vh', // Adjust height as needed
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Right Section: Greeting Text */}
      <Col
        xs={12}
        md={6}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1
          style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Hi,&nbsp;
          {userName}
          !
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            color: '#333',
          }}
        >
          Welcome to your dashboard! Explore and manage your sessions, courses,
          and more.
        </p>
      </Col>

      {/* Left Section: Images */}
      <Col
        xs={12}
        md={6}
        className="d-flex justify-content-center align-items-center"
        style={{
          maxHeight: '100%',
          overflow: 'hidden',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Carousel controls={false} indicators={false} interval={5000} fade>
          <Carousel.Item>
            <Image
              src="/POSTfront.png"
              alt="POST building front view"
              width={400}
              height={400}
              layout="responsive"
              style={{
                objectFit: 'cover',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="/POSTbuilding.png"
              alt="POST building side view"
              width={400}
              height={400}
              layout="responsive"
              style={{
                objectFit: 'cover',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>

    {/* Button Grid */}
    <Row
      className="text-center w-100"
      style={{
        margin: '20px auto 0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '20px',
        paddingLeft: '40px',
        paddingRight: '40px',
        width: '100%',
      }}
    >
      {[
        { text: 'Find Session', link: '/sessions' },
        { text: 'Create Session', link: '/session' },
        { text: 'View My Sessions', link: '/mysessions' },
        { text: 'View Leaderboards', link: '/LeaderBoard' },
        { text: 'My Courses', link: '/courses' }, // You can adjust this path accordingly
        { text: 'Inbox', link: '/inbox' }, // Replace with the actual path for inbox
        { text: 'Calendar', link: '/calendar' },
        { text: 'My Profile', link: '/profile' },
      ].map(({ text, link }) => (
        <Link key={text} href={link} passHref>
          <Button
            variant="light"
            className="w-100 py-3"
            style={{
              backgroundColor: '#d2b4fc',
              color: 'black',
              fontSize: '1rem',
              height: '100px',
              borderRadius: '8px',
            }}
          >
            {text}
          </Button>
        </Link>
      ))}
    </Row>
  </Container>
);

export default UserDashboard;
