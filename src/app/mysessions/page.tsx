import { Container, Row, Col } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { StudySession } from '@prisma/client';
import authOptions from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import SessionCard from '../../components/SessionCards';
import '../../styles/sessionpage.css';

type ExtendedStudySession = StudySession & {
  owner: {
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  user: {
    id: number;
  }[];
};

const SessionsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }

  const userSession = session as unknown as {
    user: { email: string; id: string; randomKey: string };
  };

  const currentUser = parseInt(userSession?.user?.id, 10);

  const sessions: ExtendedStudySession[] = (await prisma.studySession.findMany({
    where: {
      user: {
        some: {
          id: currentUser,
        },
      },
    },
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
      user: {
        select: {
          id: true,
        },
      },
    },
  })) as ExtendedStudySession[];

  return (
    <main>
      <Container className="py-3">
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <h2>My Study Sessions</h2>
          </Col>
        </Row>
        <div className="session-card-grid">
          <SessionCard sessions={sessions} currentUser={currentUser} />
        </div>
      </Container>
    </main>
  );
};

export default SessionsPage;
