import { useEffect, useState } from 'react';
import axios from 'axios';

const useDaysData = () => {
  const [streakData, setStreakData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

        // Get case from URL for testing purposes
        const pathSegments = window.location.pathname.split('/');
        const streakNumber = pathSegments[1] || '1';

        await new Promise(resolve => setTimeout(resolve, 250)); // Delay for testing
        const url = `${apiUrl}/streaks/${streakNumber}`;
        const response = await axios.get(url);

        setStreakData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  return { streakData, error };
};

export { useDaysData }; 