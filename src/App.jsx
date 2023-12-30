

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// [ ] Add "useRoutes" to SKS review AR

// Custom Imports and Assignments
import './App.css';
import flickrKey from './config';
// const key = flickrKey;

import Home from './components/Home.jsx';
import PhotoList from './components/PhotoList.jsx';
import Search from './components/Search';
import Nav from './components/Nav.jsx';

// // Globals
const initialTerms = ['hiking', 'dump truck', 'cliffside'];

function App() {

  // General States
  const [query, setQuery] = useState(`${initialTerms[0]}`);
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utility Functions
  function fetchData(query) {
    setLoading(true);
    let activeFetch = true;
    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${query}&per_page=24&format=json&nojsoncallback=1&safe_search=1`;

    axios.get(flickrUrl)
      .then(res => {
        console.log("response", res);
        if (activeFetch) {
          setImgData(res.data.photos.photo);
          setLoading(false);
        }
      })
      .catch(err => console.log('Error fetching/parsing data:', err));
    return () => { activeFetch = false; }
  }

  // Fetching
  useEffect(() => {
    fetchData(query);
  }, [query])

  return (
    <>
      <h2>Word Gallery</h2>
      
      <Search setQuery={fetchData} />
      
      <Nav 
        initialTerms={initialTerms}
        setQuery={fetchData}
      />
      
      <>
        {(loading)
          ? <p>Loading...</p>
          : <Routes>
            <Route path='/' element={<Home />} />
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
        }
      </>

      <p>Powered by Flickr</p>
    </>
  )
}

export default App
