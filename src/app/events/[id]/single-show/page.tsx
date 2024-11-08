
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/NavBar";
import Image from "next/image";
import slide from "@/assets/images/slide.png";
import ticketIcon from "@/assets/images/ion_ticket-sharp.png"; 
import shareIcon from '@/assets/images/share.png';
import calendarIcon from '@/assets/images/calendar.png';
import locationIcon from '@/assets/images/locationicon.png';




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

type User = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    cognitoUID: string;
  };

type Organization = {
    organizationId: number;
    user: User;
  };

type Event = {
  eventId: number;
  title: string;
  date: string;
  end_time: string;
  description: string;
  venue: string;
  total_tickets: number;
  posterURL: string;
  specialGuests: string;
  shows: Show[];
  ageLimit: string;
  organization?: Organization; 

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

  const formatShowStartTime = (startTime: string | Date) => {
    const date = new Date(startTime);
  
    // Check if date is invalid
    if (isNaN(date.getTime())) {
      return 'Invalid date'; // Fallback for invalid dates
    }
  
    // Options for day, month, and time formatting
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hours = date.getHours() % 12 || 12; // 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am'; // AM/PM check
  
    return `${day} ${month}, ${hours}:${minutes}${ampm}`;
  };
  
  



  return (
    <div>
      <Header />
      <div className="flex md:flex-row gap-8">
        <div className="w-full md:w-[80%] mt-6 ml-12 ">
          <Image
            src={event.posterURL || slide}
            alt={event.title}
            width={750}
            height={750}
            className="rounded-2xl shadow-lg   object-cover"
          />
           <div className="flex mt-12 mb-6 justify-between">
           <h1 className="text-[32px] text-[#101820] font-poppins font-semibold ">{event.title}</h1>
           <button className="flex items-center border border-[#101820] border-3 
           rounded-lg text-lg font-[500] font-poppins mr-8 p-1 px-4 hover:bg-gray-100">
            <Image
                src={shareIcon}
                alt="Share"
                className="w-4 h-4 mr-2"
            />
            Share
            </button>

           </div>

           <p className="text-[18px] font-semibold font-poppins mb-4"> Event Description</p>
         
          <p className="text-gray-700 font-barlow text-[16px] mt-2 mb-1">{event.description}</p>

          <hr className="border-gray-300 my-3" />


          <h1 className="font-semibold text-[18px] font-poppins mb-3">Artistes / Perfomers / Guests</h1>
          <ul className="list-disc ml-6">
            {specialGuests.length > 0 ? (
              specialGuests.map((guest: { name: string }, index: number) => (
                <li key={index} className="text-[#101820] text-[16px] font-barlow">{guest.name}</li>
              ))
            ) : (
              <p>No special guests available for this event.</p>
            )}
          </ul>
          <hr className="border-gray-300 my-3" />

          <p className="text-[18px] font-poppins text-[#101820] mb-2 font-semibold">Map Location</p>
          {event.shows && event.shows.length > 0 && event.shows[0].latitude && event.shows[0].longitude ? (
            <iframe
                title="Map Location"
                src={`https://www.google.com/maps?q=${event.shows[0].latitude},${event.shows[0].longitude}&hl=es;z=14&output=embed`}
                width="100%"
                height="250"
                className="border-0 rounded-lg my-2"
                allowFullScreen
                loading="lazy"
            ></iframe>
            ) : (
            <p className="text-gray-500 mt-2">Location not available</p>
            )}
          <div className="mt-6 mb-16" >
            <p className="font-poppins text-[18px] font-semibold">Event Organizer</p>
            <div className="flex">
            {event.organization && event.organization.user ? (
                <p className="text-[#101820] font-poppins text-[16px] mt-2 font-[500]">
                {`${event.organization.user.firstName} ${event.organization.user.lastName}`}
                </p>
            ) : (
                <p className="text-gray-500">Organizer details not available</p>
            )}
            <div className="ml-32">
            <button className="bg-transparent text-[#101820] hover:text-gray-600 font-poppins font-[400] text-[16px] px-4 py-2 focus:outline-none">
            Send Message
            </button>
            <button className="border border-[#101820] text-[#101820] font-[400] ml-5 hover:bg-gray-600 hover:text-white font-poppins  text-[16px] 
            px-4 py-1  rounded-lg transition duration-200">
            Follow
            </button>
            </div>

            </div>
            </div>

        </div>

        {/* Ticket Categories Section */}

        <div className="w-full md:w-[80%] mr-12 p-6  rounded-lg ">
   {/* Top Section with bg-gray-200 */}
   <div className="bg-gray-300 py-3 px-2 rounded-t-lg ">
    <div className="flex w-full justify-between items-center ">
      <h2 className="text-[23px] font-poppins ml-6 font-[600]">Buy tickets</h2>
      <div className="flex gap-3 text-xs font-poppins">
        <button className="border-[1px] border-[#101820] font-[400] py-1 px-3 font-barlow text-[14px] rounded-lg">
          Add to Calendar
        </button>
        <button className="border-[1px] border-[#101820] text-[14px] mr-5 text-[#101820] py-1 px-3 rounded-lg ">
          View Map
        </button>
      </div>
    </div>
  </div>

<div className="bg-gray-100  h-[500px]  rounded-b-lg overflow-hidden ">
  
       
<div className="flex border border-gray-300 mt-6 mb-6 rounded-md p-4 gap-4 mx-6">
       {/* Calendar Icon */}
       <div className="flex items-center">
       <Image
        src={calendarIcon}
        alt="Calendar"
        className="w-6 h-6 mr-2"
        />
            <span className="ml-2 text-[16px] font-barlow font-[400] text-gray-600"> 
            {formatShowStartTime(event.shows[0].startTime)}
            </span>
            </div>

       {/* Location Icon */}
       <div className="flex ml-16 items-center">
       <Image
        src={locationIcon}
        alt="Location"
        className="w-5 h-6 mr-2"
        />
  <span className="ml-2 text-[16px] font-barlow font-[400] text-gray-600">
      {event.shows[0].streetAddress}, {event.shows[0].city}
    </span>
           </div>
       
       </div>
       <div className="mx-6 bg-white  ">
          {event.shows.map(show => (
            <div key={show.showId}>
              {show.tickets.map(ticket => (
                <div key={ticket.ticketId} className="flex items-center border-b border-gray-300 px-4 py-4">
                  <div className="rounded-3xl py-2 pl-2 items-center bg-slate-300">
                    <Image src={ticketIcon} alt="Ticket Icon" width={30} height={30} className="mr-3 " />
                  </div>
                  <div className="flex-1 ml-2">
                    <h3 className="text-[16px] font-barlow font-[400] ">{ticket.name}</h3>
                    <p className="text-[16] font-poppins font-[600]">Price: Ksh {ticket.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(ticket.ticketId, false)}
                      className="px-2 py-1 text-2xl bg-gray-200 w-[52px] h-[52px] rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-4 text-2xl font-semibold">{ticketQuantities[ticket.ticketId] || 0}</span>
                    <button
                      onClick={() => handleQuantityChange(ticket.ticketId, true)}
                      className="px-2 py-1 text-2xl  bg-gray-200 w-[52px] h-[52px] rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                
              ))}
            </div>
          ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className=" flex flex-col ml-6">
            <span className="text-[14px] font-barlow font-[400]">Total </span>
            <span className="font-poppins text-[20px] font-[600]"> Ksh {totalAmount.toFixed(2)}</span>
            </div>
            <button className="bg-[#101820] text-white h-[52px] w-[183px] mr-7 rounded-lg hover:bg-gray-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}



















