import { deleteEvent } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } },
): Promise<NextResponse> {
  await deleteEvent(params.uuid);
  return NextResponse.redirect(new URL("/events", request.url));
}
