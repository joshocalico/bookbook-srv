import { listEvents } from "@/lib/queries";
import { NextResponse } from "next/server";

export const GET = async (req: Request): Promise<NextResponse> => {
  const events = await listEvents();

  // Anonymise
  return NextResponse.json(
    events.map(({ sessions, ...safeEvent }) => {
      return {
        ...safeEvent,
        sessions: sessions.map((session) => {
          const { userId, ...safeSession } = session;
          return {
            ...safeSession,
            bookable: !userId,
          };
        }),
      };
    }),
  );
};
