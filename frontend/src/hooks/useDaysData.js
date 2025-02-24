import { useEffect, useState } from 'react';

const useDaysData = () => {
  const [streakData, setStreakData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        // const streakNumber = process.env.REACT_APP_STREAK_NUMBER || '1'; // Use 'default' if the env variable is not set
        await new Promise(resolve => setTimeout(resolve, 250));
        const url = `${apiUrl}/streaks/1`;
        const response = await fetch(url);
        const data = await response.json();

        setStreakData(data);
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
    };

    fetchData();
  }, []);

  return streakData;
};

export { useDaysData }; 