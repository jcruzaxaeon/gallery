

import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// [ ] Add "useRoutes" to SKS review AR

// Custom Imports and Assignments
import './App.css'
import apiKey from './config'
const key = apiKey;

import Home from './components/Home.jsx';
import PhotoList from './components/PhotoList.jsx';
import Search from './components/Search';
import Nav from './components/Nav.jsx';

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
      <h2>Word Gallery</h2>
      <Search />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='search'>
          <Route key={"-1"} path=':query' element={<PhotoList />} />
          {termRoutes}
        </Route>
      </Routes>
      <p>Powered by Flickr</p>
    </>
  )
}

export default App
