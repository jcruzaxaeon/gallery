

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
import Loading from './components/Loading.jsx';

// Globals
const initialTerms = ['cliffside', 'sailboat', 'excavator'];
const testing = true; // [SYNC-TEST]: `true` activates a delay for every other API-request
let defaultRoutes = [];
let defaultDataBuilder = {};
let defaultDataReady = false;

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
  const [defaultData, setDefaultData] = useState({});
  const [defaultRoutesReady, setDefaultRoutesReady] = useState(false);
  const [renderRequest, setRenderRequest] = useState(0);


  /* 
  Fetching
  ------------------------------------------------------------------------------------------------*/

  // Fetch Data for Static-Routes
  useEffect(() => {
    initialTerms.forEach(term => {
      fetchData(term);
    });
  }, []);

  /* 
  ### Build Default Data and Routes
  - This useEffect():
    - Increases complexity
    - Decreases modularity
    - Implemented solely to meet project "requirement" to add 3 "static"-routes
  */
  useEffect(() => {

    // if (builder size = max) & (data not ready)
    // - Finalize defaultData object image data from all terms
    // - Set non-state data-ready flag = true
    if (Object.keys(defaultDataBuilder).length === initialTerms.length &&
      defaultDataReady === false) {
      setDefaultData(defaultDataBuilder);
      defaultDataReady = true;
      setRenderRequest(prev => prev + 1);
    }

    // if (data size = max)
    // - Build default routes
    if (Object.keys(defaultData).length === initialTerms.length) {
      defaultRoutes = initialTerms.map(term => {
        return <Route
          key={term}
          path={term}
          element={
            <PhotoList
              imgData={{ [term]: defaultData[term] }}
              fetchData={fetchData}
              setImgData={setImgData}
              title={term}
            />
          }
        />
      });

      // if (default data size = max)
      // - Stateful routes-ready flag = true >>> Re-render
      if (Object.keys(defaultData).length === initialTerms.length) {
        setDefaultRoutesReady(true);
      }
    }
  }, [renderRequest, defaultRoutesReady]);

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

          // Default Data Setting
          if ((
            newQuery === initialTerms[0] ||
            newQuery === initialTerms[1] ||
            newQuery === initialTerms[2]) &&
            defaultDataReady === false) {

              // Update data builder
              defaultDataBuilder = { ...defaultDataBuilder, ...{ [newQuery]: res.data.photos.photo } };

              // Triggers useEffect() that builds default-data and -routes
              setRenderRequest(prev => prev = prev + 1);
          }

          // Race Condition Guard
          // - (!!!) Prevents update when old requests arrive *after* most recent request
          else if (getCurrentTerm() === newQuery) {

            // (1) NO RESULTS: set imgData key to error-code
            if (res.data.photos.photo.length === 0) {
              setImgData({ 'errorNoResults': [] });
              return;
            }

            // (2) VALID RESULTS: set imgData
            setImgData({[newQuery]: res.data.photos.photo});
          }
        })
        .catch(err => console.log('Error fetching/parsing data:', err))
    }, delay); // [SYNC-TEST]
  }

  // // [TEST-POINT], [KEEP] - Keep for future testing.  Tests logic just before calling component
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

        {/* HOME ROUTE */}
        {/* ------------------------------------------------------------------------------------ */}
        <Route
          path='/'
          element={<Navigate to={`${initialTerms[0]}`} replace={true} />}
        />


        {/* [TEST-POINT] */}
        {/* ------------------------------------------------------------------------------------ */}
        {/* <Route path="/test" element={test(<Home />)} /> */}


        {/* DEFAULT ROUTES */}
        {/* ------------------------------------------------------------------------------------ */}
        { (defaultRoutesReady)
          ? defaultRoutes
          : <>
              <Route path='cliffside' element={<Loading />} />
              <Route path='sailboat' element={<Loading />} />
              <Route path='excavator' element={<Loading />} />
            </>
        }

        {/* SEARCH ROUTE */}
        {/* ------------------------------------------------------------------------------------ */}
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

      <p>Powered by flickr.com</p>
    </>
  )
}

export default App
