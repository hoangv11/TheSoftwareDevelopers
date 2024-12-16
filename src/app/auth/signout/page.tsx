'use client';

import { signOut } from 'next-auth/react';
import { Container, Row, Button, Card } from 'react-bootstrap';
import styles from '@/styles/signout.module.css';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Container className={styles.pageContainer}>
    <Card className={styles.card}>
      <Card.Body>
        <h2 className={styles.heading}>Sign Out</h2>
        <p className={styles.description}>
          Are you sure you want to sign out? You can always log back in anytime.
        </p>
        <Row className={styles.buttonRow}>
          <Button
            className={`${styles.button} ${styles.signOutBtn}`}
            onClick={() => signOut({ callbackUrl: '/', redirect: true })}
          >
            Sign Out
          </Button>
          <Button className={`${styles.button} ${styles.cancelBtn}`} href="/">
            Cancel
          </Button>
        </Row>
      </Card.Body>
    </Card>
  </Container>
);

export default SignOut;
