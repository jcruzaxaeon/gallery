

// "./src/components/PhotoList.jsx"

// External Imports
// import axios from 'axios'
import { /*useState ,*/ useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { setLastRequest } from './global';

// Custom Imports and Assignments
import Photo from './Photo';

function PhotoList({ title, imgData, setQuery, fetchData }) {
  const { urlQuery } = useParams();
  const navigate = useNavigate();
  console.log("[LOG8.2] - Route Called", urlQuery)

  setLastRequest(urlQuery);
  
  useEffect(() => {
    async function update() {
      await fetchData(urlQuery);
    }
    update();
    // if(calling &&) { setPendingRequest(urlQuery); }
    // console.log("in useeffect", urlQuery)
    // setQuery(urlQuery);
  }, [urlQuery]);
  console.log("[LOG4]:", urlQuery, "object:", imgData);


  // if (title && imgData) {
  //   useEffect(() => {
  //     console.log("[LOG2.9]: set query")
  //     if(title!==urlQuery)
  //       setQuery(urlQuery);
  //   }, [urlQuery])
  //   console.log("[LOG3]:", urlQuery, `${title}:`, imgData);

  //   // useEffect(()=>{
  //   //   if(searchQuery && searchQuery!==title) {
  //   //     fetchData(searchQuery);
  //   //     console.log("tracking out of sync", imgData);
  //   //   }
  //   // }, [searchQuery])


  // }
  let photos = [];

  // if (urlQuery !== Object.keys(imgData)[0] && Object.keys(imgData).length!==0) {
  //   async function update() {
  //     await fetchData(urlQuery);
  //   }
  //   update();
  // }

  // if(Object.keys(imgData).length!==0) {
  if (urlQuery === Object.keys(imgData)[0]) {
    console.log("[LOG4.9] imgData", imgData);
    photos = imgData[Object.keys(imgData)[0]].map(photo => {
      let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      return (
        <Photo
          key={photo.id}
          path={url}
          desc={photo.title}
        />
      )
    })
  }
  // console.log("[LOG5] photos:", photos);

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <h3>{`${urlQuery}`}</h3>
      <ul>
        { (photos.length!==0)
          ? photos
          : <h2 className='loading'>Loading...</h2>
        }
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

