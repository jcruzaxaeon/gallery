

/*
# Word Gallery - Nav.jsx
- author: "Joel Cruz",
- email: "jcruz@axaeon.com",
- description: "Project 7: End-of-unit project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse (Code Academy).",
- codename: "7t",
--------------------------------------------------------------------------------------------------*/

// External Imports
import { NavLink } from 'react-router-dom';


/**
 * ## Nav Component
 * - Display initial terms as links
 * @param {Object} props
 * @param {string[]} props.initialTerms - Array of initial terms for navigation
 * @returns {React.ReactNode} JSX.Element: Displays navigation links
 */
function Nav({ initialTerms }) {
  const t0 = initialTerms[0];
  const t1 = initialTerms[1];
  const t2 = initialTerms[2];

  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to={`search/${t0}`}>{t0}</NavLink></li>
        <li><NavLink to={`search/${t1}`}>{t1}</NavLink></li>
        <li><NavLink to={`search/${t2}`}>{t2}</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav

