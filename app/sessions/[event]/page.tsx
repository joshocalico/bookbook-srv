import { FaChevronLeft } from "react-icons/fa6";

const SessionList = () => {
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
      <h1></h1>
    </>
  );
};

export default SessionList;
