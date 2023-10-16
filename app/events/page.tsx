import { listEvents } from "@/lib/queries";
import { Event } from "@prisma/client";
import { use } from "react";
import { FaTrash, FaPencil } from "react-icons/fa6"
import Image from "next/image";

const formButtonStyles = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

const EventRow = ({
    image,
    longDescription,
    shortDescription,
    title,
    uuid
}: Event) => {
    return <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 ">
        <td className="px-6 py-4" >
            {image ? 
                <Image className="object-cover rounded-xl w-36 aspect-square" src={image} width={200} height={200} alt={"Event image"} />
             : <p>
                    No Image
                </p>}
        </td>
        <td className="px-6 py-4 whitespace-nowrap" >
            {title}
        </td>
        <td className="px-6 py-4" >
            {shortDescription}
        </td>
        <td className="px-6 py-4" >
            {longDescription}
        </td>
        <td className="flex px-6 py-4">
            <a href={`/events/update/${uuid}`} className="mr-2">
                <FaPencil /> 
            </a>
            <a href={`/events/delete/${uuid}`}>
                <FaTrash />
            </a>            
        </td>
    </tr>
}

const EventPage = () => {
    const eventList = use(listEvents());

    return <>
    <h1 className="text-6xl font-black px-4 py-6">Event Management Back Office</h1>
    <h2 className="text-3xl px-4">
        Manage Sessions and Events in Bookingdle
    </h2>
    <div className="w-full overflow-x-auto">
        <table className="text-left text-sm font-light table-auto min-w-full" style={{ width: 1600 }}>
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
                {
                    eventList.length > 0 ?
                        eventList.map(data => <EventRow key={data.uuid} {...data} />) :
                            <tr><td>No events yet! Add one.</td></tr>
                }
            </tbody>
        </table>
    </div>
    <div className="p-3">
        <a href="/events/create" className={formButtonStyles}>
            Create New Event
        </a></div>
    </>
}

export default EventPage;