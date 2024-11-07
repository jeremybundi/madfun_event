// pages/event/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;  // Get the event id from the URL
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;  // If id is not available, don't fetch
      try {
        const response = await axios.get(`http://localhost:8000/event/get/${id}`);
        if (response.data && response.data.status === 'success') {
          setEvent(response.data.data);
        }
      } catch (err) {
        setError('Error fetching event details');
        console.error('Error fetching event details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>{error}</div>;

  if (!event) return <div>Event not found</div>;

  return (
    <div className="px-8 py-4">
      <h2 className="text-2xl font-semibold mb-4">{event.name}</h2>
      <p>{event.description}</p>
      <p className="mt-4"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Total Tickets:</strong> {event.total_tickets}</p>
      
    </div>
  );
}
