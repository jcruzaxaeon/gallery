

// import axios from 'axios'

import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// [ ] Add "useRoutes" to SKS review AR

// Custom Imports and Assignments
import './App.css'
// import flickrKey from './config'
// const key = flickrKey;

import Home from './components/Home.jsx'
import PhotoList from './components/PhotoList.jsx'
import Search from './components/Search'
import Nav from './components/Nav.jsx'

// // Globals
const initialTerms = ['hiking', 'dump truck', 'cliffside']

function App() {

  // General States
  const [loading, setLoading] = useState(true)

  return (
    <>
      <h2>Word Gallery</h2>
      <Search />
      <Nav initialTerms={initialTerms} />
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='search'>
            <Route
              path=':query'
              element={
                <PhotoList
                  loading={loading}
                  setLoading={setLoading}
                />
              } />
          </Route>
        </Routes>
      </>

      <p>Powered by Flickr</p>
    </>
  )
}

export default App
