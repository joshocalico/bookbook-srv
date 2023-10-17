"use server";

import { PrismaClient, Event, Session } from "@prisma/client";

const prisma = new PrismaClient();

export const findOrCreateUser = async (userName: string, phone: string) =>
  (await prisma.user.findFirst({
    where: {
      name: userName,
      phone,
    },
  })) ||
  (await prisma.user.create({
    data: {
      name: userName,
      phone,
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

export const createSession = async (data: Omit<Session, "uuid">) => {
  "use server";
  return await prisma.session.create({
    data,
  });
};

export const deleteSession = async (uuid: string) => {
  "use server";
  return await prisma.session.delete({
    where: {
      uuid,
    },
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
    include: {
      user: true,
    },
  });
};

export const registerSession = async ({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string
}) => {
  "use server";

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
        userId: userId,
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
      userId: userId,
    },
    include: {
      event: true,
    },
  });
};

export const deregisterSession = async ({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string;
}) => {
  "use server";
  prisma.session.update({
    where: {
      userId,
      uuid: sessionId,
    },
    data: {
      userId: null,
    },
  });
};

export const getUserEvents = async (userId: string) => {
  "use server";
  prisma.event.findMany({
    where: {
      sessions: {
        some: {
          userId,
        },
      },
    },
    include: {
      sessions: {
        where: {
          userId,
        },
      },
    },
  });
};
