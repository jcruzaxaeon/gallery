

/*
# Word Gallery - App.jsx
- author: "Joel Cruz",
- email: "jcruz@axaeon.com",
- description: "Project 7: End-of-unit project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse (Code Academy).",
- codename: "7t",
--------------------------------------------------------------------------------------------------*/

// External Imports/Dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Custom Imports, Assignments
import './App.css';
import flickrKey from './config';

/*
### Global Query-Tracker
- Flag for tracking query-parameter from most recently requested URL
- Implemented as a custom-import global-variable to avoid UI re-rendering
- Ensures that displayed response matches current URL
--------------------------------------------------------------------------------------------------*/
import { getCurrentTerm } from './global.js';

// Component Imports
import PhotoList from './components/PhotoList.jsx';
import Search from './components/Search';
import Nav from './components/Nav.jsx';
import NotFound from './components/NotFound.jsx';

// Globals
const initialTerms = ['cliffside', 'sailboat', 'excavator'];
const testing = false; // [SYNC-TEST]: `true` activates a delay for every other API-request

// Build the 3 "Static" Routes
const defaultRoutes = initialTerms.map( (route, i) => {
  return <Route
    key={i}
    path={`default/${route}`}
    element={ <Navigate to={`search/${route}`} /> }
  />
});

/**
 * ## App() - Main
 * - Main application logic
 * - Routing
 * @returns {React.ReactNode} JSX structure for application UI
 */
function App() {

  // General States
  const [query, setQuery] = useState(null);
  const [pause, setPause] = useState(false);
  const [imgData, setImgData] = useState({});

  /* 
  Fetching
  ------------------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (query) fetchData(query);
  }, [query]);

  /**
   * ## fetchData(newQuery)
   * @param {string} newQuery - query-term used to search for photos on Flickr
   */
  function fetchData(newQuery) {

    // [SYNC-TEST] Code-Block
    let pauseTime = 0;
    if (pause) setPause(false); // Toggle delay
    else setPause(true);

    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${newQuery}&per_page=6&format=json&nojsoncallback=1&safe_search=1`;

    // [SYNC-TEST] Code-Block
    if (testing) pauseTime = 3000;
    const delay = pause ? pauseTime : 0;

    setTimeout(() => { // [SYNC-TEST]
     //  console.log(pause, delay); // [SYNC-TEST]
      axios.get(flickrUrl)
        .then(res => {
          // (!!!) Prevents update when old requests arrive *after* most recent request
          if (getCurrentTerm() === newQuery) {
            // If recieve no results, set imgData key to "error-message"
            if (res.data.photos.photo.length === 0) {
              setImgData({ 'errorNoResults': [] });
              return;
            }
            // If recieve valid results, set imgData
            setImgData({ [newQuery]: res.data.photos.photo });
          }
        })
        .catch(err => console.log('Error fetching/parsing data:', err))
    }, delay); // [SYNC-TEST]
  }

  // // [TEST-POINT] - Keep for future testing.  Tests logic just before calling component
  // function test(component) {
  //   console.log("Log values before render here:");
  //   return component;
  // }

  // JSX Structure Return
  //------------------------------------------------------------------------------------------------
  return (
    <>
      <h1>Word Gallery</h1>

      <Search setQuery={setQuery} />
      <Nav initialTerms={initialTerms} />

      <Routes location={location}>

        {/* HOME */}
        <Route
          path='/'
          element={ <Navigate to={`search/${initialTerms[0]}`} /> }
        />

        {/* [TEST-POINT] */}
        {/* <Route path="/test" element={test(<Home />)} /> */}

        {/* DEFAULT ROUTES */}
        {defaultRoutes}

        {/* SEARCH ROUTE */}
        <Route
          path='search/:urlQuery'
          element={
            <PhotoList
              imgData={imgData}
              fetchData={fetchData}
              setImgData={setImgData}
            />
          }
        />

      <Route path='*' element={<NotFound />} />
    </Routes >

      <p>Powered by Flickr</p>
    </>
  )
}

export default App
