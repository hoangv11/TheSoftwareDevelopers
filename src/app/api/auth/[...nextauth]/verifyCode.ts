import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, code } = req.body;

  // Validate request body
  if (typeof email !== 'string' || typeof code !== 'string') {
    return res.status(400).json({ message: 'Invalid email or verification code' });
  }

  try {
    const verificationEntry = await prisma.verificationCode.findUnique({
      where: { email }, // `email` must be unique in your schema
    });

    // Validate the verification code and expiry
    if (
      !verificationEntry
      || verificationEntry.code !== code
      || verificationEntry.expiresAt < new Date()
    ) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    // Verification successful, delete the entry
    await prisma.verificationCode.delete({
      where: { email },
    });

    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
