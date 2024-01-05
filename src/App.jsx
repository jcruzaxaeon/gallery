

/*
# Word Gallery

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

// External Imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// [ ] [TODO-7t]
// [ ] Add "useRoutes" to SKS review AR

// Custom Imports, Assignments
import './App.css';
import flickrKey from './config';
import { getLastRequest, setLastRequest } from './components/global.js';

// Component Imports
import Home from './components/Home.jsx';
import PhotoList from './components/PhotoList.jsx';
import Search from './components/Search';
import Nav from './components/Nav.jsx';

// Globals
const initialTerms = ['cliffside', 'sailboat', 'excavator'];
const defaultRoutes = [];

/**
 * ## App - Main function
 * @returns {React.ReactNode} JSX structure for application UI
 */
function App() {

  // General States
  const [query, setQuery] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [calling, setCalling] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(null);
  // const [lastRequest, setLastRequest] = useState(null);

  // const [query, setQuery] = useState(initialTerms[0]);
  const [imgData, setImgData] = useState({});

  // [ ] [TODO-7t]
  const [loading, setLoading] = useState(true);
  const [ini, setIni] = useState(false);

  /* 
  Fetching
  - Fetch data once, when app loads, to display default results
  - Re-fetch when `query` changes > Triggers re-render
  ------------------------------------------------------------------------------------------------*/
  useEffect( () => { if(query) {
    console.log('[LOG7]:', "query:", query, "keys:", Object.keys(imgData)[0]);
    fetchData(query);
    // if(pendingRequest) {
    //   setQuery(pendingRequest);
    //   setPendingRequest(null);
    // }
    return () => { setFetching(false); }
  }}, [query/*, pendingRequest*/]);


  // function tryFetchData(newQuery) {
  //   if(fetching) { setPendingRequest(newQuery); }
  //   else         { setQuery(newQuery); }
  // }

  /**
   *  
   * 
   */
  async function fetchData(newQuery) {


      setFetching(true);
      setCalling(true);
      console.log("prefetch, setLastRequest:", getLastRequest() );
      const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${newQuery}&per_page=6&format=json&nojsoncallback=1&safe_search=1`;

      await axios.get(flickrUrl)
        .then(res => {
          if(fetching) {
            console.log("infetch:", newQuery);
            console.log("check last request:", getLastRequest(), "newQuery:", newQuery )
            if(getLastRequest()===newQuery) {
              setImgData({ [newQuery]: res.data.photos.photo });
              console.log("check imgData", imgData);
            }
            setCalling(false);
            // if(pendingRequest) {
            //   console.log("Fetch pending request");
            //   fetchData(pendingRequest);
            //   setPendingRequest(null);
            // }
          }
        })
        .catch(err => console.log('Error fetching/parsing data:', err));
  }

  // // [TEST01] - Keep for future testing
  // function test(component) {
  //   console.log("Log values before render here:");
  //   return component;
  // }



  // JSX Structure
  //------------------------------------------------------------------------------------------------
  return (
    <>
      <h2>Word Gallery</h2>

      <Search setQuery={setQuery} />
      <Nav initialTerms={initialTerms} />

      <Routes location={location}>
        {/* HOME */}
        <Route key={location.key} path='/' element={<Home />} />

        {/* [TEST01] */}
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
                  title={query}
                  imgData={imgData}
                  setQuery={setQuery}
                  fetchData={fetchData}
                  setLastRequest={setLastRequest}
                />
              }
            />
          </>
          : <Route path='*' element={<Navigate to='/' />} />
        }

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      {/* <> { (loading)
        ? <p>Loading...</p>
        : <Routes>
            <Route path='/' element={<Home />} />
            {defaultRoutes}
            <Route
              path='search/:query'
              element={
                <PhotoList
                  title={"hiking"}
                  imgData={imgData}
                />
              }
            />
          </Routes>
      }</> */}

      <p>Powered by Flickr</p>
    </>
  )
}

export default App
