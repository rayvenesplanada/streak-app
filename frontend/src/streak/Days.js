// src/Days.js
import React from 'react';
import { IoEllipseOutline, IoCheckmarkCircle, IoFlame, IoSnowSharp } from 'react-icons/io5';
import './Days.css';
import { useDaysData } from '../hooks/useDaysData';
import { BeatLoader } from 'react-spinners';

const Days = () => {
  const streakData = useDaysData();

  // Handle the case where data is still loading
  if (!streakData) {
    return (
      <div>
        <h1>Getting current streak...</h1>
        <BeatLoader color="#6442EF" size={12} />
      </div>
    );
  }

  const days = streakData.days || [];
  const total = streakData.total || 0;

  if (days.length === 0) {
    return <div>No days data available</div>;
  }
  
  console.log(days);
  // Define days of the week using a plain object
  const daysOfWeek = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
  };

  const currentDayIndex = new Date().getDay(); // Get the current day index

  // Determine the starting day based on the last entry in streakData
  const lastDay = days[days.length - 1];
  const startDayIndex = lastDay ? new Date(lastDay.date).getDay() : 0;

  // Reorder daysOfWeek to start with the startDayIndex
  const reorderedDaysOfWeek = [
    ...Object.entries(daysOfWeek).slice(startDayIndex),
    ...Object.entries(daysOfWeek).slice(0, startDayIndex),
  ];

  const getIconForDay = (isCurrentDay, day, total) => {
    const currentClass = isCurrentDay ? 'current' : '';
    const iconClass = `day-icon ${currentClass}`;

    if (total > 7) {
      return <IoFlame className={`${iconClass} streaked`} />;
    }

    switch (day.state) {
      case 'COMPLETED':
      case 'SAVED':
        return <IoCheckmarkCircle className={`${iconClass} completed`} />;
      case 'AT_RISK':
        return <IoSnowSharp className={`${iconClass} at-risk`} />;
      case 'INCOMPLETE':
      default:
        return <IoEllipseOutline className={`${iconClass} incomplete`} />;
    }
  };

  return (
    <>
      <h1>Your streak is {total} days</h1>
      <div className="days-container">
        {reorderedDaysOfWeek.map(([dayIndex, dayName], index) => {
          const day = days.find(day => {
            const date = new Date(day.date);
            return date.getDay() === parseInt(dayIndex, 10);
          });

          return (
            <div key={index} className={`day ${parseInt(dayIndex, 10) === currentDayIndex ? 'current' : ''}`}>
              {getIconForDay(parseInt(dayIndex, 10) === currentDayIndex, day, total)}
              <span className={`day-name ${parseInt(dayIndex, 10) === currentDayIndex ? 'current' : ''}`}>{dayName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Days;