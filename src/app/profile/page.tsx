import { Profile } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import React from 'react';
import Image from 'next/image';
import '../../styles/profilepage.css';
import { Star as StarIcon, GraduationCap, Book, Clock } from 'lucide-react';
import authOptions from '@/lib/auth';

const myProfile = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }
  const userSession = session as unknown as {
    user: { email: string; id: string; randomKey: string };
  };

  const profiles: Profile[] = await prisma.profile.findMany({});

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <Image
          src="/pfp1.png"
          alt="profile picture"
          className="profile-picture"
          width={100}
          height={100}
        />
        <div>
          <h1 className="profile-name">
            {' '}
            {profiles
              .filter(
                (profile) => profile.userId === parseInt(userSession.user?.id, 10),
              )
              .map((profile) => (
                <div key={profile.userId}>
                  <h5>{`${profile.firstName} ${profile.lastName}`}</h5>
                  <h5>{`${profile.major}`}</h5>
                  <h5>{`${profile.bio}`}</h5>
                </div>
              ))}
          </h1>
          <div className="points-container">
            <StarIcon size={20} style={{ marginRight: '0.5rem' }} />
            <span>1250 Points</span>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="courses-container">
        {/* Student Courses */}
        <div className="course-card">
          <h2 className="course-title">
            <GraduationCap className="course-icon" />
            Student Courses
          </h2>
          <div className="progress-container">
            <div className="progress-label">
              <span>ICS 111 Introduction to Computer Science</span>
              <span>75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '75%' }} />
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-label">
              <span>React Fundamentals</span>
              <span>45%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '45%' }} />
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-label">
              <span>Database Design</span>
              <span>60%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        {/* Mentor Courses */}
        <div className="course-card">
          <h2 className="course-title">
            <Book className="course-icon" />
            Mentor Courses
          </h2>
          <div className="mentor-course-item">
            <span>Python Programming</span>
            <span className="students-count">24 Students</span>
          </div>
          <div className="mentor-course-item">
            <span>JavaScript Basics</span>
            <span className="students-count">18 Students</span>
          </div>
        </div>
      </div>

      {/* Session History */}
      <table className="session-history-table">
        <thead>
          <tr>
            <th className="table-header">
              <Clock
                style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
              />
              Session History
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">
              <div className="session-row">
                <span>2024-03-15</span>
                <span>React Fundamentals</span>
                <span>2h 15m</span>
                <span className="status-completed">Completed</span>
              </div>
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">
              <div className="session-row">
                <span>2024-03-10</span>
                <span>Database Design</span>
                <span>1h 45m</span>
                <span className="status-in-progress">In Progress</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default myProfile;
