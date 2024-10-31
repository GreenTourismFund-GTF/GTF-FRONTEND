import { Calendar } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participants: number;
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Calendar className="h-5 w-5 text-green-500" />
      Upcoming Events
    </h3>
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border-l-2 border-green-500 pl-4">
          <h4 className="font-medium">{event.title}</h4>
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()} • {event.location}
          </p>
          <p className="text-sm text-gray-600 mt-1">{event.participants.toLocaleString()} participants</p>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingEvents;
