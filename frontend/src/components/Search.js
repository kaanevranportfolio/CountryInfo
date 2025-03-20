// src/components/Search.js

import React, { useState } from 'react';
import { useCountryContext } from '../countries/CountryContext';
import useCountryFilter from '../countries/hooks/useCountryFilter';

const Search = () => {
  const { countries, setSelectedCountry } = useCountryContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');

  const filteredCountries = useCountryFilter(countries, searchTerm, region);

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSelectedCountry(null);
  };

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    setSelectedCountry(null);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={region} onChange={handleRegionChange}>
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Search;