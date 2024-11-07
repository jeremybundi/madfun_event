import { FC } from 'react';

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

type EventModalProps = {
  isOpen: boolean;
  event: Event | null;
  closeModal: () => void;
};

const EventModal: FC<EventModalProps> = ({ isOpen, event, closeModal }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold text-gray-700">
          X
        </button>
        <h2 className="text-xl font-semibold">{event.name}</h2>
        <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
        <img
          src={event.image_url || '/slide.png'}
          alt={event.name}
          className="w-full h-48 object-cover my-4 rounded-lg"
        />
        <p className="text-gray-700">{event.description}</p>
        <p className="mt-2 font-semibold text-gray-800">Venue: {event.venue}</p>
        <p className="mt-2 text-sm text-gray-500">Start Time: {event.start_time}</p>
        <p className="mt-2 text-sm text-gray-500">End Time: {event.end_time}</p>
        <p className="mt-2 text-sm text-gray-500">Tickets Available: {event.total_tickets}</p>
      </div>
    </div>
  );
};

export default EventModal;
