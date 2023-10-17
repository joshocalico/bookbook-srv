"use server";

import { PrismaClient, Event, Session } from "@prisma/client";

const prisma = new PrismaClient();

const findOrCreateUser = async (userName: string) =>
  (await prisma.user.findFirst({
    where: {
      name: userName,
    },
  })) ||
  (await prisma.user.create({
    data: {
      name: userName,
    },
  }));

export const createEvent = async (data: Omit<Event, "uuid">) => {
  "use server";
  return await prisma.event.create({
    data,
  });
};

export const getEvent = async (uuid: string) => {
  "use server";
  return await prisma.event.findFirst({
    where: {
      uuid,
    },
  });
};

export const deleteEvent = async (uuid: string) => {
  "use server";
  return await prisma.event.delete({
    where: {
      uuid,
    },
  });
};

export const updateEvent = async (
  data: Partial<Event> & Pick<Event, "uuid">,
) => {
  "use server";
  return await prisma.event.update({
    where: {
      uuid: data.uuid,
    },
    data,
  });
};

export const createSession = async (data: Session) => {
  "use server";
  return await prisma.session.create({
    data,
  });
};

export const listEvents = async () => {
  "use server";
  return await prisma.event.findMany({
    include: {
      sessions: true,
    },
  });
};

export const listSessionsForEvent = async ({
  eventId,
}: {
  eventId: string;
}) => {
  "use server";
  return await prisma.session.findMany({
    where: {
      eventId,
    },
  });
};

export const registerSession = async ({
  sessionId,
  userName,
}: {
  sessionId: string;
  userName: string;
}) => {
  "use server";
  const user = await findOrCreateUser(userName);

  // Enforce one session per event, per user
  await prisma.event
    .findFirst({
      where: {
        sessions: {
          some: {
            uuid: sessionId,
          },
        },
      },
    })
    .sessions({
      where: {
        userId: user.uuid,
      },
    })
    .then((val) => {
      if (val) {
        prisma.session.updateMany({
          where: {
            uuid: {
              in: val.map((session) => session.uuid),
            },
          },
          data: {
            userId: null,
          },
        });
      }
    });

  return await prisma.session.update({
    where: {
      uuid: sessionId,
      userId: null,
    },
    data: {
      userId: user.uuid,
    },
    include: {
      event: true,
    },
  });
};

export const deregisterSession = async ({
  sessionId,
  userName,
}: {
  sessionId: string;
  userName: string;
}) => {
  "use server";
  const user = await findOrCreateUser(userName);

  prisma.session.update({
    where: {
      userId: user.uuid,
      uuid: sessionId,
    },
    data: {
      userId: null,
    },
  });
};
