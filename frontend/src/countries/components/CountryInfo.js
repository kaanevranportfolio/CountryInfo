import React from 'react';

const CountryInfo = ({ country }) => {
  return (
    <div className="country-info">
      <h2>{country.name.common}</h2>
      <p>Native Name: {Object.values(country.name.nativeName)[0].common}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Sub Region: {country.subregion}</p>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Top Level Domain: {country.tld[0]}</p>
      <p>Currencies: {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <p>Border Countries: {country.borders ? country.borders.join(', ') : 'None'}</p>
    </div>
  );
};

export default CountryInfo;