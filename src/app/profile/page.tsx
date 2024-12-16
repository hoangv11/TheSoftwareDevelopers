import { Profile } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import React from 'react';
import '../../styles/profilepage.css';
import { Star as StarIcon } from 'lucide-react';
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
    <div className="flex items-center justify-center bg-gray-100 p-4 my-8">
      <div className="bg-white rounded-lg overflow-hidden w-50 mx-auto px-6 border-black-500">
        <div className="profile-header flex flex-col items-center p-6 border-b">
          {profiles
            .filter(
              (profile) => profile.userId === parseInt(userSession.user?.id, 10),
            )
            .map((profile) => (
              <Image
                key={profile.userId}
                src={profile.profilePictureUrl || ''}
                roundedCircle
                className="profile-picture w-32 h-32 object-cover mb-4"
              />
            ))}

          <div className="profile-info">
            <h1 className="text-2xl font-bold mb-2">
              Name:
              {' '}
              {`${userProfile.firstName} ${userProfile.lastName}`}
            </h1>
            <p className="text-gray-600 mb-2">
              Major:
              {' '}
              {userProfile.major}
            </p>
            <p className="text-gray-500 mb-2">
              Bio:
              {' '}
              {userProfile.bio}
            </p>
            <p className="flex items-center justify-center mb-4">
              <StarIcon size={20} className="text-yellow-500 mr-2" />
              <span className="font-semibold px-2">
                {userProfile.points}
                {' '}
                Points
              </span>
            </p>

            <Link href="/editprofile" className="block">
              <Button className="edit-profile-button">Edit Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
