

// "./src/components/PhotoList.jsx"

// Custom Imports and Assignments
import Photo from './Photo';

function PhotoList({term}) {

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        <Photo
          term={term}
        />

        {/* <!-- Not Found --> */}
        {/* <li className="not-found">
          <h3>No Results Found</h3>
          <p>You search did not return any results. Please try again.</p>
        </li> */}
      </ul>
    </div>
  );
};

export default PhotoList

