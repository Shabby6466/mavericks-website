import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types/event';

interface EventListProps {
  events: Event[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  isLoading,
  viewMode,
  onEdit,
  onDelete,
}) => {
  // Generate skeleton items for loading state
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  if (isLoading) {
    return (
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {skeletonItems.map((index) => (
          <div 
            key={index}
            className="bg-dark-800 rounded-lg border border-gray-800 p-6 animate-pulse"
          >
            <div className="h-6 bg-dark-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-dark-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-dark-700 rounded w-1/3 mb-4"></div>
            <div className="h-20 bg-dark-700 rounded mb-4"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-dark-700 rounded w-1/4"></div>
              <div className="h-8 bg-dark-700 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-dark-800 rounded-lg border border-gray-800 p-8 text-center">
        <h3 className="text-xl font-medium text-white mb-2">No events found</h3>
        <p className="text-gray-400">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          viewMode={viewMode}
          onEdit={() => onEdit(event)}
          onDelete={() => onDelete(event.id)}
        />
      ))}
    </div>
  );
};

export default EventList;