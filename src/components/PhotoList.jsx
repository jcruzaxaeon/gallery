

/*
# Word Gallery - PhotoList.jsx
- author: "Joel Cruz",
- email: "jcruz@axaeon.com",
- description: "Project 7: End-of-unit project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse (Code Academy).",
- codename: "7t",
--------------------------------------------------------------------------------------------------*/

// "./src/components/PhotoList.jsx"

// External Imports
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

// Custom Imports and Assignments
import Photo from './Photo';
// Global Query Tracker - Custom-import global-variable avoids UI re-rendering
import { updateCurrentTerm } from '../global';

/**
 * ## PhotoList Component
 * Renders a PhotoList component from provided image data
 * @param {Object} props - Props containing image data, fetchData, and setImgData functions
 * @param {Object} props.imgData - Image data received from the API
 * @param {Function} props.fetchData - Function to fetch new data
 * @param {Function} props.setImgData - Function to set image data
 * @returns {React.ReactNode} JSX.Element: Displays a list of photos based on the fetched data
 */
function PhotoList({ imgData, fetchData, setImgData }) {
  // Attempts to render 2x:
  // 1. Set Loading Message (before response to data-fetch):
  //    - Typically, urlQuery != imgData-key > Leave `photos` empty > Set "loading" message ...
  //    - because urlQuery holds new-term, while imgData holds old-data
  //    - Else if old-data still matches new-term > Render old `photos`
  // 2. Render New Photos (after response to data-fetch):
  //    - imgData-update triggers re-render where urlQuery = imgData-key
  //    - Build new `photos` > Render `photos`
  const { urlQuery } = useParams();
  let msg = "Loading...";

  // Set Global-Query Tracker
  updateCurrentTerm(urlQuery);

  useEffect(() => {
    setImgData({ 'clearOldData': [] });
    fetchData(urlQuery);
  }, [urlQuery]);

  // Build List of Photo-Components
  let photos = [];
  if (urlQuery === Object.keys(imgData)[0]) {
    console.log(imgData);
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
  
  // No Results
  if (Object.keys(imgData)[0] === 'errorNoResults') {
    msg = `Found no results for "${urlQuery}".`;
  }

  // JSX Element Return
  return (
    <div className="photo-container">
      {(photos.length !== 0)
        ? <>
            <h2>Results for:</h2>
            <h3>{`${urlQuery}`}</h3>
          </>
        : <></>
      }

      <ul>
        {(photos.length !== 0)
          ? photos
          : <h2 className='center'>{msg}</h2>
        }
      </ul>
    </div>
  )

};

export default PhotoList

