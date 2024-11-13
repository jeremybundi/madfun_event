"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // For managing hamburger menu state
import logo from "@/assets/images/logo2.png";
import { PlusIcon } from "@heroicons/react/24/solid";


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
        <button
          className="text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>

 {/* Desktop View (Original Layout) */}
<div className="hidden lg:flex items-center justify-between w-full">
  <div className="flex items-center">
    <Image src={logo} alt="Logo" className="w-[40px] h-[38px]" />
    <nav className="ml-10 flex text-sm font-Barlow font-kbold space-x-8">
      {[
        { href: "/", label: "Events" },
        { href: "/flights", label: "Flights" },
        { href: "/hotels", label: "Hotels" },
        { href: "/travel", label: "Travel" },
        { href: "/streams", label: "Streams" },
      ].map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="relative group flex items-center space-x-1"
        >
          <span
            className={`text-gray-800 ${
              isActive(href) ? "font-bold" : ""
            }`}
          >
            {label}
          </span>
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] transform ${
              isActive(href)
                ? "bg-blue-500 scale-x-100"
                : "bg-transparent scale-x-0"
            } group-hover:bg-red-500 group-hover:scale-x-100 transition-transform duration-300`}
          />
        </Link>
      ))}
    </nav>
  </div>

  {/* Right-aligned Links */}
  <nav className="flex space-x-8 text-sm font-Barlow font-kbold">
    {[
      { href: "/contact", label: "Contact Us" },
      { href: "/create-event", label: "Create Event", icon: true },
      { href: "/login", label: "Login" },
      { href: "/signup", label: "Sign Up" },
    ].map(({ href, label, icon }) => (
      <Link
        key={href}
        href={href}
        className="relative group flex items-center space-x-1"
      >
        {icon && <PlusIcon className="w-4 h-4 text-gray-800" />} {/* Conditional Icon */}
        <span
          className={`text-gray-800 ${
            isActive(href) ? "font-bold" : ""
          }`}
        >
          {label}
        </span>
        <span
          className={`absolute bottom-0 left-0 w-full h-[2px] transform ${
            isActive(href)
              ? "bg-blue-500 scale-x-100"
              : "bg-transparent scale-x-0"
          } group-hover:bg-red-500 group-hover:scale-x-100 transition-transform duration-300`}
        />
      </Link>
    ))}
  </nav>
</div>


      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[55px] left-0 w-full bg-white shadow-md z-10">
          <nav className="flex flex-col text-sm font-Barlow font-kbold space-y-4 py-4 px-8">
            {[
              { href: "/events", label: "Events" },
              { href: "/flights", label: "Flights" },
              { href: "/hotels", label: "Hotels" },
              { href: "/streams", label: "Streams" },
              { href: "/travel", label: "Travel" },
              { href: "/contact", label: "Contact Us" },
              { href: "/create-event", label: "Create Event" },
              { href: "/login", label: "Login" },
              { href: "/signup", label: "Sign Up" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="relative group">
                <span
                  className={`text-gray-800 ${
                    isActive(href) ? "font-bold" : ""
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`absolute bottom-2 left-[2] w-full h-[2px] transform ${
                    isActive(href)
                      ? "bg-blue-500 scale-x-100"
                      : "bg-transparent scale-x-0"
                  } group-hover:bg-red-500 group-hover:scale-x-100 transition-transform duration-300`}
                />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
