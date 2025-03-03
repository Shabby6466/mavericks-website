import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  label,
  error,
  disabled = false,
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Add days from previous month to fill the first week
    const daysFromPrevMonth = firstDay.getDay();
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    
    // Add days from next month to fill the last week
    const daysFromNextMonth = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(year, month + 1, i);
      days.push(date);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true;
    return false;
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="relative" ref={datePickerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          readOnly
          value={formatDate(selectedDate)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            block w-full rounded-md shadow-sm pl-10 pr-4 py-2
            bg-dark-700 text-white
            border ${error ? 'border-red-500' : 'border-gray-700'} 
            focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          `}
          placeholder="Select date"
          disabled={disabled}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar size={18} className="text-gray-500" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-dark-800 shadow-lg rounded-md border border-gray-700">
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-full hover:bg-dark-700"
              >
                <ChevronLeft size={20} className="text-gray-400" />
              </button>
              <div className="font-medium text-white">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-full hover:bg-dark-700"
              >
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-1">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => !isDateDisabled(date) && handleSelectDate(date)}
                  disabled={isDateDisabled(date)}
                  className={`
                    p-2 text-sm rounded-md flex items-center justify-center
                    ${isSelected(date) ? 'bg-gradient-primary from-gradient-start to-gradient-end text-white' : ''}
                    ${isToday(date) && !isSelected(date) ? 'border border-accent-purple' : ''}
                    ${!isCurrentMonth(date) ? 'text-gray-600' : 'text-gray-300'}
                    ${isDateDisabled(date) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-700'}
                  `}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;