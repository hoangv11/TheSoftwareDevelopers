import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import UserDashboard from '@/components/UserDashboard';

const UserHomePage = async () => {
  // Retrieve user session
  const session = await getServerSession(authOptions);

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Get the user's name from the database
  const userEmail = session?.user?.email;

  const user = userEmail
    ? await prisma.user.findUnique({
      where: { email: userEmail },
      include: { profile: true }, // Profile inclusion now works correctly
    })
    : null;

  const userName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : 'User';

  return (
    <main>
      <UserDashboard userName={userName} />
    </main>
  );
};

export default UserHomePage;
