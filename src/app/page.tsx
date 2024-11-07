'use client';

import { useEffect, useState } from 'react';
import Header from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';
import slide from '@/assets/images/slide.png'; // Placeholder image
import axios from 'axios';

type Event = {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  venue: string;
  total_tickets: number;
  image_url: string;
};

function EventCard({ event, onClick }: { event: Event, onClick: (event: Event) => void }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden" onClick={() => onClick(event)}>
      <div className="relative">
        <div className='rounded p-2 w-full'>
          <Image
            src={event.image_url || slide} // Show placeholder image if no event image
            alt={event.name}
            width={500}
            height={300}
            className="w-full md:h-48 h-36 rounded-md object-cover"
            onError={(e: any) => e.target.src = slide}  // In case the image URL is broken
          />
        </div>

        {/* Event Date */}
        <div className="absolute top-3 left-3 bg-white text-[#E4002B] text-xs font-semibold p-2 rounded-md">
          {new Date(event.date).toLocaleDateString()} {/* Format date */}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-poppins font-semibold mb-2">{event.name}</h3>
        <div className='flex'>        
          <p className="mt-2 text-gray-500 text-xs font-barlow">Tickets: {event.total_tickets}</p>
          <button className="bg-[#FFD100] font-semibold text-xs font-poppins py-2 px-4 ml-auto rounded-lg shadow-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 ease-in-out">
            Buy 
          </button>
        </div>
      </div>
    </div>
  );
}

function EventDetails({ event }: { event: Event }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 lg:w-1/2">
        <button className="absolute top-2 right-2 text-xl text-gray-500">X</button>
        <h2 className="text-2xl font-semibold mb-4">{event.name}</h2>
        <p className="mb-4">{event.description}</p>
        <p className="text-lg font-medium mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-lg font-medium mb-2">Time: {event.start_time} - {event.end_time}</p>
        <p className="text-lg font-medium">Venue: {event.venue}</p>
      </div>
    </div>
  );
}

export default function Page() {
  const [banners, setBanners] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const goToNextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const goToPreviousBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/event/get/public');
        console.log(response.data); // Log the entire response data
        if (response.data && response.data.status === 'success') {
          setEvents(Object.values(response.data.data));
        }
      } catch (err) {
        setError('Error fetching events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const displayedEvents = showAllEvents ? events : events.slice(0, 4);

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <Header />

      {/* Sliding Banner Section */}
      <div className="w-full h-[270px] rounded relative">
        {showBanner && (
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="w-full h-full flex-shrink-0">
                <Image
                  src={banners.length > 0 ? banners[currentIndex] : slide}
                  alt={`Banner ${currentIndex}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-700 ease-in-out"
                />
              </div>
            </div>

            <button
              onClick={goToPreviousBanner}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-opacity-50 text-7xl p-3 rounded-full"
            >
              &lt;
            </button>

            <button
              onClick={goToNextBanner}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-opacity-50 text-7xl p-3 rounded-full"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Events Section */}
      <div className="px-8 py-4">
        <p className="font-semibold text-xl font-poppins mb-4">MADFUN PRODUCTIONS</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin border-4 border-t-4 border-gray-800 rounded-full w-16 h-16"></div>
            <span className="ml-4 text-gray-500">Loading events...</span>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>
            {/* Grid layout for events */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={openEventDetails} />
              ))}
            </div>

            {/* View More button */}
            {!showAllEvents && events.length > 4 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAllEvents(true)}
                  className="flex items-center text-xs font-semibold hover:underline"
                >
                  View More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 16 16"
                    className="font-semibold ml-2"
                  >
                    <path d="M3 4L8 9L13 4" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section for All Events */}
      <div className="bg-[#F3F5F8]">
        <div className="m-8">
          <p className="font-semibold text-xl font-poppins py-4 my-4">ALL UPCOMING EVENTS</p>
          {/* Grid layout for events */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onClick={openEventDetails} />
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      {selectedEvent && <EventDetails event={selectedEvent} />}

      <Footer />
    </div>
  );
}
