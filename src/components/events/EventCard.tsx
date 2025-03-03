import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, MoreVertical, Edit, Trash2, Share2 } from 'lucide-react';
import { Event } from '../../types/event';
import Button from '../common/Button';

interface EventCardProps {
  event: Event;
  viewMode: 'grid' | 'list';
  onEdit: () => void;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  viewMode,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30';
      case 'in-progress':
        return 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30';
      case 'completed':
        return 'bg-gray-700/50 text-gray-400 border border-gray-600';
      default:
        return 'bg-gray-700/50 text-gray-400 border border-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'conference':
        return 'bg-gradient-to-r from-accent-purple/10 to-accent-purple/20 text-accent-purple border border-accent-purple/30 shadow-neon';
      case 'workshop':
        return 'bg-gradient-to-r from-yellow-600/10 to-yellow-600/20 text-yellow-500 border border-yellow-600/30';
      case 'webinar':
        return 'bg-gradient-to-r from-accent-blue/10 to-accent-blue/20 text-accent-blue border border-accent-blue/30 shadow-neon-blue';
      case 'meetup':
        return 'bg-gradient-to-r from-accent-magenta/10 to-accent-magenta/20 text-accent-magenta border border-accent-magenta/30';
      default:
        return 'bg-gradient-to-r from-gray-700/30 to-gray-700/40 text-gray-400 border border-gray-600';
    }
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog or copy a link
    alert(`Share event: ${event.title}`);
  };

  return (
    <div 
      className={`
        bg-dark-800 rounded-lg border border-gray-800 overflow-hidden
        transition-all duration-200 hover:shadow-lg hover:border-gray-700
        ${viewMode === 'list' ? 'flex' : 'block'}
      `}
    >
      {viewMode === 'grid' && event.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
        </div>
      )}
      
      <div className={`p-6 ${viewMode === 'list' && event.image ? 'flex-1' : ''}`}>
        {viewMode === 'list' && (
          <div className="flex gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {event.title}
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 rounded-full hover:bg-dark-700"
              aria-label="More options"
            >
              <MoreVertical size={20} className="text-gray-400" />
            </button>
            
            {showActions && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-md shadow-lg z-10 border border-gray-700"
                onMouseLeave={() => setShowActions(false)}
              >
                <button
                  onClick={onEdit}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-dark-700"
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-dark-700"
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
                <button
                  onClick={onDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-dark-700"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock size={16} className="mr-2" />
            <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Users size={16} className="mr-2" />
            <span>{event.attendees} / {event.capacity} attendees</span>
          </div>
        </div>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {event.attendeeAvatars && event.attendeeAvatars.slice(0, 3).map((avatar, index) => (
              <img 
                key={index}
                src={avatar}
                alt="Attendee"
                className="w-8 h-8 rounded-full border-2 border-dark-800"
              />
            ))}
            {event.attendees > 3 && (
              <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-xs font-medium text-gray-400 border-2 border-dark-800">
                +{event.attendees - 3}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;