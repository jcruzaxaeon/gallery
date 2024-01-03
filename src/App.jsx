

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
// [ ] Add "useRoutes" to SKS review AR

// Custom Imports and Assignments
import './App.css';
import flickrKey from './config';
// const key = flickrKey;
import { getIniData, updateIniData } from './components/global.js';

import Home from './components/Home.jsx';
import PhotoList from './components/PhotoList.jsx';
import Search from './components/Search';
import Nav from './components/Nav.jsx';

// // Globals
const initialTerms = ['sailboat', 'excavator', 'cliffside'];
const defaultRoutes = [];

function App() {

  // General States
  const [query, setQuery] = useState(`${initialTerms[0]}`);
  const [imgData, setImgData] = useState({});
  const [loading, setLoading] = useState(true);
  const [ini, setIni] = useState(true);
  const [defaultData, setDefaultData] = useState([]);
  // const query = useParams();

  // Globals

  // Fetching
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Fetch data for default routes only once when app loads
  useEffect(() => {
    initialTerms.forEach(term => {
      fetchData(term);
    });
  }, []);

  function createDefaultRoutes() {
    initialTerms.forEach((term, i) => {
      defaultRoutes.push(
        <Route
          key={`route-${i}`}
          path={`search/${term}`}
          element={
            <PhotoList
              title={term}
              data={getIniData()[term]}
            />
          }
        />
      )
    })
  }

  function fetchData(query) {
    setLoading(true);
    let activeFetch = true;
    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${query}&per_page=24&format=json&nojsoncallback=1&safe_search=1`;

    axios.get(flickrUrl)
      .then(res => {
        if (activeFetch) {
          if (ini)
            updateIniData(query, res.data.photos.photo);
          setImgData({ [query]: res.data.photos.photo }); //[!TODO] Convert imgData into an object vs array
          setQuery(query);
          setLoading(false);
          if (Object.keys(getIniData()).length === initialTerms.length) {
            setIni(false);
            createDefaultRoutes();
          }
        }
        console.log("[LOG2]:", imgData, query);
      })
      .catch(err => console.log('Error fetching/parsing data:', err));
    return () => { activeFetch = false; }
  }

  function test(component) {
    console.log("[LOG1] Full:", getIniData());
    return component;
  }

  return (
    <>
      <h2>Word Gallery</h2>

      <Search setQuery={fetchData} />
      <Nav initialTerms={initialTerms} />

      <Routes>

        {/* HOME */}
        <Route path='/' element={test(<Home />)} />

        {(!ini)
          ? <>
            {/* DEFAULT ROUTES */}
            {defaultRoutes}

            {/* SEARCH ROUTE */}
            <Route
              path='search/:searchQuery'
              element={
                <PhotoList
                  title={query}
                  data={imgData[Object.keys(imgData)[0]]}
                  fetchData={fetchData}
                  imgData={imgData}
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
