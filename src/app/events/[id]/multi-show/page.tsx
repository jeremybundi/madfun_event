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


  const [openShow, setOpenShow] = useState<number | null>(null); // State to track which show is open

  const handleToggle = (showId: number) => {
    // Toggle the dropdown for the clicked show
    setOpenShow(openShow === showId ? null : showId);
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://events.madfun-adventures.com/api/v3/public/events/${id}`);
        if (response.data && response.data.status === "SUCCESS") {
          setEvent(response.data.data);
          console.log(response.data.data)
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

        <div className="w-full md:w-[80%] mr-12 mt-1 p-6 rounded-lg">
  {/* Top Section with bg-gray-200 */}
  <div className="bg-[#E9EBEE] py-4 px-2 rounded-t-lg">
    <div className="flex w-full justify-between mb-3 items-center">
      <h2 className="text-[23px] font-poppins font-[600] ml-6">Buy Tickets</h2>
      <div className="flex gap-3 text-xs mr-6 font-poppins">
        <button className="border-2 border-gray-500 text-gray-600 py-1 px-3 rounded-lg hover:bg-gray-300">
          Add to Calendar
        </button>
        <button className="border-2 border-gray-500 text-gray-600 py-1 px-3 rounded-lg hover:bg-gray-300">
          View Map
        </button>
      </div>
    </div>
  </div>

  <div className="bg-gray-100 h-[500px] -mt-4 rounded-b-lg overflow-y-scroll">
      <div className=" mt-3  mx-4">
        
        {event.shows.map((show) => (
          <div key={show.showId} className="mb-4">
            {/* Show Header */}
            <div
  onClick={() => handleToggle(show.showId)}
  className="cursor-pointer flex flex-col justify-between items-start border border-[#D9D9D9] rounded-lg bg-[#F3F5F8] px-3 pb-2"
>
  <h3 className="text-sm py-3 font-semibold">{show.name}</h3>
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2 font-barlow text-[16px]">
      <Image src={calendarIcon} alt="Calendar" width={20} height={20} />
      {formatShowStartTime(show.startTime)}
    </div>
    <div className="flex items-center gap-2 ml-16 font-barlow text-[16px]">
      <Image src={locationIcon} alt="Location" width={20} height={20} />
      {show.streetAddress}, {show.city}
    </div>
    <div className=" transform -translate-y-1/2 text-[24px] ml-12 font-thin">
    &gt;
  </div>
  </div>

</div>

            {/* Dropdown for Tickets */}
            {openShow === show.showId && (
              <div className="mt-3  border-[#D9D9D9] w-full  bg-white">
                <div className="p-4">
                  {show.tickets.map((ticket) => (
                    <div key={ticket.ticketId} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                      <div className="rounded-full py-2 px-2 bg-slate-300">
                      <Image src={ticketIcon} alt="Ticket Icon" width={24} height={16} />
                    </div>

                        <div className="ml-3">
                          <h3 className="text-lg font-medium">{ticket.name}</h3>
                          <p className="text-gray-600">Price: Ksh {ticket.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(ticket.ticketId, false)}
                          className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-4 text-lg font-semibold">
                          {ticketQuantities[ticket.ticketId] || 0}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(ticket.ticketId, true)}
                          className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
  



  <div className="flex justify-between mx-8 items-center mt-12">
    <div className="flex flex-col">
    <div className=" font-semibold  text-gray-600">Total:  </div>
    <span className=" font-poppins font-semibold text-[24px]"> Ksh {totalAmount.toFixed(2)}</span>

    </div>
      <button className="bg-yellow-500 text-white px-8 py-3 font-bold rounded-lg hover:bg-gray-700">
        Checkout
      </button>
    </div>
</div>


  </div>
</div>

    </div>
    
  );
}



















