"use client";


import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo2.png'; 

export default function Page() {
  const [phoneNumber, setPhoneNumber] = useState('+254');
  const [paymentNumber, setPaymentNumber] = useState('+254');

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith('+254') && value.length <= 13) {
      setPhoneNumber(value);
      setPaymentNumber(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - 1/3 */}
      <div className="w-full md:w-1/3 bg-[#F3F5F8] p-6 flex items-start">
        <div className="flex flex-col">
          <div className="flex space-x-2">
            {/* Left-pointing SVG Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 mt-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>

            {/* Logo */}
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
            />
          </div>

          <p className="font-poppins text-[16px] ml-2 font-[400] my-3">Pay Madfun</p>
        </div>
      </div>

      {/* Right Column - 2/3 */}
      <div className="w-full md:w-2/3 p-3 bg-white flex flex-col">
        <div className="border border-[#E9EBEE] p-4 rounded-md">
          <div>
            <p className="text-[20px] font-[700] font-poppins my-5">Contact Person</p>
          </div>

          {/* Form */}
          <form className="flex flex-col md:mb-4 md:flex-row space-y-4 md:space-y-0 md:space-x-12">
            {/* Full Name */}
            <div className="flex-1 relative">
              <label
                htmlFor="fullName"
                className="block text-[14px] font-medium text-gray-400 font-poppins"
              >
                Full Name
                <span className="absolute top-[-4] right-[170px] text-red-500 text-lg">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="mt-1 block w-full border border-[#E9EBEE] py-1 rounded focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {/* Email */}
            <div className="flex-1 relative">
              <label
                htmlFor="email"
                className="block text-[14px] font-medium text-gray-400 font-poppins"
              >
                Email
                <span className="absolute top-[-4] right-[200px] text-red-500 text-lg">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border border-[#E9EBEE] rounded py-1 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {/* Phone Number */}
            <div className="flex-1 relative">
              <label
                htmlFor="phone"
                className="block text-[14px] font-medium text-gray-400 font-poppins"
              >
                Phone Number
                <span className="absolute top-[-4] right-[130px] text-red-500 text-lg">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="mt-1 block w-full border border-[#E9EBEE]  py-1 rounded focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
          </form>
        </div>
        
        <div className="border border-[#E9EBEE] mt-2 md:mt-5 p-4 flex flex-col rounded-md">
          <p className="mb-4 font-poppins font-[600] text-[18px]">Name the tickets (Optional)</p>
          <p className="text-[#808A92] font-[400] font-poppins">
            Rename your tickets by assigning the appropriate recipients' names and phone numbers.
          </p>
        </div>

        <div className="border border-[#E9EBEE] mt-5 p-4 flex flex-col rounded-md">
          <p className="font-poppins text-[20px] font-[700]">Pay via...</p>
          
          <div className="bg-[#E9EBEE] flex flex-col md:flex-row justify-center sm:space-x-16 md:space-x-36 items-center p-3 rounded-md mt-2">
            {/* MPesa Button */}
            <button className="bg-white font-medium py-2 px-10 sm:px-16 mb-2 sm:mb-0 sm:ml-4 rounded-md hover:bg-gray-400 transition duration-300">
              MPesa
            </button>
            
            {/* Card Payment Button */}
            <button className="bg-white font-medium py-2 px-10 sm:px-16 sm:ml-6 rounded-md hover:bg-gray-400 transition duration-300">
              Card
            </button>
          </div>

          <div className="mt-5 flex flex-col">
            <span className="font-poppins text-[14px] font-[400] sm:text-base">NUMBER TO PAY</span>
            <input 
              type="text" 
              value={paymentNumber} 
              readOnly
              className="mt-2 p-2 border mb-5 border-gray-300 rounded-md md:w-1/3 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className='mt-8'>
        <p className='font-poppins font-[400] text-[14px] text-[#808A92] italic'>
          Ticket(s) cannot be exchanged, cancelled or refunded after purchase.
        </p>

   {/* Terms and Conditions Checkbox */}
      <div className='mt-3 flex items-start'>
        <input
          type='checkbox'
          id='terms'
          className='w-6 h-6 border-[#101820] border-2 rounded focus:ring-gray-800 focus:ring-2'
        />
        <label className='ml-2 font-poppins text-[14px] font-[400]'>
          By ticking the box, I Agree to the <span className='font-[600]'>Terms and Conditions</span>
        </label>
      </div>
     {/* Pay Now Button */}
      <div className='mt-6'>
        <button className='w-1/3 bg-[#101820] font-poppins font-[500] text-white py-3 rounded-md hover:bg-gray-700 transition duration-300'>
          Pay Now
        </button>
      </div>

      </div>

      </div>
    </div>
  );
}
