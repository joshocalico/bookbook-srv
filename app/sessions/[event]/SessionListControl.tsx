"use client";
import {
  createSession as createSessionQuery,
  listSessionsForEvent,
  deleteSession as deleteSessionQuery,
} from "@/lib/queries";
import { Session, User } from "@prisma/client";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const formInputStyles =
  "shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const formButtonStyles =
  "bg-blue-500 shadow hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline";
const formLabelStyles = "block text-gray-700 text-sm font-bold mb-2";

const SessionListControl = ({
  sessions,
  event,
}: {
  sessions: (Session & {
    user: User | null;
  })[];
  event: string;
}) => {
  const [date, setDate] = useState("");
  const [liveSessions, setLiveSessions] = useState(sessions);

  const createSession = (datetime: Date) => {
    // Optimistic UI
    setLiveSessions([
      ...liveSessions,
      {
        eventId: event,
        uuid: "client",
        time: datetime,
        user: null,
        userId: null,
      },
    ]);

    createSessionQuery({
      eventId: event,
      time: datetime,
      userId: null,
    }).then(() => {
      listSessionsForEvent({
        eventId: event,
      }).then((_sessions) => {
        setLiveSessions(_sessions);
      });
    });
  };

  const deleteSession = (uuid: string) => {
    liveSessions.splice(
      liveSessions.findIndex((s) => s.uuid === uuid),
      1,
    );
    setLiveSessions([...liveSessions]);
    deleteSessionQuery(uuid).then(() => {
      listSessionsForEvent({
        eventId: event,
      }).then((_sessions) => {
        setLiveSessions(_sessions);
      });
    });
  };

  return (
    <>
      <div className="flex mt-4">
        <input
          className={formInputStyles}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type={"datetime-local"}
        />
        <button
          className={formButtonStyles + " ml-2"}
          onClick={() => {
            createSession(new Date(date));
          }}
        >
          New Session
        </button>
      </div>
      <ul className="p-2">
        {liveSessions.map(({ uuid, time, user }) => (
          <li
            key={uuid}
            className="flex items-center p-2 border-y-2 hover:bg-slate-200"
          >
            <span className="mr-2">
              {Intl.DateTimeFormat(undefined, {
                weekday: "long",
                hour: "numeric",
                minute: "2-digit",
                month: "long",
                day: "numeric",
              }).format(time)}{" "}
              - {user ? user.name : "Vacant"}
            </span>
            <button
              onClick={() => {
                deleteSession(uuid);
              }}
            >
              <FaXmark />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SessionListControl;
