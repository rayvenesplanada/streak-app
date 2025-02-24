// src/Days.js
import React from 'react';
import { IoEllipseOutline, IoCheckmarkCircle, IoFlame, IoSnowSharp } from 'react-icons/io5';
import './Days.css';
import { useDaysData } from '../hooks/useDaysData';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { hotStreakMotion, daysMotion } from './animations';

const Days = () => {
  const { streakData, error } = useDaysData();

  if (error) {
    return <div> <h1 style={{ color: '#8B0000' }}> There was an error fetching the streak data: {error}</h1></div>;
  }

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

  const daysOfWeek = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
  };

  const currentDayIndex = new Date().getDay();

  // Determine the starting day based on the last entry in streakData
  const lastDay = days[days.length - 1];
  const startDayIndex = lastDay ? new Date(lastDay.date).getDay() : 0;
  let hotStreakDays = [];

  // Reorder daysOfWeek to start with the startDayIndex
  const reorderedDaysOfWeek = [
    ...Object.entries(daysOfWeek).slice(startDayIndex),
    ...Object.entries(daysOfWeek).slice(0, startDayIndex),
  ];

  // Override streak icons if streak is hot (3 or more days in a row without AT_RISK or INCOMPLETE)
  const overrideHotStreak = (days) => {
    let count = 0;
    let today = new Date();

    for (let i = 0; i < days.length; i++) {
      let dayIndex = new Date(days[i].date).getDay();
      if (new Date(days[i].date) > today) {
        continue;
      }

      if (days[i] && (days[i].state === 'COMPLETED' || days[i].state === 'SAVED')) {
        count++;
        hotStreakDays.push(dayIndex);
      } else {
        break;
      }
    }

    if (count < 3) {
      hotStreakDays = [];
    }
  }

  const getIconForDay = (isCurrentDay, day) => {
    const currentClass = isCurrentDay ? 'current' : '';
    const iconClass = `day-icon ${currentClass}`;

    if (hotStreakDays.includes(new Date(day.date).getDay())) {
      return <motion.div {...hotStreakMotion}>
        <IoFlame className={`${iconClass} streaked`} />
      </motion.div>
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

  let delay = 0;
  return (
    <>
      <h1>Your streak is {total} days</h1>
      <div className="days-container">
        {overrideHotStreak(days)}
        {reorderedDaysOfWeek.map(([dayIndex, dayName], index) => {
          const day = days.find(day => {
            const date = new Date(day.date);
            return date.getDay() === parseInt(dayIndex, 10);
          });

          const formattedDate = day ? moment(day.date).format('MMM DD, YYYY') : '';

          return (
            <motion.div
              key={index}
              className={`day ${parseInt(dayIndex, 10) === currentDayIndex ? 'current' : ''}`}
              data-tooltip-content={formattedDate}
              data-tooltip-id={`tooltip-${index}`}
              {...daysMotion(delay += 0.1)}
            >
              {getIconForDay(parseInt(dayIndex, 10) === currentDayIndex, day)}
              <span className={`day-name ${parseInt(dayIndex, 10) === currentDayIndex ? 'current' : ''}`}>{dayName}</span>
              <Tooltip id={`tooltip-${index}`} opacity={0.8}
                style={{ backgroundColor: '#7D5FFF', color: '#FFFFFF', borderRadius: '20px' }}
                delayShow={200} />
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default Days;