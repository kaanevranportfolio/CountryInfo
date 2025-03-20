import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError(error.message);
      }
    };
    fetchCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const filteredCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === '' || country.region === selectedRegion)
  );

  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uniqueRegions = [...new Set(allCountries.map(country => country.region))];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Country List</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <Routes>
          <Route path="/" element={
            <div>
              <div className="country-list">
                {currentCountries.map((country, index) => (
                  <Link key={index} to={`/country/${country.cca3}`} className="country-link">
                    <div role="article" aria-label={`Country: ${country.name.common}`} className="country">
                      <h2>{country.name.common}</h2>
                      <p>Population: {country.population}</p>
                      <p>Region: {country.region}</p>
                      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
                      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: Math.ceil(filteredCountries.length / countriesPerPage) }).map((_, index) => (
                  <button key={index} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          } />
          <Route path="/country/:cca3" element={<CountryDetail allCountries={allCountries} />} />
        </Routes>
      </div>
    </Router>
  );
}

function CountryDetail({ allCountries }) {
  const { cca3 } = useParams();
  const country = allCountries.find(country => country.cca3 === cca3);

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className="country-detail">
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Currencies: {Object.keys(country.currencies).map(code => country.currencies[code].name).join(', ')}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default App;