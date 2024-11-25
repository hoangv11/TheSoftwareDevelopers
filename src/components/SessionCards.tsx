'use client';

import { StudySession } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import { updateSession } from '@/lib/dbActions';
import '../styles/sessioncards.css';

type ExtendedStudySession = StudySession & {
  owner: {
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
};

const SessionCard = ({
  sessions,
  currentUser,
}: {
  sessions: ExtendedStudySession[];
  currentUser: number;
}) => {
  const addNewSession = async (studySession: ExtendedStudySession) => {
    await updateSession(studySession.id, currentUser);
  };
  return (
    <div className="sessionCard">
      {sessions.map((session) => (
        <div
          className="sessionCardBorder"
          style={{ backgroundColor: '#e6f3ff' }}
        >
          <Card className="sessionCardCont">
            <Card.Body className="px-4">
              <Card.Title className="text-primary text-start">
                {session.title}
              </Card.Title>
              <Card.Text className="text-secondary text-start mb-3 pt-2">
                Collaborative Final Prep
              </Card.Text>

              <div className="session-details pt-3">
                <div className="detail-row pb-3">
                  <span className="detail-label">Sensei: </span>
                  <span className="detail-value">
                    {`${session.owner?.profile?.firstName} ${session.owner?.profile?.lastName}`}
                  </span>
                </div>
                <div className="detail-row pb-3">
                  <span className="detail-label">Course: </span>
                  <span className="detail-value">Course ID</span>
                </div>
                <div className="detail-row pb-3">
                  <span className="detail-label">Location: </span>
                  <span className="detail-value">Location</span>
                </div>
                <div className="detail-row pb-3">
                  <span className="detail-label">Time: </span>
                  <span className="detail-value">Start Time - End Time</span>
                </div>
              </div>

              <Button
                className="requestBtn mt-3"
                onClick={() => addNewSession(session)}
              >
                Add Session
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default SessionCard;
