

// "./src/components/PhotoList.jsx"

// External Imports
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Custom Imports and Assignments
import Photo from './Photo';
import flickrKey from '../config'

function PhotoList({ loading, setLoading }) {

  // Fetch States
  const [imgData, setImgData] = useState([])
  const { query } = useParams();

  // Fetching
  useEffect(() => {
    setLoading(true)
    let activeFetch = true
    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${query}&per_page=24&format=json&nojsoncallback=1&safe_search=1`

    axios.get(flickrUrl)
      .then(res => {
        console.log("response", res)
        if (activeFetch) {
          setImgData(res.data.photos.photo)
          setLoading(false)
        }
      })
      .catch(err => console.log('Error fetching/parsing data:', err))

    // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=APIKEYHERE&text=sunset&safe_search=1&per_page=24&format=json&nojsoncallback=1
    return () => { activeFetch = false }
  }, [query])

  console.log(imgData) // [!BUG] Prints out 3x.  Why?

  let photos = imgData.map(photo => {
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    return (
      <Photo
        key={photo.id}
        path={url}
        desc={photo.title}
      />
    )
  })

  return (
    <>
    { (loading)
      ? ( <p>Loading...</p>)
      : ( <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {photos};

          {/* <!-- Not Found --> */}
          {/* <li className="not-found">
          <h3>No Results Found</h3>
          <p>You search did not return any results. Please try again.</p>
        </li> */}
        </ul>
      </div>
    )}
    </>
  );
};

export default PhotoList

