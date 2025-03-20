import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CountryCards from './components/CountryCards';
import CountryDetail from './components/CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [regionSearchTerm, setRegionSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to fetch country data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNameSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/name/${nameSearchTerm}`);
      setCountries(response.data);
    } catch (error) {
      console.error(`Error searching for name ${nameSearchTerm}:`, error);
      setError("Country not found");
    }
  };

  const handleRegionSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/region/${regionSearchTerm}`);
      setCountries(response.data);
    } catch (error) {
      console.error(`Error searching for region ${regionSearchTerm}:`, error);
      setError("Region not found or no countries in the region");
    }
  };

  return (
    <Router>
      <div>
        <h1>Country Search</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  nameSearchTerm={nameSearchTerm}
                  setNameSearchTerm={setNameSearchTerm}
                  handleNameSearch={handleNameSearch}
                  regionSearchTerm={regionSearchTerm}
                  setRegionSearchTerm={setRegionSearchTerm}
                  handleRegionSearch={handleRegionSearch}
                />
                {isLoading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error}</div>
                ) : (
                  <CountryCards countries={countries} />
                )}
              </>
            }
          />
          <Route path="/country/:name" element={<CountryDetail countries={countries} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;