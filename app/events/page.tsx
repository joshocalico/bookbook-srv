import { listEvents } from "@/lib/queries";
import { use } from "react";
import EventRow from "./EventRow";

const formButtonStyles =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

const EventPage = () => {
  const eventList = use(listEvents());

  return (
    <>
      <h1 className="text-6xl font-black px-4 py-6">
        Event Management Back Office
      </h1>
      <h2 className="text-3xl px-4">
        Manage Sessions and Events in Bookingdle
      </h2>
      <div className="w-full overflow-x-auto">
        <table
          className="text-left text-sm font-light table-auto min-w-full"
          style={{ width: 1600 }}
        >
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4" scope="col">
                Image
              </th>
              <th className="px-6 py-4" scope="col">
                Title
              </th>
              <th className="px-6 py-4" scope="col">
                Short Description
              </th>
              <th className="px-6 py-4" scope="col">
                Long Description
              </th>
              <th className="px-6 py-4" scope="col">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {eventList.length > 0 ? (
              eventList.map((data) => <EventRow key={data.uuid} {...data} />)
            ) : (
              <tr>
                <td>No events yet! Add one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-3">
        <a href="/events/create" className={formButtonStyles}>
          Create New Event
        </a>
      </div>
    </>
  );
};

export default EventPage;
