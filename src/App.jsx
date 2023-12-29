

// import axios from 'axios'

import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
const iniTerms = ['dog', 'cat', 'computer']

// Utility Functions
// const handleSearch = searchText => setQuery(searchText)

function App() {

  // General States
  const [count, setCount] = useState(0)
  const [terms, setTerms] = useState(iniTerms)
  // const [query, setQuery] = useState(`${iniTerms[0]}`)

  // // Fetch States
  // const [imgData, setImgData] = useState([])
  // const [query, setQuery] = useState(`${iniTerms[0]}`)
  const [loading, setLoading] = useState(true)

  // // Utility Functions
  // const handleSearch = searchText => setQuery(searchText)

  // // Fetching
  // useEffect(() => {
  //   setLoading(true)
  //   let activeFetch = true
  //   const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&text=${query}&per_page=24&format=json&nojsoncallback=1&safe_search=1`

  //   axios.get(flickrUrl)
  //     .then(res => {
  //       if (activeFetch) {
  //         setImgData(res.data.photos.photo)
  //         setLoading(false)
  //       }
  //     })
  //     .catch(err => console.log('Error fetching/parsing data:', err))

  //   // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=APIKEYHERE&text=sunset&safe_search=1&per_page=24&format=json&nojsoncallback=1
  //   return () => { activeFetch = false }
  // }, [query])

  // console.log(imgData) // [!BUG] Prints out 3x.  Why?

  // Routing Array for Default Terms
  // let termRoutes = terms.map((term, i) => {
  //   return (
  //     <Route key={i} path={`${term}`} element={<PhotoList term={term} />} />
  //   )
  // })

  return (
    <>
      <h2>Word Gallery</h2>
      <Search />
      <Nav />
      <> 
        {/* { (loading)
          ? <p>Loading...</p>
          :  */}
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='search'>
                <Route
                  key={"-1"}
                  path=':query'
                  element={
                    <PhotoList 
                      // dat={imgData}
                      // query={query}
                      setLoading={setLoading}
                    />
                  } />
                {/* {termRoutes} */}
              </Route>
            </Routes>
        {/* }  */}
      </>

      <p>Powered by Flickr</p>
    </>
  )
}

export default App
