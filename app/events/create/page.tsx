"use client"
import { createEvent } from "@/lib/queries";
import { Event } from "@prisma/client";
import { PutBlobResult } from "@vercel/blob";
import { ReactElement, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { v4 as uuid } from "uuid";

type EventForm = Omit<Event, "image"  | "uuid">;

const EventCreatePage = () => {
    const [event, setEvent] = useState<EventForm>({
        title: "",
        longDescription: "",
        shortDescription: ""
    });
    const {
        title,
        longDescription,
        shortDescription,
    } = event;
    const [error, setError] = useState<ReactElement>();
    const [loading, setLoading] = useState(false)
    const inputFileRef = useRef<HTMLInputElement>(null);

    const updateEvent = (eventFormChange: Partial<EventForm>) => 
        setEvent({...event, ...eventFormChange})

    const onSubmit = () => {
        setError(undefined);
        setLoading(true);
        const files = inputFileRef.current?.files ?? []
        if (files.length > 0) {
            const body = files[0]
            fetch(`/api/eventimg?filename=event-img-${uuid()}`, { body, method: "POST" })
            .then(res => res.json() as unknown as PutBlobResult)
            .then(res => createEvent({
                ...event,
                image: res.url
            }))
            .then(() => window.location.href = "/events")
            .catch(() => {
                setLoading(false);
                setError(<>
                    <strong>Uh Oh!</strong>
                    <p>
                        Something has gone wrong. Try again.
                    </p>
                </>)
            })
        }
        else {
            createEvent({
                ...event,
                image: null
            })
            .then(() => window.location.href = "/events")
            .catch(() => {
                setLoading(false);
                setError(<>
                    <strong>Uh Oh!</strong>
                    <p>
                        Something has gone wrong. Try again.
                    </p>
                </>)
            })
        }
    }

    const formInputStyles = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    const formButtonStyles = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    const formLabelStyles = "block text-gray-700 text-sm font-bold mb-2"

    return <div className="flex flex-col p-4 text-2xl line-clamp-2">
        <div className="flex mb-4">
            <a href="/events/" className="text-blue-400 inline-flex items-center mr-4"><FaChevronLeft />Events</a>
            <h1>
                New Event
            </h1>
        </div>

        {error}

        <div className="mb-4">
            <label htmlFor="title" className={formLabelStyles}>Title</label>
        <input type="text" id="title" className={formInputStyles} onChange={(e) => updateEvent({ title: e.target.value })} value={title} required></input>
        </div>
        

        <div className="mb-4">
            <label htmlFor="short-desc" className={formLabelStyles}>Short Description</label>
            <input type="text" className={formInputStyles} id="short-desc" onChange={(e) => updateEvent({ shortDescription: e.target.value })} value={shortDescription} required></input>
        </div>

        <div className="mb-4">
            <label htmlFor="long-desc" className={formLabelStyles}>Long Description</label>
            <input type="text" className={formInputStyles} id="long-desc" onChange={(e) => updateEvent({ longDescription: e.target.value })} value={longDescription} required></input>
        </div>

        <div className="mb-4 flex">
            <div>
            <label htmlFor="img" className={formLabelStyles}>Image</label>
            <input ref={inputFileRef} type="file" id="img" accept="image/png, image/jpeg"></input>
            </div>
            <div>
            <label htmlFor="imgclr" className={formLabelStyles}>Image</label>
            <button className={formButtonStyles} onClick={() => {
                if (inputFileRef.current) { 
                    inputFileRef.current.value = "";
                    inputFileRef.current.dispatchEvent(new window.Event("change")) 
                }}}>Clear</button>
            </div>
        </div>
        
        <button className={formButtonStyles} onClick={onSubmit}>
            Submit
        </button>

        {
            loading && <p>
                Loading... Please wait.
            </p>
        }
    </div>
}

export default EventCreatePage