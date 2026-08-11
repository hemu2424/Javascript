import { prisma } from "@/lib/prisma";

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

export async function createSession(userId: string) {
  const token = crypto.randomUUID();

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION
  );

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
}



export async function getUserIdFromSession(token: string) {
  const session = await prisma.session.findUnique({
    where: {
      token,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session;
}

export async function deleteSession(token: string) {
  await prisma.session.deleteMany({
    where: {
      token,
    },
  });
}