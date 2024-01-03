

// "./src/components/PhotoList.jsx"

// External Imports
// import axios from 'axios'
import { /*useState ,*/ useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Custom Imports and Assignments
import Photo from './Photo';

function PhotoList({ title, data, fetchData, imgData }) {

  const { searchQuery } = useParams();
  console.log("[LOG3]:", searchQuery);

  useEffect(()=>{
    if(searchQuery && searchQuery!==title) {
      fetchData(searchQuery);
      console.log("tracking out of sync", imgData);
    }
  }, [searchQuery])

  console.log(`${title}:`, data)

  let photos = data.map(photo => {
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
    <div className="photo-container">
      <h2>Results</h2>
      <h3>{`${title}`}</h3>
      <ul>
        {photos};

        {/* <!-- Not Found --> */}
        {/* <li className="not-found">
          <h3>No Results Found</h3>
          <p>You search did not return any results. Please try again.</p>
        </li> */}
      </ul>
    </div>
  )
};

export default PhotoList

