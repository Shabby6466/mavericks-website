import React, { useState, useEffect } from 'react';
import { Grid, List, Plus, Search, Filter, Calendar, X } from 'lucide-react';
import EventList from './EventList';
import EventFilters from './EventFilters';
import Button from '../common/Button';
import Input from '../common/Input';
import EventForm from './EventForm';
import { Event, EventStatus, EventCategory } from '../../types/event';
import { mockEvents } from '../../data/mockEvents';

const EventDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // Filters
  const [dateRange, setDateRange] = useState<{start: Date | null, end: Date | null}>({
    start: null,
    end: null
  });
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'all'>('all');

  // Load events
  useEffect(() => {
    // Simulate API call
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(mockEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply filters
  useEffect(() => {
    let result = [...events];
    
    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    // Apply date range filter
    if (dateRange.start) {
      result = result.filter(event => new Date(event.startDate) >= dateRange.start!);
    }
    if (dateRange.end) {
      result = result.filter(event => new Date(event.startDate) <= dateRange.end!);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(event => event.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(event => event.category === categoryFilter);
    }
    
    setFilteredEvents(result);
  }, [events, debouncedSearchQuery, dateRange, statusFilter, categoryFilter]);

  const handleCreateEvent = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prev => 
      prev.map(event => event.id === updatedEvent.id ? updatedEvent : event)
    );
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDateRange({ start: null, end: null });
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  const hasActiveFilters = 
    !!debouncedSearchQuery || 
    !!dateRange.start || 
    !!dateRange.end || 
    statusFilter !== 'all' || 
    categoryFilter !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary from-gradient-start via-gradient-mid to-gradient-end">
          Event Management
        </h1>
        <Button 
          variant="primary" 
          size="md" 
          leftIcon={<Plus size={18} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Event
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} className="text-gray-500" />}
            fullWidth
          />
        </div>
        <div className="flex gap-2">
          <EventFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            category={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              aria-label="Grid view"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-dark-700 border-accent-purple' : ''}
            >
              <Grid size={18} />
            </Button>
            <Button
              variant="outline"
              size="md"
              aria-label="List view"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-dark-700 border-accent-purple' : ''}
            >
              <List size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="font-medium">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {debouncedSearchQuery && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-700 border border-gray-700">
                Search: {debouncedSearchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 text-gray-500 hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {dateRange.start && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-700 border border-gray-700">
                <Calendar size={14} className="mr-1" />
                From: {dateRange.start.toLocaleDateString()}
                <button 
                  onClick={() => setDateRange(prev => ({ ...prev, start: null }))}
                  className="ml-1 text-gray-500 hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {dateRange.end && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-700 border border-gray-700">
                <Calendar size={14} className="mr-1" />
                To: {dateRange.end.toLocaleDateString()}
                <button 
                  onClick={() => setDateRange(prev => ({ ...prev, end: null }))}
                  className="ml-1 text-gray-500 hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-700 border border-gray-700">
                Status: {statusFilter}
                <button 
                  onClick={() => setStatusFilter('all')}
                  className="ml-1 text-gray-500 hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-700 border border-gray-700">
                Category: {categoryFilter}
                <button 
                  onClick={() => setCategoryFilter('all')}
                  className="ml-1 text-gray-500 hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            <button 
              onClick={clearFilters}
              className="text-accent-purple hover:text-accent-purple/80 text-xs font-medium hover:underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Showing <span className="font-medium text-white">{filteredEvents.length}</span> of <span className="font-medium text-white">{events.length}</span> events
        </span>
      </div>
      
      <EventList
        events={filteredEvents}
        isLoading={isLoading}
        viewMode={viewMode}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
      
      {isCreateModalOpen && (
        <EventForm
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateEvent}
        />
      )}
      
      {editingEvent && (
        <EventForm
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          onSubmit={handleUpdateEvent}
          event={editingEvent}
        />
      )}
    </div>
  );
};

export default EventDashboard;