

import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
// [ ] Add "useRoutes" to SKS review AR

// Custom Imports and Assignments
import './App.css'
import apiKey from './config'
const key = apiKey;

import Home from './components/Home.jsx';
import PhotoList from './components/PhotoList.jsx';

// Globals
const iniTerms = ['dog', 'cat', 'computer'];

function App() {
  const [count, setCount] = useState(0);
  const [terms, setTerms] = useState(iniTerms);

  let termRoutes = terms.map( (term, i) => {
    return(
      <Route key={i} path={`${term}`} element={<PhotoList term={term} />} />
    );
  });

  return (
    <>
      <h1>Word Gallery</h1>
      <p>Powered by Flickr</p>
      <Routes>
        <Route path='/' element={<Home />} />
        {termRoutes}
      </Routes>
    </>
  )
}

export default App
