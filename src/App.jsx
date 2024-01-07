

/*
# Word Gallery
- summary: "Team Treehouse Project: Unit 7",
- filename: "App.jsx",
- author: {
   - name: "Joel Cruz",
   - email: "jcruz@axaeon.com", }
- project: {
   - name: "Word Gallery",
   - tier: "practice",
   - type: "unit",
   - id: "7t",
   - description: "Project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse.", }
- org: {
   - name: "Team Treehouse",
   - description: "Online code academy", }
--------------------------------------------------------------------------------------------------*/

/*
## App.jsx (/)
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
- Flag for tracking query-parameter in most recently requested URL
- Implemented as a custom-import global-variable to avoid UI re-rendering
- Ensures that displayed response matches current URL
--------------------------------------------------------------------------------------------------*/
import { getCurrentTerm } from './components/global.js';

// Component Imports
import Home from './components/Home.jsx';
import PhotoList from './components/PhotoList.jsx';
import Search from './components/Search';
import Nav from './components/Nav.jsx';
import NotFound from './components/NotFound.jsx';

// Globals
const initialTerms = ['cliffside', 'sailboat', 'excavator'];
const testing = false;

/**
 * ## App() - Main function
 * @returns {React.ReactNode} JSX structure for application UI
 */
function App() {

  // General States
  const [query, setQuery] = useState(null);
  // const [fetching, setFetching] = useState(true);
  const [pause, setPause] = useState(false);

  const [imgData, setImgData] = useState({});

  // [ ] [TODO-7t]
  const [loading, setLoading] = useState(true);
  const [ini, setIni] = useState(false);

  /* 
  Fetching
  - Fetch data once, when app loads, to display default results
  - Re-fetch when `query` changes > Triggers re-render
  ------------------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (query) fetchData(query);
  }, [query]);

  /**
   * ## fetchData(newQuery)
   * @param {string} newQuery - query-term
   */
  function fetchData(newQuery) {

    // Sync-Test Code-Block
    let pauseTime = 0;
    if (pause) setPause(false); // Toggle delay
    else setPause(true);

    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${newQuery}&per_page=6&format=json&nojsoncallback=1&safe_search=1`;

    // Sync-Test Code-Block
    if (testing) pauseTime = 3000;
    const delay = pause ? pauseTime : 0;

    setTimeout(() => { // [SYNC-TEST]
      console.log(pause, delay); // [SYNC-TEST]
      axios.get(flickrUrl)
        .then(res => {
          // (!!!) Prevents update when old requests arrive *after* most recent request
          if(getCurrentTerm() === newQuery) {
            // If recieve no results, set imgData key to "error-message"
            if(res.data.photos.photo.length === 0) setImgData({'errorNoResults': []});
            // If recieve valid results, set imgData
            else setImgData({[newQuery]: res.data.photos.photo });
          }
        })
        .catch(err => console.log('Error fetching/parsing data:', err))
    }, delay); // [SYNC-TEST]
  }

  // // [TEST-POINT] - Keep for future testing
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
        <Route path='/' element={<Home />} />

        {/* [TEST-POINT] */}
        {/* <Route path="/test" element={test(<Home />)} /> */}

        {(!ini)
          ? <>
            {/* DEFAULT ROUTES */}
            {/* {defaultRoutes} */}

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
          </>
          : <Route path='*' element={<Navigate to='/' />} />
        }

        <Route path='*' element={<NotFound />} />
      </Routes>

      <p>Powered by Flickr</p>
    </>
  )
}

export default App
