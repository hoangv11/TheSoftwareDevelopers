import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return; // Ensure function execution stops here
  }

  try {
    const currentUser = Number(session.user.id);

    if (Number.isNaN(currentUser)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return; // Validate user ID before proceeding
    }

    const sessions = await prisma.studySession.findMany({
      where: {
        user: {
          some: {
            id: currentUser,
          },
        },
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
      },
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
}
