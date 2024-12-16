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
    </div>
  );
};

export default MyProfile;
