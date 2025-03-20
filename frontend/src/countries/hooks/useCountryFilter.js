// src/countries/hooks/useCountryFilter.js

import { useMemo } from 'react';
import { sortCountries } from '../utils/sortCountries';

const useCountryFilter = (countries, searchTerm, region) => {
  return useMemo(() => {
    let filteredCountries = countries;

    if (searchTerm) {
      // Filter countries starting with the search term
      filteredCountries = filteredCountries.filter(country =>
        country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    if (region && region !== '') {
      // Filter countries by region
      filteredCountries = filteredCountries.filter(country => country.region === region);
    }

    return sortCountries(filteredCountries);
  }, [countries, searchTerm, region]);
};

export default useCountryFilter;