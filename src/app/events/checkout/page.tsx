import Image from 'next/image';
import logo from '@/assets/images/logo2.png'; // Adjust the path as per your project structure

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - 1/3 */}
      <div className="w-full md:w-1/3 bg-[#F3F5F8] p-6 flex items--start">
        <div className="flex flex-col">
          <div className="flex  space-x-2">
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
      <div className="w-full md:w-2/3 p-6 bg-white flex flex-col">
        <div className="border border-[#E9EBEE] p-4 rounded-md">
          <div>
            <p className="text-[20px] font-[700] font-poppins mb-4">Contact Person</p>
          </div>

          {/* Form */}
          <form className="flex flex-col md:flex-row space-y- md:space-x-12">
            {/* Full Name */}
            <div className="flex-1 relative">
              <label
                htmlFor="fullName"
                className="block text-[14px] font-medium text-gray-400 font-poppins"
              >
                Full Name
                <span className="absolute top-[-4] right-[-10px] text-red-500 text-lg">*</span>
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
                <span className="absolute top-[-4] right-[-10px] text-red-500 text-lg">*</span>
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
                <span className="absolute top-[-4] right-[-10px] text-red-500 text-lg">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full border border-[#E9EBEE] py-1 rounded focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
          </form>
        </div>
        <div className="border border-[#E9EBEE] mt-3 p-4 flex flex-col rounded-md">
            <p className='mb-3 font-poppins font-[600] text-[18px]'>Name the tickets (Optional)</p>
            <p className='text-[#808A92] font-[400 font-poppins]'>Rename your tickets by assigning the appropriate recipients' names and phone numbers.</p>
        </div>
        <div className="border border-[#E9EBEE] mt-3 p-4 flex flex-col rounded-md">
            <p className='font-poppins text-[20px] font-[700]'>Pay via...</p>
            <div className="bg-[#E9EBEE] flex justify-between items-center p-2 rounded-md mt-2 space-x-16">
            {/* MPesa Button */}
            <button className="bg-[white]  font-medium py-2 px-16 ml-14 rounded-md hover:bg-gray-400 transition duration-300">
                MPesa
            </button>

            {/* Card Payment Button */}
            <button className="bg-[#3A82F7] text-white font-medium py-2 px-16 mr-16  rounded-md hover:bg-[#2c6bcf] transition duration-300">
                Card
            </button>
            </div>

            
        </div>
      </div>
    </div>
  );
}
