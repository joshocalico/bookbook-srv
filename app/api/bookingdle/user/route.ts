import { getUserEvents } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const userName = request.nextUrl.searchParams.get("user");

  if (!userName) {
    return NextResponse.json("You must provide a 'user' name in this query.", {
      status: 400,
    });
  }

  return NextResponse.json(await getUserEvents(userName));
}
