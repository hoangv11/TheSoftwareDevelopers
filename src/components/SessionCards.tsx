'use client';

import { useState } from 'react';
import { StudySession } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import { updateSession } from '@/lib/dbActions';
import swal from 'sweetalert';
import SearchBar from './SearchFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/sessioncards.css';

type ExtendedStudySession = StudySession & {
  owner: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  user: {
    id: number;
  }[];
};

const SessionCard = ({
  sessions,
  currentUser,
}: {
  sessions: ExtendedStudySession[];
  currentUser: number;
}) => {
  const [search, setSearch] = useState('');
  const addNewSession = async (studySession: ExtendedStudySession) => {
    await updateSession(studySession.id, {
      id: studySession.id,
      title: studySession.title,
      description: studySession.description,
      course: studySession.course,
      location: studySession.location,
      sessionDate: studySession.sessionDate,
      startTime: studySession.startTime,
      endTime: studySession.endTime,
      added: true,
      userId: currentUser,
    });

    swal('Success', 'Session Added', 'success', {
      timer: 1500,
    });
  };
  const removeAddedSession = async (studySession: ExtendedStudySession) => {
    await updateSession(studySession.id, {
      id: studySession.id,
      title: studySession.title,
      description: studySession.description,
      course: studySession.course,
      location: studySession.location,
      sessionDate: studySession.sessionDate,
      startTime: studySession.startTime,
      endTime: studySession.endTime,
      added: false,
      userId: currentUser,
      disconnect: true,
    });

    swal('Success', 'Session Removed', 'success', {
      timer: 1500,
    });
  };

  const searchFilter = sessions.filter((session) => {
    const firstName = session.owner.profile?.firstName ?? '';
    const lastName = session.owner.profile?.lastName ?? '';
    const combinedName = `${firstName} ${lastName}`.toLowerCase();
    const searchLower = search.toLowerCase();

    return (
      session.title.toLowerCase().includes(searchLower)
      || session.description.toLowerCase().includes(searchLower)
      || session.owner.profile?.firstName?.toLowerCase().includes(searchLower)
      || session.owner.profile?.lastName?.toLowerCase().includes(searchLower)
      || combinedName.includes(searchLower)
      || session.course.toLowerCase().includes(searchLower)
      || session.location.toLowerCase().includes(searchLower)
    );
  });
  return (
    <div>
      <div>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="sessionCard">
        {searchFilter.map((session) => (
          <div
            key={session.id}
            className="sessionCardBorder"
            style={{ backgroundColor: '#e6f3ff' }}
          >
            <Card className="sessionCardCont">
              <Card.Body className="px-4">
                <Card.Title className="text-primary text-start">
                  {session.title}
                </Card.Title>
                <Card.Text className="text-secondary text-start mb-3 pt-3">
                  {session.description}
                </Card.Text>

                <div className="session-details pt-1">
                  <div className="detail-row pb-3">
                    <span className="detail-label">Organizer: </span>
                    <span className="detail-value">
                      {`${session.owner?.profile?.firstName} ${session.owner?.profile?.lastName}`}
                    </span>
                  </div>
                  <div className="detail-row pb-3">
                    <span className="detail-label">Date: </span>
                    <span className="detail-value">
                      {new Date(session.sessionDate).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </span>
                  </div>
                  <div className="detail-row pb-3">
                    <span className="detail-label">Time: </span>
                    <span className="detail-value">
                      {new Date(session.startTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                      -
                      {new Date(session.endTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <div className="detail-row pb-3">
                    <span className="detail-label">Subject: </span>
                    <span className="detail-value">{session.course}</span>
                  </div>
                  <div className="detail-row pb-3">
                    <span className="detail-label">Location: </span>
                    <span className="detail-value">{session.location}</span>
                  </div>
                </div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {session.owner.id === currentUser ? (
                  <Button
                    href={`/editsession?id=${session.id}`}
                    className="requestBtn mt-3"
                  >
                    Edit Session
                  </Button>
                ) : (session.user?.some((user) => user.id === currentUser)
                  ?? false) ? (
                    <Button
                      className="requestBtn mt-3"
                      onClick={() => removeAddedSession(session)}
                    >
                      Remove Session
                    </Button>
                  ) : (
                    <Button
                      className="requestBtn mt-3"
                      onClick={() => addNewSession(session)}
                    >
                      Add Session
                    </Button>
                  )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SessionCard;
