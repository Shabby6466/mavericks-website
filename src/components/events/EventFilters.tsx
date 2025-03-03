import React, { useState } from 'react';
import { Filter, Calendar, Tag, Activity } from 'lucide-react';
import Button from '../common/Button';
import DatePicker from '../common/DatePicker';
import { EventStatus, EventCategory } from '../../types/event';

interface EventFiltersProps {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  onDateRangeChange: (range: { start: Date | null; end: Date | null }) => void;
  status: EventStatus | 'all';
  onStatusChange: (status: EventStatus | 'all') => void;
  category: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  dateRange,
  onDateRangeChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartDateChange = (date: Date) => {
    onDateRangeChange({ ...dateRange, start: date });
  };

  const handleEndDateChange = (date: Date) => {
    onDateRangeChange({ ...dateRange, end: date });
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="md"
        leftIcon={<Filter size={18} />}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Filters
      </Button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-72 bg-dark-800 rounded-lg shadow-lg z-10 border border-gray-700"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4">
            <h3 className="text-lg font-medium text-white mb-4">Filters</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <h4 className="text-sm font-medium text-gray-300">Date Range</h4>
                </div>
                <div className="space-y-2">
                  <DatePicker
                    label="Start Date"
                    selectedDate={dateRange.start}
                    onChange={handleStartDateChange}
                  />
                  <DatePicker
                    label="End Date"
                    selectedDate={dateRange.end}
                    onChange={handleEndDateChange}
                    minDate={dateRange.start || undefined}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Activity size={16} className="mr-2 text-gray-500" />
                  <h4 className="text-sm font-medium text-gray-300">Status</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      status === 'all' 
                        ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onStatusChange('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      status === 'upcoming' 
                        ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onStatusChange('upcoming')}
                  >
                    Upcoming
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      status === 'in-progress' 
                        ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onStatusChange('in-progress')}
                  >
                    In Progress
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      status === 'completed' 
                        ? 'bg-gray-700/50 text-gray-400 border border-gray-600' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onStatusChange('completed')}
                  >
                    Completed
                  </button>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Tag size={16} className="mr-2 text-gray-500" />
                  <h4 className="text-sm font-medium text-gray-300">Category</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      category === 'all' 
                        ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onCategoryChange('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      category === 'conference' 
                        ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onCategoryChange('conference')}
                  >
                    Conference
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      category === 'workshop' 
                        ? 'bg-yellow-600/20 text-yellow-500 border border-yellow-600/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onCategoryChange('workshop')}
                  >
                    Workshop
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      category === 'webinar' 
                        ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onCategoryChange('webinar')}
                  >
                    Webinar
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      category === 'meetup' 
                        ? 'bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/30' 
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                    onClick={() => onCategoryChange('meetup')}
                  >
                    Meetup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
