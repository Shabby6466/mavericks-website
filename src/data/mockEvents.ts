import { Event } from '../types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year. Learn from industry experts, network with peers, and discover the latest innovations in technology.',
    startDate: '2025-06-15T09:00:00.000Z', endDate: '2025-06-17T17:00:00.000Z',
    location: 'San Francisco Convention Center',
    isVirtual: false,
    capacity: 1000,
    attendees: 750,
    status: 'upcoming',
    category: 'conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    attendeeAvatars: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/76.jpg',
    ]
  },
  {
    id: '2',
    title: 'Web Development Workshop',
    description: 'A hands-on workshop covering the latest web development techniques and best practices. Perfect for beginners and intermediate developers looking to level up their skills.',
    startDate: '2025-05-10T10:00:00.000Z',
    endDate: '2025-05-10T16:00:00.000Z',
    location: 'Online via Zoom',
    isVirtual: true,
    capacity: 50,
    attendees: 42,
    status: 'upcoming',
    category: 'workshop',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    attendeeAvatars: [
      'https://randomuser.me/api/portraits/women/65.jpg',
      'https://randomuser.me/api/portraits/men/22.jpg',
      'https://randomuser.me/api/portraits/women/17.jpg',
    ]
  },
  {
    id: '3',
    title: 'AI in Business Webinar',
    description: 'Explore how artificial intelligence is transforming business operations and customer experiences. Learn practical applications and implementation strategies.',
    startDate: '2025-04-20T14:00:00.000Z',
    endDate: '2025-04-20T15:30:00.000Z',
    location: 'Online via Microsoft Teams',
    isVirtual: true,
    capacity: 200,
    attendees: 187,
    status: 'in-progress',
    category: 'webinar',
    image: 'https://images.unsplash.com/photo-1558137623-ce933996c730?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    attendeeAvatars: [
      'https://randomuser.me/api/portraits/men/55.jpg',
      'https://randomuser.me/api/portraits/women/33.jpg',
      'https://randomuser.me/api/portraits/men/41.jpg',
    ]
  },
  {
    id: '4',
    title: 'Local Developer Meetup',
    description: 'Connect with fellow developers in your area. Share knowledge, discuss challenges, and explore collaboration opportunities in a casual setting.',
    startDate: '2025-05-05T18:00:00.000Z',
    endDate: '2025-05-05T20:00:00.000Z',
    location: 'TechHub Coworking Space',
    isVirtual: false,
    capacity: 30,
    attendees: 22,
    status: 'upcoming',
    category: 'meetup',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    attendeeAvatars: [
      'https://randomuser.me/api/portraits/women/12.jpg',
      'https://randomuser.me/api/portraits/men/36.jpg',
      'https://randomuser.me/api/portraits/women/22.jpg',
    ]
  },
  {
    id: '5',
    title: 'Product Management Fundamentals',
    description: 'Learn the core principles of effective product management. This workshop covers user research, roadmap planning, feature prioritization, and stakeholder management.',
    startDate: '2025-03-15T09:00:00.000Z',
    endDate: '2025-03-15T17:00:00.000Z',
    location: 'Innovation Center',
    isVirtual: false,
    capacity: 40,
    attendees: 40,
    status: 'completed',
    category: 'workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    attendeeAvatars: [
      'https://randomuser.me/api/portraits/men/67.jpg',
      'https://randomuser.me/api/portraits/women/78.jpg',
      'https://randomuser.me/api/portraits/men/15.jpg',
    ]
  },
  {
    id: '6',
    title: 'Cybersecurity Best Practices',
    description: 'Stay ahead of cyber threats with this comprehensive overview of security best practices. Ideal for IT professionals and security enthusiasts.',
    startDate: '2025-06-05T13:00:00.000Z',
    endDate: '2025-06-05T16:00:00.000Z',
    location: 'Virtual Conference Room',
    isVirtual: true,
    capacity: 100,
    attendees: 68,
    status: 'upcoming',
    category: 'webinar',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    attendeeAvatars: [
      'https://randomuser.me/api/portraits/women/55.jpg',
      'https://randomuser.me/api/portraits/men/89.jpg',
      'https://randomuser.me/api/portraits/women/41.jpg',
    ]
  }
];