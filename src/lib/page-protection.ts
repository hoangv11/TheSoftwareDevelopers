import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the banned page if the user is banned.
 */
export const loggedInProtectedPage = async (
  session: { user: { email: string; id: string; randomKey: string } } | null,
) => {
  if (!session || !session.user?.email) {
    redirect('/auth/signin');
    return;
  }

  // Fetch user from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/auth/signin'); // Redirect to login if the user doesn't exist
    return;
  }

  // Check if the user is banned
  if (user.banned) {
    redirect('/banned'); // Redirect to banned page
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an admin.
 */
export const adminProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.randomKey !== Role.ADMIN) {
    redirect('/not-authorized');
  }
};
