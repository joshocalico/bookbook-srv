import { getEvent, listSessionsForEvent } from "@/lib/queries";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { use } from "react";
import { FaChevronLeft, FaCross } from "react-icons/fa6";
import SessionListControl from "./SessionListControl";

const SessionList = ({ params: { event } }: { params: { event: string } }) => {
  const { title } = use(getEvent(event as string))!;

  const sessions = use(listSessionsForEvent({ eventId: event }));

  return (
    <>
      <div className="flex flex-col p-4 text-2xl line-clamp-2">
        <div className="flex mb-4">
          <a
            href="/events/"
            className="text-blue-400 inline-flex items-center mr-4"
          >
            <FaChevronLeft />
            Events
          </a>
          <h1>Session List</h1>
        </div>
      </div>
      <div className={"px-4"}>
        <h1 className="text-4xl">{title}</h1>
        <SessionListControl sessions={sessions} event={event} />
      </div>
    </>
  );
};

export default SessionList;
