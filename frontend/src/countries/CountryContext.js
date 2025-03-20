import React, { createContext, useContext, useState } from 'react';
import useCountryData from './hooks/useCountryData';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, isLoading, error] = useCountryData();
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <CountryContext.Provider value={{ countries, isLoading, error, selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => useContext(CountryContext);