/* eslint-disable no-alert */
import React from 'react';
import Image from 'next/image';
import '../../styles/profilepage.css';
import {
  Star as StarIcon,
  GraduationCap,
  Book,
  Clock,
} from 'lucide-react';

// Define types for the data
interface Course {
  id: number;
  name: string;
  progress?: number;
  students?: number;
}

interface SessionHistory {
  id: number; // Add a unique ID for session history
  date: string;
  course: string;
  duration: string;
  status: 'Completed' | 'In Progress';
}

interface ProfileData {
  name: string;
  profilePicture: string;
  points: number;
  studentCourses: Course[];
  mentorCourses: Course[];
  sessionHistory: SessionHistory[];
}

// Default data for the profile
const sampleProfileData: ProfileData = {
  name: 'John Foo',
  profilePicture: '/pfp1.png',
  points: 1250,
  studentCourses: [
    { id: 1, name: 'ICS 111 Introduction to Computer Science', progress: 75 },
    { id: 2, name: 'React Fundamentals', progress: 45 },
    { id: 3, name: 'Database Design', progress: 60 },
  ],
  mentorCourses: [
    { id: 1, name: 'Python Programming', students: 24 },
    { id: 2, name: 'JavaScript Basics', students: 18 },
  ],
  sessionHistory: [
    {
      id: 1,
      date: '2024-03-15',
      course: 'React Fundamentals',
      duration: '2h 15m',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2024-03-10',
      course: 'Database Design',
      duration: '1h 45m',
      status: 'In Progress',
    },
  ],
};

export default function ProfilePage() {
  const profileData = sampleProfileData;

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <Image
          src={profileData.profilePicture}
          alt={`${profileData.name}'s profile`}
          className="profile-picture"
          width={100} // Adjust dimensions as needed
          height={100}
        />
        <div>
          <h1 className="profile-name">{profileData.name}</h1>
          <div className="points-container">
            <StarIcon size={20} style={{ marginRight: '0.5rem' }} />
            <span>{`${profileData.points} Points`}</span>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="courses-container">
        {/* Student Courses */}
        <div className="course-card">
          <h2 className="course-title">
            <GraduationCap className="course-icon" />
            {' '}
            Student Courses
          </h2>
          {profileData.studentCourses.map(course => (
            <div key={course.id} className="progress-container">
              <div className="progress-label">
                <span>{course.name}</span>
                <span>{`${course.progress}%`}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mentor Courses */}
        <div className="course-card">
          <h2 className="course-title">
            <Book className="course-icon" />
            {' '}
            Mentor Courses
          </h2>
          {profileData.mentorCourses.map(course => (
            <div key={course.id} className="mentor-course-item">
              <span>{course.name}</span>
              <span className="students-count">{`${course.students} Students`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Session History */}
      <table className="session-history-table">
        <thead>
          <tr>
            <th className="table-header">
              <Clock style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Session History
            </th>
          </tr>
        </thead>
        <tbody>
          {profileData.sessionHistory.map(session => (
            <tr key={session.id} className="table-row">
              <td className="table-cell">
                <div className="session-row">
                  <span>{session.date}</span>
                  <span>{session.course}</span>
                  <span>{session.duration}</span>
                  <span
                    className={
                      session.status === 'Completed'
                        ? 'status-completed'
                        : 'status-in-progress'
                    }
                  >
                    {session.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
