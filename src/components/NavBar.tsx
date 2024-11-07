"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // For managing hamburger menu state
import logo from "@/assets/images/logo2.png";

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Function to toggle the menu

  return (
    <div className="h-[55px] w-full flex items-center shadow justify-between px-16">
      {/* Mobile View - Logo on the left, Hamburger on the right */}
      <div className="flex items-center justify-between w-full lg:hidden">
        <div className="flex items-center space-x-8">
          <Image src={logo} alt="Logo" className="w-[40px] h-[38px]" />
        </div>
        {/* Hamburger Menu Button */}
        <button className="text-gray-800 focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Desktop View (Original Layout) */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" className="w-[40px] h-[38px]" />
          <nav className="ml-10 flex text-sm font-Barlow font-kbold space-x-8">
            <Link href="/events" className={`text-[#101820] ${isActive('/events') ? 'underline' : ''} hover:underline`}>
              Events
            </Link>
            <Link href="/flights" className={`text-gray-800 ${isActive('/flights') ? 'underline' : ''} hover:underline`}>
              Flights
            </Link>
            <Link href="/hotels" className={`text-gray-800 ${isActive('/hotels') ? 'underline' : ''} hover:underline`}>
              Hotels
            </Link>
            <Link href="/streams" className={`text-gray-800 ${isActive('/streams') ? 'underline' : ''} hover:underline`}>
              Travel
            </Link>
            <Link href="/streams" className={`relative text-gray-800 group`}>
              Streams
              <span className={`absolute left-0 bottom-0 h-[3px] bg-gray-800 transition-transform duration-300 transform ${isActive('/streams') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`} 
                style={{ marginBottom: '1rem', transformOrigin: 'left' }} 
              ></span>
            </Link>
          </nav>
        </div>
        <div className="flex space-x-8 text-sm font-Barlow font-kbold">
          <Link href="/contact" className={`text-gray-800 ${isActive('/contact') ? 'underline' : ''} hover:underline`}>
            Contact Us
          </Link>
          <Link href="/create-event" className={`text-gray-800 flex items-center ${isActive('/create-event') ? 'underline' : ''} hover:underline`}>
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Event
          </Link>
          <Link href="/login" className={`text-gray-800 ${isActive('/login') ? 'underline' : ''} hover:underline`}>
            Login
          </Link>
          <Link href="/signup" className={`hidden lg:block border border-gray-800 rounded text-gray-800 px-3 ${isActive('/signup') ? 'underline' : ''} hover:underline`}>
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[55px] left-0 w-full bg-white shadow-md z-10">
          <nav className="flex flex-col text-sm font-Barlow font-kbold space-y-4 py-4 px-8">
            <Link href="/events" className={`text-[#101820] ${isActive('/events') ? 'underline' : ''} hover:underline`}>
              Events
            </Link>
            <Link href="/flights" className={`text-gray-800 ${isActive('/flights') ? 'underline' : ''} hover:underline`}>
              Flights
            </Link>
            <Link href="/hotels" className={`text-gray-800 ${isActive('/hotels') ? 'underline' : ''} hover:underline`}>
              Hotels
            </Link>
            <Link href="/streams" className={`text-gray-800 ${isActive('/streams') ? 'underline' : ''} hover:underline`}>
              Travel
            </Link>
            <Link href="/streams" className={`relative text-gray-800 group`}>
              Streams
              <span className={`absolute left-0 bottom-0 h-[3px] bg-gray-800 transition-transform duration-300 transform ${isActive('/streams') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`} 
                style={{ marginBottom: '1rem', transformOrigin: 'left' }} 
              ></span>
            </Link>
            <Link href="/contact" className={`text-gray-800 ${isActive('/contact') ? 'underline' : ''} hover:underline`}>
              Contact Us
            </Link>
            <Link href="/create-event" className={`text-gray-800 flex items-center ${isActive('/create-event') ? 'underline' : ''} hover:underline`}>
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Event
            </Link>
            <Link href="/login" className={`text-gray-800 ${isActive('/login') ? 'underline' : ''} hover:underline`}>
              Login
            </Link>
            <Link href="/signup" className={`border border-gray-800 rounded text-gray-800 px-3  ${isActive('/signup') ? 'underline' : ''} hover:underline`}>
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
