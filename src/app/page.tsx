'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';
import slide from '@/assets/images/slide.png'; 
import axios from 'axios';

type Ticket = {
  price: number;
};

type Show = {
  tickets: Ticket[];
  startTime: string; 
};

type Event = {
  eventId: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  venue: string;
  total_tickets: number;
  posterURL: string;
  shows: Show[];
  showType: 'SINGLE' | 'MULTIPLE'; 

};

function EventCard({ event }: { event: Event }) {
  const leastPrice = event.shows
    ?.flatMap((show) => show.tickets.map((ticket) => ticket.price))
    .reduce((min, price) => (price < min ? price : min), Infinity);

    const eventRoute =
    event.showType === 'SINGLE'
      ? `/events/${event.eventId}/single-show`
      : `/events/${event.eventId}/multi-show`;;

  return (
    <Link href={eventRoute}>
      <div className="bg-white rounded-lg md:h-[420px] shadow-md overflow-hidden cursor-pointer">
        <div className="relative">
          <div className="rounded p-2 w-full">
            <Image
              src={event.posterURL}
              alt={event.title}
              width={400}
              height={400}
              className="w-full md:h-[300px] rounded-md object-cover"
            />
          </div>
          <div className="absolute top-3 left-3 bg-white text-[#E4002B] font-poppins text-xs font-semibold p-2 rounded-md">
            {new Date(event.shows[0]?.startTime).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
            }).toUpperCase()}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-poppins font-semibold mb-2">{event.title}</h3>
          <div className="flex items-center">
            <p className="mt-2 text-gray-500 text-xs font-barlow">
              {leastPrice !== Infinity ? `Play * Ksh. ${leastPrice.toFixed(0)} +` : 'No tickets available'}
            </p>
            <button className="bg-[#FFD100] font-semibold text-xs font-poppins py-2 px-4 ml-auto rounded-lg shadow-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 ease-in-out">
              Buy
            </button>
          </div>
        </div>
      </div>
    </Link>
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 20000);
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
        const response = await axios.get('https://events.madfun-adventures.com/api/v3/public/events');
        if (response.data.status === 'SUCCESS') {
          setEvents(response.data.data); 
          console.log(response.data.data);
        } else {
          console.error('Failed to fetch events:', response.data);
          setError('Failed to fetch events');
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {displayedEvents.map((event) => (
                <EventCard key={event.eventId} event={event} />
              ))}
            </div>

            {!showAllEvents && events.length > 4 && (
              <div className="flex flex-col items-center justify-center mt-4">
                <button
                  onClick={() => setShowAllEvents(true)}
                  className="text-lg font-poppins  mt-8  font-semibold hover:underline"
                >
                  View More
                </button>
                <div className="mt-1 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 16 16"
                    className="font-bold"
                  >
                    <path d="M3 4L8 9L13 4" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* All Events Section */}
      <div className="bg-[#F3F5F8]">
        <div className="m-8">
          <p className="font-semibold text-xl font-poppins py-4 my-4">ALL UPCOMING EVENTS</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {events.map((event) => (
              <EventCard key={event.eventId} event={event} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
