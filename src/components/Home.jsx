

/*
# Word Gallery - Home.jsx
- author: "Joel Cruz",
- email: "jcruz@axaeon.com",
- description: "Project 7: End-of-unit project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse (Code Academy).",
- codename: "7t",
--------------------------------------------------------------------------------------------------*/

// External Imports
import React from "react";

import Loading from './Loading';
import PhotoList from "./PhotoList";

/**
 * ## Home Component
 * - Component is not needed
 * - Required per spec
 * - Keeping Search, and Nav in App for readability
 * @returns {React.ReactNode} Empty JSX element 
 */
function Home({ defaultData, defaultRoutesReady, fetchData, setImgData }) {
  return(
    <>
      {(!defaultRoutesReady)
        ? <Loading />
        : <PhotoList
            imgData={ {cliffside: defaultData['cliffside']} }
            fetchData={fetchData}
            setImgData={setImgData}
            title={'cliffside'}
          />
        // : <h3 className='center'>
        //     Please enter a search term, or click on an option above.
        //   </h3>
      }
    </>
  );
}

export default Home;