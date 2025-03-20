// src/App.js

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CountryProvider } from './countries/CountryContext';
import Header from './components/Header';
import Search from './components/Search';
import './styles/App.css';

// Lazy load components
const CountryList = lazy(() => import('./countries/components/CountryList'));
const CountryDetails = lazy(() => import('./countries/components/CountryDetails'));

function App() {
  return (
    <Router>
      <CountryProvider>
        <div className="app">
          <Header />
          <Search />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<CountryList />} />
              <Route path="/country/:name" element={<CountryDetails />} />
            </Routes>
          </Suspense>
        </div>
      </CountryProvider>
    </Router>
  );
}

export default App;