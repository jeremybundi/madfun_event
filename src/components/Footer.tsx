import Image from 'next/image';
import call from '@/assets/images/call.png';
import message from '@/assets/images/message.png';
import location from '@/assets/images/location.png';
import logo from '@/assets/images/logo2.png';
import line from '@/assets/images/line.png';
import facebook from '@/assets/images/facebook.png';
import twitter from '@/assets/images/twitter.png';
import instagram from '@/assets/images/instagram.png';

export default function Footer() {
  return (
    <div className="md:w-full bg-[#101820] flex flex-col items-center justify-center">
      {/* Smaller box with contact information */}
      <div className="bg-[#101820] justify-between border md:mt-4 m-2 items-cente md:h-[60px] border-[#FFFFFF1A] p-4 rounded-lg flex md:space-x-48 flex-col md:flex-row">
  {/* Call Us Section */}
  <div className="flex flex-row items-center ml-1 md:ml-16 mb-4 md:mb-0">
    <Image src={call} alt="Call" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />
    <div className="flex flex-col ml-4 text-xs text-white font-poppins">
      <p className="font-semibold mb-2">Call Us</p>
      <p className="font-barlow text-gray-400 font-barlow font-thin">+254 115 555 000</p>
    </div>
    {/* Line only visible on medium and larger screens */}
    <div className="hidden md:block">
      <Image src={line} alt="Call" className="ml-36 h-[40px]" />
    </div>
  </div>

  {/* Write to Us Section */}
  <div className="flex flex-row items-center mb-4 md:mb-0">
    <Image src={message} alt="Message" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />
    <div className="flex flex-col ml-4 text-xs text-white font-poppins">
      <p className="font-semibold mb-2">Write to us</p>
      <p className="font-barlow text-gray-400 font-barlow font-thin">info@madfun.com</p>
    </div>
    {/* Line only visible on medium and larger screens */}
    <div className="hidden md:block">
      <Image src={line} alt="Message" className="ml-24  h-[40px]" />
    </div>
  </div>

  {/* Address Section */}
  <div className="flex flex-row items-center">
    <Image src={location} alt="Location" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />
    <div className="flex flex-col ml-4 text-xs text-white font-poppins mr-16">
      <p className="font-semibold mb-2">Address</p>
      <p className="font-barlow text-gray-400 font-barlow font-thin">4th floor, Kalson Towers, Nairobi</p>
    </div>
  </div>
</div>



      {/* Three columns below the small box */}
      <div className="w-full flex flex-col md:flex-row justify-between md:mt-8 px-12 text-white font-poppins">
        {/* First column: Logo */}
        <div className="flex flex-col ml-4 items-start mb-8 md:mb-0">
          <Image src={logo} alt="Logo" className="w-[40px] h-auto mb-4" />
          <p className="text-xs mb-2 text-gray-400 font-barlow font-thin">
            Madfun is an event and travel company offering
            <p>seamless solutions for users to create & manage <p></p>
            events, buy tickets, book flights, and <p></p> accommodations
            with ease.</p>
          </p>
          {/* Read More About link */}
          <a href="#" className="flex items-center font-barlow font-semibold text-xs md:mt-4 hover:underline">
            Read More About
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-3 h-3 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
          <div className="flex space-x-4 mt-2 md:mt-8">
            <Image src={facebook} alt="Logo" className="w-[30px] h-auto mb-4" />
            <Image src={twitter} alt="Logo" className="w-[30px] h-auto mb-4" />
            <Image src={instagram} alt="Logo" className="w-[30px] h-auto mb-4" />
          </div>
        </div>

        {/* Second column: Quick Links */}
        <div className="flex flex-col  space-y-2 md:mb-8 ">
          <h3 className="md:text-lg font-semibold text-center text-[11px] md:mb-4">Quick Links</h3>
          <a href="#" className="hover:underline text-center text-[10px] md:text-xs text-gray-400 font-barlow font-thin">About Us</a>
          <a href="#" className="hover:underline text-center text-[10px] md:text-xs text-gray-400 font-barlow font-thin">Events guide</a>
          <a href="#" className="hover:underline text-center text-[10px] md:text-xs text-gray-400 font-barlow font-thin">Fun Times</a>
        </div>

        {/* Third column: Subscribe */}
        <div className="flex flex-col mr-24 space-y-2 mb-8 md:mb-0">
          <h3 className="md:text-lg text-xs text-center font-semibold md:mb-4">Subscribe</h3>
          <p className="mb-4 md:text-xs text-[10px] text-gray-400 font-barlow font-thin">
            Sign up for our monthly blogletter <br />
            to stay informed about travel and events
          </p>
          <div className="flex items-center border-4 mt-8 border-gray-500 rounded-lg">
  <input
    type="email"
    placeholder="Enter your email"
    className="p-2 rounded-l-md border-r-0 border-gray-300 flex-1"
  />
  <button className="p-2 bg-gray-900 text-white rounded-r-md hover:bg-gray-600">
    Subscribe
  </button>
</div>

        </div>
      </div>

      {/* Copyright */}
      <div>
        <p className="text-xs mb-4 text-gray-400 font-barlow font-thin">©2023 Madfun. All rights reserved.</p>
      </div>
    </div>
  );
}
