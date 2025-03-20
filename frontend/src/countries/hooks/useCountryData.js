import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountryData = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [countries, isLoading, error];
};

export default useCountryData;