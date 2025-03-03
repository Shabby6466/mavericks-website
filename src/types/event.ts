export type EventStatus = 'upcoming' | 'in-progress' | 'completed';
export type EventCategory = 'conference' | 'workshop' | 'webinar' | 'meetup';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  capacity: number;
  attendees: number;
  status: EventStatus;
  category: EventCategory;
  image?: string;
  attendeeAvatars?: string[];
}