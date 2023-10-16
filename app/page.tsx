import Image from 'next/image'

const formButtonStyles = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

export default function Home() {
  return (
    <>
    <div className="p-4">
      <p>Welcome to</p>
      <h1 className="text-6xl font-extralight">
        Bookingdle Admin
      </h1></div>
      <a href="/events" className={`${formButtonStyles} m-4`}>
        Manage Events
      </a>
      <p className='p-6 text-gray-500'>
        &copy; 2023 Joshua Steele <br />
        Portions of this software &copy; Adam Jenkins and the University of South Australia
      </p>
    </>
  )
}
