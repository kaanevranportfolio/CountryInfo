// src/countries/components/CountryList.js

import React from 'react';
import { useCountryContext } from '../CountryContext';
import CountryCard from './CountryCard';

const CountryList = () => {
  const { countries, isLoading, error } = useCountryContext();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="country-list">
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default CountryList;