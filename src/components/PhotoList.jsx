

// "./src/components/PhotoList.jsx"

// External Imports
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

// Custom Imports and Assignments
import Photo from './Photo';
// Global Query Tracker - Custom-import global-variable avoids UI re-rendering
import { updateCurrentTerm } from './global';

/**
 * ## PhotoList( { object, function(string) } )
 * - imgData `object` : { searchTerm: [array of photo-data] }
 * - fetchData `function(string)` : Fetch data for `urlQuery`-string from API 
 * - Attempts to render 2x:
 *   1. Set Loading Message (before response to data-fetch):
 *     - Typically, urlQuery != imgData-key > Leave `photos` empty > Set "loading" message ...
 *       - because urlQuery holds new-term, while imgData holds old-data
 *     - Else if old-data still matches new-term > Render old `photos`
 *   2. Render New Photos (after response to data-fetch):
 *     - imgData-update triggers re-render where urlQuery == imgData-key
 *     - Build new `photos` > Render `photos`
 * @param {object} props
 * @returns {React.ReactNode} JSX structure for PhotoList UI
 */
function PhotoList({ imgData, fetchData, setImgData }) {
  const { urlQuery } = useParams();
  let msg = "Loading...";

  // Set Global-Query Tracker
  updateCurrentTerm(urlQuery);

  useEffect(() => {
    setImgData({ 'clearOldData': [] });
    fetchData(urlQuery);
  }, [urlQuery]);

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
  
  if (Object.keys(imgData)[0] === 'errorNoResults') {
    msg = `Found no results for "${urlQuery}".`;
  }

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

