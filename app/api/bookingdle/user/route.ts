import { findOrCreateUser, getUserEvents } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

import z from "zod";

const userObj = z.object({
  name: z.string(),
  phone: z.string(),
})

export const POST = async (req: Request): Promise<NextResponse> => {
  const data = req.json()
  const parsed = userObj.safeParse(data)

  if (!parsed.success) {
    return NextResponse.json({
      error: {
        issues: parsed.error.issues
      }
    }, { status: 400 })
  }

  const {
    name,
    phone
  } = parsed.data;

  return NextResponse.json(await findOrCreateUser(name, phone))
}

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const user = request.nextUrl.searchParams.get("user");

  if (!user) {
    return NextResponse.json("You must provide a 'user' token in this query.", {
      status: 400,
    });
  }

  return NextResponse.json(await getUserEvents(user));
}
