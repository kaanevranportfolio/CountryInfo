import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.name.common}`} className="country-card">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
      <div className="country-info">
        <h3>{country.name.common}</h3>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      </div>
    </Link>
  );
};

export default CountryCard;