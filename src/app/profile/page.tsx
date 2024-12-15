import { Profile } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import React from 'react';
import '../../styles/profilepage.css';
import { Star as StarIcon, GraduationCap, Clock } from 'lucide-react';
import authOptions from '@/lib/auth';
import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';

const MyProfile = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }

  const userSession = session as unknown as {
    user: { email: string; id: string; randomKey: string };
  };

  const profiles: Profile[] = await prisma.profile.findMany({});

  const userProfile = profiles.find(
    (profile) => profile.userId === parseInt(userSession.user.id, 10),
  );

  if (!userProfile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        {profiles
          .filter(
            (profile) => profile.userId === parseInt(userSession.user?.id, 10),
          )
          .map((profile) => (
            <Image
              key={profile.userId}
              src={profile.profilePictureUrl || ''}
              roundedCircle
              className="profile-picture"
            />
          ))}
        <div className="profile-info">
          <h1 className="profile-name">{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
          <p className="profile-major">{userProfile.major}</p>
          <p className="profile-bio">{userProfile.bio}</p>
          <div className="points-container">
            <StarIcon size={20} className="star-icon" />
            <span>{userProfile.points}</span>
          </div>
          <Link href="/editprofile">
            <Button className="edit-profile-button">Edit Profile</Button>
          </Link>
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
      </div>

      {/* Session History */}
      <table className="session-history-table">
        <thead>
          <tr>
            <th className="table-header">
              <Clock className="clock-icon" />
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

export default MyProfile;
