// src/Days.js
import React from 'react';
import { IoEllipse, IoCheckmarkCircle, IoFlame, IoEllipseOutline, IoSnowSharp } from 'react-icons/io5';
import './Days.css';

const Days = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const currentDayIndex = new Date().getDay(); // Get the current day index

  return (
    <div className="days-container">
      {days.map((day, index) => (
        <div key={index} className={`day ${index === currentDayIndex ? 'current' : ''}`}>
          {index === currentDayIndex ? (
            <IoEllipse className="day-icon focused" />
          ) : (
            <IoCheckmarkCircle className="day-icon completed" />
          )}
          <span className={`day-name ${index === currentDayIndex ? 'current' : ''}`}>{day}</span>
        </div>
      ))}
    </div>
  );
};

export default Days;