import React, { useState, useEffect } from 'react';
import { Save, X, Image, MapPin, Calendar, Clock, Users, Info, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import DatePicker from '../common/DatePicker';
import { Event, EventStatus, EventCategory } from '../../types/event';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Event) => void;
  event?: Event;
}

type FormStep = 'basic' | 'datetime' | 'location' | 'capacity' | 'media' | 'preview';

const EventForm: React.FC<EventFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  event,
}) => {
  const isEditMode = !!event;
  
  // Form state
  const [formData, setFormData] = useState<Partial<Event>>({
    id: event?.id || crypto.randomUUID(),
    title: event?.title || '',
    description: event?.description || '',
    category: event?.category || 'conference',
    startDate: event?.startDate || new Date().toISOString(),
    endDate: event?.endDate || new Date(Date.now() + 3600000).toISOString(),
    location: event?.location || '',
    isVirtual: event?.isVirtual || false,
    capacity: event?.capacity || 100,
    attendees: event?.attendees || 0,
    status: event?.status || 'upcoming',
    image: event?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    attendeeAvatars: event?.attendeeAvatars || [],
  });
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Multi-step form
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const steps: FormStep[] = ['basic', 'datetime', 'location', 'capacity', 'media', 'preview'];
  
  // Autosave
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Calculate form completion percentage
  const calculateCompletion = () => {
    const requiredFields = ['title', 'description', 'startDate', 'endDate', 'location', 'capacity'];
    const completedFields = requiredFields.filter(field => 
      formData[field as keyof typeof formData] && 
      !errors[field]
    );
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    // Handle number inputs
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle date changes
  const handleDateChange = (field: 'startDate' | 'endDate', date: Date) => {
    setFormData(prev => ({ ...prev, [field]: date.toISOString() }));
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Title validation
    if (!formData.title) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    // Description validation
    if (!formData.description) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    
    // Date validation
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const startDate = new Date(formData.startDate);
      const now = new Date();
      
      if (startDate < now && !isEditMode) {
        newErrors.startDate = 'Start date must be in the future';
      }
      
      if (formData.endDate) {
        const endDate = new Date(formData.endDate);
        if (endDate < startDate) {
          newErrors.endDate = 'End date must be after start date';
        }
      }
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    // Location validation
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    // Capacity validation
    if (formData.capacity === undefined) {
      newErrors.capacity = 'Capacity is required';
    } else if (formData.capacity <= 0) {
      newErrors.capacity = 'Capacity must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData as Event);
    } else {
      // Find the first step with an error and navigate to it
      for (const step of steps) {
        if (step === 'basic' && (errors.title || errors.description || errors.category)) {
          setCurrentStep('basic');
          break;
        } else if (step === 'datetime' && (errors.startDate || errors.endDate)) {
          setCurrentStep('datetime');
          break;
        } else if (step === 'location' && errors.location) {
          setCurrentStep('location');
          break;
        } else if (step === 'capacity' && errors.capacity) {
          setCurrentStep('capacity');
          break;
        }
      }
    }
  };
  
  // Autosave effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title && formData.description) {
        setIsSaving(true);
        // Simulate saving to server
        setTimeout(() => {
          setLastSaved(new Date());
          setIsSaving(false);
        }, 500);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [formData]);
  
  // Navigation between steps
  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  
  const goToPrevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };
  
  // Render form content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="space-y-4">
            <Input
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Enter event title"
              fullWidth
              leftIcon={<Info size={18} className="text-gray-500" />}
              required
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
                className={`
                  block w-full rounded-md shadow-sm p-4 h-32
                  bg-dark-700 text-white
                  border ${errors.description ? 'border-red-500' : 'border-gray-700'} 
                  focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                `}
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`
                  block w-full rounded-md shadow-sm px-4 py-2
                  bg-dark-700 text-white
                  border border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                `}
              >
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="webinar">Webinar</option>
                <option value="meetup">Meetup</option>
              </select>
            </div>
          </div>
        );
        
      case 'datetime':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePicker
                label="Start Date"
                selectedDate={formData.startDate ? new Date(formData.startDate) : null}
                onChange={(date) => handleDateChange('startDate', date)}
                error={errors.startDate}
                minDate={isEditMode ? undefined : new Date()}
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Start Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startDate ? new Date(formData.startDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }).slice(0, 5) : ''}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const date = new Date(formData.startDate || new Date());
                      date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                      handleDateChange('startDate', date);
                    }}
                    className={`
                      block w-full rounded-md shadow-sm pl-10 pr-4 py-2
                      bg-dark-700 text-white
                      border ${errors.startDate ? 'border-red-500' : 'border-gray-700'} 
                      focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                    `}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePicker
                label="End Date"
                selectedDate={formData.endDate ? new Date(formData.endDate) : null}
                onChange={(date) => handleDateChange('endDate', date)}
                error={errors.endDate}
                minDate={formData.startDate ? new Date(formData.startDate) : new Date()}
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  End Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endDate ? new Date(formData.endDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }).slice(0, 5) : ''}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const date = new Date(formData.endDate || new Date());
                      date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                      handleDateChange('endDate', date);
                    }}
                    className={`
                      block w-full rounded-md shadow-sm pl-10 pr-4 py-2
                      bg-dark-700 text-white
                      border ${errors.endDate ? 'border-red-500' : 'border-gray-700'} 
                      focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                    `}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Timezone
              </label>
              <select
                name="timezone"
                className={`
                  block w-full rounded-md shadow-sm px-4 py-2
                  bg-dark-700 text-white
                  border border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                `}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </div>
        );
        
      case 'location':
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isVirtual"
                name="isVirtual"
                checked={formData.isVirtual}
                onChange={(e) => setFormData(prev => ({ ...prev, isVirtual: e.target.checked }))}
                className="h-4 w-4 text-accent-purple focus:ring-accent-purple border-gray-700 rounded"
              />
              <label htmlFor="isVirtual" className="ml-2 block text-sm text-gray-300">
                This is a virtual event
              </label>
            </div>
            
            <Input
              label={formData.isVirtual ? "Meeting Link" : "Location"}
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              placeholder={formData.isVirtual ? "Enter meeting URL" : "Enter physical location"}
              fullWidth
              leftIcon={<MapPin size={18} className="text-gray-500" />}
              required
            />
            
            {!formData.isVirtual && (
              <div className="mt-4">
                <div className="bg-dark-700 rounded-lg p-4 text-sm text-gray-400 border border-gray-700">
                  <p className="font-medium mb-2">Location Tips:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Include the full address with city and postal code</li>
                    <li>Add building name or room number if applicable</li>
                    <li>Consider adding parking information</li>
                  </ul>
                </div>
              </div>
            )}
            
            {formData.isVirtual && (
              <div className="mt-4">
                <div className="bg-dark-700 rounded-lg p-4 text-sm text-gray-400 border border-gray-700">
                  <p className="font-medium mb-2">Virtual Event Tips:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use a secure meeting platform</li>
                    <li>Test your link before sharing</li>
                    <li>Consider adding password information</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'capacity':
        return (
          <div className="space-y-4">
            <Input
              label="Maximum Capacity"
              name="capacity"
              type="number"
              value={formData.capacity?.toString() || ''}
              onChange={handleChange}
              error={errors.capacity}
              placeholder="Enter maximum number of attendees"
              fullWidth
              leftIcon={<Users size={18} className="text-gray-500" />}
              min="1"
              required
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Registration Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  className={`
                    block w-full rounded-md shadow-sm pl-10 pr-4 py-2
                    bg-dark-700 text-white
                    border border-gray-700
                    focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                  `}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Registration Type
              </label>
              <select
                className={`
                  block w-full rounded-md shadow-sm px-4 py-2
                  bg-dark-700 text-white
                  border border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                `}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="invitation">Invitation Only</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Event Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`
                  block w-full rounded-md shadow-sm px-4 py-2
                  bg-dark-700 text-white
                  border border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
                `}
              >
                <option value="upcoming">Upcoming</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        );
        
      case 'media':
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Event Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md bg-dark-700">
                <div className="space-y-1 text-center">
                  <Image size={48} className="mx-auto text-gray-500" />
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-dark-800 rounded-md font-medium text-accent-purple hover:text-accent-purple/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent-purple"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              </div>
            </div>
            
            <Input
              label="Image URL (alternative to upload)"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              placeholder="Enter image URL"
              fullWidth
            />
            
            {formData.image && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-300 mb-2">Preview:</p>
                <div className="relative h-48 overflow-hidden rounded-lg border border-gray-700">
                  <img 
                    src={formData.image} 
                    alt="Event preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
        
      case 'preview':
        return (
          <div className="space-y-4">
            <div className="bg-dark-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">
                {formData.title || 'Event Title'}
              </h3>
              
              {formData.image && (
                <div className="relative h-48 overflow-hidden rounded-lg mb-4 border border-gray-700">
                  <img 
                    src={formData.image} 
                    alt="Event preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  formData.status === 'upcoming' ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' :
                  formData.status === 'in-progress' ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30' :
                  'bg-gray-700/50 text-gray-400 border border-gray-600'
                }`}>
                  {formData.status === 'upcoming' ? 'Upcoming' :
                   formData.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </span>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  formData.category === 'conference' ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' :
                  formData.category === 'workshop' ? 'bg-yellow-600/20 text-yellow-500 border border-yellow-600/30' :
                  formData.category === 'webinar' ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' :
                  'bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/30'
                }`}>
                  {formData.category?.charAt(0).toUpperCase() + formData.category?.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    {formData.startDate ? new Date(formData.startDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }) : 'Start Date'}
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock size={16} className="mr-2" />
                  <span>
                    {formData.startDate ? new Date(formData.startDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }) : 'Start Time'} - {
                      formData.endDate ? new Date(formData.endDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }) : 'End Time'
                    }
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>{formData.location || 'Location'}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Users size={16} className="mr-2" />
                  <span>{formData.attendees || 0} / {formData.capacity || 100} attendees</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-lg font-medium text-white mb-2">Description</h4>
                <p className="text-gray-400">
                  {formData.description || 'No description provided.'}
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Render form footer with navigation buttons
  const renderFooter = () => {
    const currentIndex = steps.indexOf(currentStep);
    const isFirstStep = currentIndex === 0;
    const isLastStep = currentIndex === steps.length - 1;
    
    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          {isSaving ? (
            <span className="flex items-center">
              <Save size={16} className="mr-1 animate-pulse" />
              Saving...
            </span>
          ) : lastSaved ? (
            <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
          ) : null}
        </div>
        
        <div className="flex gap-2">
          {!isFirstStep && (
            <Button
              variant="outline"
              size="md"
              leftIcon={<ChevronLeft size={16} />}
              onClick={goToPrevStep}
            >
              Previous
            </Button>
          )}
          
          {!isLastStep ? (
            <Button
              variant="primary"
              size="md"
              rightIcon={<ChevronRight size={16} />}
              onClick={goToNextStep}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              leftIcon={<Save size={16} />}
              onClick={handleSubmit}
            >
              {isEditMode ? 'Update Event' : 'Create Event'}
            </Button>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Event' : 'Create New Event'}
      size="xl"
      footer={renderFooter()}
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">
            {currentStep.charAt(0).toUpperCase() + currentStep.slice(1)} Details
          </h3>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-300 mr-2">
              {calculateCompletion()}% Complete
            </span>
            <div className="w-24 h-2 bg-dark-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary from-gradient-start to-gradient-end"
                style={{ width: `${calculateCompletion()}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex border-b border-gray-700 mb-4">
          {steps.map((step, index) => (
            <button
              key={step}
              className={`
                px-4 py-2 text-sm font-medium border-b-2 -mb-px
                ${currentStep === step 
                  ? 'border-accent-purple text-accent-purple' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'}
              `}
              onClick={() => setCurrentStep(step)}
            >
              {index + 1}. {step.charAt(0).toUpperCase() + step.slice(1)}
            </button>
          ))}
        </div>
        
        {renderStepContent()}
      </div>
    </Modal>
  );
};

export default EventForm;