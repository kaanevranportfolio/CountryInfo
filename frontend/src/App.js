import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CountryCards from './components/CountryCards';
import CountryDetail from './components/CountryDetail';
import { Spinner } from 'react-bootstrap';

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

  const clearError = () => {
    setError(null);
  };

  const handleNameSearch = async () => {
    clearError();
    try {
      const response = await axios.get(`http://localhost:3001/countries/name/${nameSearchTerm}`);
      setCountries(response.data);
      setNameSearchTerm(''); // Reset the name search term
    } catch (error) {
      console.error(`Error searching for name ${nameSearchTerm}:`, error);
      setError("Country not found");
    }
  };

  const handleRegionSearch = async () => {
    clearError();
    try {
      const response = await axios.get(`http://localhost:3001/countries/region/${regionSearchTerm}`);
      setCountries(response.data);
      setRegionSearchTerm(''); // Reset the region search term
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
                  <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
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