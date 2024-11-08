
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/NavBar";
import Image from "next/image";
import slide from "@/assets/images/slide.png";
import ticketIcon from "@/assets/images/ion_ticket-sharp.png"; 
import shareIcon from '@/assets/images/share.png';
import locationIcon from '@/assets/images/locationicon.png';
import calendarIcon from '@/assets/images/calendar.png';



type Ticket = {
  ticketId: number;
  name: string;
  description: string;
  type: string;
  price: number;
  availableQuantity: number;
};

type Show = {
  showId: number;
  name: string;
  startTime: string;
  endTime: string;
  streetAddress: string;
  city: string;
  tickets: Ticket[];
  latitude?: number; 
  longitude?: number; 
};

type Event = {
  eventId: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  venue: string;
  total_tickets: number;
  posterURL: string;
  specialGuests: string;
  shows: Show[];
  ageLimit: string;
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ticketQuantities, setTicketQuantities] = useState<{ [key: number]: number }>({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://events.madfun-adventures.com/api/v3/public/events/${id}`);
        if (response.data && response.data.status === "SUCCESS") {
          setEvent(response.data.data);
        } else {
          throw new Error("Event not found");
        }
      } catch (err) {
        setError("Error fetching event details");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  useEffect(() => {
    // Calculate the total amount whenever ticketQuantities change
    if (event) {
      const total = event.shows.flatMap(show => show.tickets).reduce((sum, ticket) => {
        const quantity = ticketQuantities[ticket.ticketId] || 0;
        return sum + quantity * ticket.price;
      }, 0);
      setTotalAmount(total);
    }
  }, [ticketQuantities, event]);

  const handleQuantityChange = (ticketId: number, increment: boolean) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [ticketId]: Math.max((prev[ticketId] || 0) + (increment ? 1 : -1), 0),
    }));
  };

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error || !event) {
    return <div>{error || "Event not found."}</div>;
  }
  const specialGuests = event.specialGuests ? JSON.parse(event.specialGuests) : [];
  return (
    <div>
      <Header />
      <div className="flex md:flex-row gap-2">
        <div className="w-full ml-12 ">
          <Image
            src={event.posterURL || slide}
            alt={event.title}
            width={700}
            height={700}
            className="rounded-2xl shadow-lg   object-cover"
          />
           <div className="flex mt-12 mb-6 justify-between">
           <h1 className="text-2xl font-semibold ">{event.title}</h1>
           <button className="flex items-center border border-gray-600 border-3 rounded-lg text-lg font-semibold font-poppins mr-8 p-1 px-4 hover:bg-gray-100">
            <Image
                src={shareIcon}
                alt="Share"
                className="w-4 h-4 mr-2"
            />
            Share
            </button>

           </div>

           <p className="text-xl font-semibold font-poppins mb-4"> Event Description</p>
         
          <p className="text-gray-700 font-barlow text-lg mt-2 mb-1">{event.description}</p>

          <hr className="border-gray-300 my-3" />


          <h1 className="font-semibold text-lg font-poppins mb-3">Artistes / Perfomers / Guests</h1>
          <ul className="list-disc ml-6">
            {specialGuests.length > 0 ? (
              specialGuests.map((guest: { name: string }, index: number) => (
                <li key={index} className="text-gray-700 font-barlow">{guest.name}</li>
              ))
            ) : (
              <p>No special guests available for this event.</p>
            )}
          </ul>
          <hr className="border-gray-300 my-3" />

          <p className="text-lg mb-2 font-semibold">Map Location</p>
          {event.shows && event.shows.length > 0 && event.shows[0].latitude && event.shows[0].longitude ? (
            <iframe
                title="Map Location"
                src={`https://www.google.com/maps?q=${event.shows[0].latitude},${event.shows[0].longitude}&hl=es;z=14&output=embed`}
                width="100%"
                height="350"
                className="border-0 rounded-lg my-2"
                allowFullScreen
                loading="lazy"
            ></iframe>
            ) : (
            <p className="text-gray-500 mt-2">Location not available</p>
            )}
            <div>
                <p>Event Organizer</p>
            </div>
        </div>

        {/* Ticket Categories Section */}

        <div className="w-full md:w-[80%] mr-12 mt-1 p-6 rounded-lg">
  {/* Top Section with bg-gray-200 */}
  <div className="bg-gray-300 py-4 px-2 rounded-t-lg">
    <div className="flex w-full justify-between items-center">
      <h2 className="text-2xl font-poppins font-semibold">Buy Tickets</h2>
      <div className="flex gap-3 text-xs font-poppins">
        <button className="border-2 border-gray-500 text-gray-600 py-1 px-3 rounded-lg hover:bg-gray-300">
          Add to Calendar
        </button>
        <button className="border-2 border-gray-500 text-gray-600 py-1 px-3 rounded-lg hover:bg-gray-300">
          View Map
        </button>
      </div>
    </div>
  </div>

{/* Bottom Section */}
<div className="bg-gray-100 h-[500px] -mt-4 rounded-b-lg overflow-y-scroll">
  <div className="mx-8 mt-3 mr-12">
    {event.shows.map((show) => (
      <div key={show.showId} className="border border-gray-300 rounded-lg mb-4">
        {/* Show Header with Calendar and Location Icons */}
        <details className="group">
          <summary className="cursor-pointer flex justify-between items-center bg-gray-200 p-3 rounded-t-lg">
            <h3 className="text-sm py-3 font-semibold">{show.name}</h3>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <Image src={calendarIcon} alt="Calendar" width={20} height={20} />
                <span>{show.startTime}</span>
              </div>
              <div
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <Image src={locationIcon} alt="Location" width={20} height={20} />
                <span>{show.city}</span>
              </div>
            </div>
          </summary>

          {/* Dropdown for Tickets */}
          <div className="bg-white p-3 rounded-b-lg mt-2">
            {show.tickets.map((ticket) => (
              <div
                key={ticket.ticketId}
                className="flex items-center border-b border-gray-300 py-4"
              >
                <div className="rounded-3xl py-2 pl-2 items-center bg-slate-300">
                  <Image
                    src={ticketIcon}
                    alt="Ticket Icon"
                    width={30}
                    height={30}
                    className="mr-3"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <h3 className="text-lg font-medium">{ticket.name}</h3>
                  <p className="text-gray-600">Price: Ksh {ticket.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(ticket.ticketId, false)}
                    className="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 text-lg font-semibold">
                    {ticketQuantities[ticket.ticketId] || 0}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(ticket.ticketId, true)}
                    className="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    ))}
  </div>
</div>


    <div className="flex justify-between items-center mt-4">
      <span className="text-xl font-semibold">Total: Ksh {totalAmount.toFixed(2)}</span>
      <button className="bg-[#101820] text-white px-4 py-2 rounded-lg hover:bg-gray-700">
        Checkout
      </button>
    </div>
  </div>
</div>

    </div>
    
  );
}



















