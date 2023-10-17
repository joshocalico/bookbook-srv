import { deregisterSession, registerSession } from "@/lib/queries";
import { NextResponse } from "next/server";
import z from "zod";

const shape = z.object({
  user: z.string(),
  session: z.string(),
});

export const POST = async (req: Request): Promise<NextResponse> => {
  const data = (await req.json()) as {
    user: string;
    session: string;
  };

  const parsed = shape.safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues;
    return NextResponse.json(
      {
        error: {
          issues,
        },
      },
      {
        status: 400,
      },
    );
  }

  const { session, user } = parsed.data;

  return NextResponse.json(
    await registerSession({
      sessionId: session,
      userId: user,
    }),
  );
};

export const DELETE = async (req: Request): Promise<NextResponse> => {
  const data = (await req.json()) as {
    user: string;
    session: string;
  };

  const parsed = shape.safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues;
    return NextResponse.json(
      {
        error: {
          issues,
        },
      },
      {
        status: 400,
      },
    );
  }

  const { session, user } = parsed.data;

  return NextResponse.json(
    await deregisterSession({
      sessionId: session,
      userId: user,
    }),
  );
};
