// src/countries/components/CountryDetails.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCountryContext } from '../CountryContext';
import CountryFlag from './CountryFlag';
import CountryInfo from './CountryInfo';

const CountryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { countries, setSelectedCountry } = useCountryContext();
  const country = countries.find(country => country.name.common === name);

  if (!country) return <div>Country not found</div>;

  setSelectedCountry(country);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="country-details">
      <button onClick={handleGoBack} className="go-back-button">Go Back</button>
      <CountryFlag flag={country.flags.svg} />
      <CountryInfo country={country} />
    </div>
  );
};

export default CountryDetails;