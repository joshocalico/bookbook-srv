"use client";
import { FaPencil, FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { Event } from "@prisma/client";

const EventRow = ({
  image,
  longDescription,
  shortDescription,
  title,
  uuid,
}: Event) => {
  "use client";
  return (
    <tr
      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
      onClick={() => {
        window.location.href = `/sessions/${uuid}`;
      }}
    >
      <td className="px-6 py-4">
        {image ? (
          <Image
            className="object-cover rounded-xl w-36 aspect-square"
            src={image}
            width={200}
            height={200}
            alt={"Event image"}
          />
        ) : (
          <p>No Image</p>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{title}</td>
      <td className="px-6 py-4">{shortDescription}</td>
      <td className="px-6 py-4">{longDescription}</td>
      <td className="flex px-6 py-4">
        <a href={`/events/update/${uuid}`} className="mr-2">
          <FaPencil />
        </a>
        <a href={`/events/delete/${uuid}`}>
          <FaTrash />
        </a>
      </td>
    </tr>
  );
};

export default EventRow;
