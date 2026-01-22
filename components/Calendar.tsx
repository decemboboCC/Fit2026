
import React, { useState } from 'react';
import { UserRole, WorkoutData } from '../types';
import { USERS, MONTHS, CHINESE_HOLIDAYS_2026 } from '../constants';

interface CalendarProps {
  currentUser: UserRole;
  workoutData: WorkoutData;
  filter: UserRole | 'ALL';
  onToggleWorkout: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentUser, workoutData, filter, onToggleWorkout }) => {
  // Initialize to Jan 2026 as requested
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Monday as start of week
  const firstDayOfMonthRaw = new Date(year, month, 1).getDay();
  const firstDayOfMonth = firstDayOfMonthRaw === 0 ? 6 : firstDayOfMonthRaw - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Navigation constraints for 2026
  const canPrev = month > 0;
  const canNext = month < 11;

  const prevMonth = () => {
    if (canPrev) setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    if (canNext) setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDate = (day: number) => {
    const d = new Date(year, month, day);
    // Pad month and day with leading zeros for consistency with CHINESE_HOLIDAYS_2026
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayStr = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dayStr}`;
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-16"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDate(d);
    const dateObj = new Date(year, month, d);
    dateObj.setHours(0, 0, 0, 0);

    const isPastOrToday = dateObj <= today;
    const isHoliday = CHINESE_HOLIDAYS_2026.has(dateStr);
    // Saturday is 6, Sunday is 0
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const allUsersOnThisDay = workoutData[dateStr] || [];
    
    const visibleUsers = filter === 'ALL' 
      ? allUsersOnThisDay 
      : allUsersOnThisDay.filter(u => u === filter);

    days.push(
      <div 
        key={d} 
        onClick={() => onToggleWorkout(dateStr)}
        className="relative h-16 flex flex-col items-center justify-center cursor-pointer select-none"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {visibleUsers.map((role, index) => {
            const total = visibleUsers.length;
            let offsetClass = "";
            
            if (total === 2) {
              offsetClass = index === 0 ? "-translate-x-1.5" : "translate-x-1.5";
            } else if (total === 3) {
              if (index === 0) offsetClass = "-translate-x-2.5 -translate-y-1";
              if (index === 1) offsetClass = "translate-x-2.5 -translate-y-1";
              if (index === 2) offsetClass = "translate-y-2";
            }

            return (
              <div
                key={role}
                className={`
                  absolute w-9 h-9 rounded-full opacity-90 transition-all duration-300 transform
                  ${USERS[role].bgColor} ${offsetClass}
                  ${total > 1 ? 'ring-2 ring-white scale-90' : 'scale-100'}
                `}
              />
            );
          })}
        </div>

        <span className={`
          relative z-10 font-extrabold text-[15px] transition-colors duration-300
          ${visibleUsers.length > 0 ? 'text-white' : 
            (isHoliday || isWeekend) 
              ? (isPastOrToday ? 'text-red-500' : 'text-red-200') 
              : (isPastOrToday ? 'text-black' : 'text-slate-200')}
        `}>
          {d}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={prevMonth} 
          disabled={!canPrev}
          className={`transition-colors p-2 ${canPrev ? 'text-black hover:opacity-60' : 'text-slate-200 cursor-not-allowed'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-3xl font-black text-black tracking-tight">
          {MONTHS[month]} <span className="opacity-100">{year}</span>
        </h2>
        <button 
          onClick={nextMonth} 
          disabled={!canNext}
          className={`transition-colors p-2 ${canNext ? 'text-black hover:opacity-60' : 'text-slate-200 cursor-not-allowed'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
          <div key={`${day}-${idx}`} className="text-center text-[13px] font-black text-black">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {days}
      </div>
    </div>
  );
};

export default Calendar;
