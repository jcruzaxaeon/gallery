

// "./src/components/Nav.jsx"

import { NavLink } from 'react-router-dom';

function Nav({initialTerms}) {

  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to={`search/${initialTerms[0]}`}>{initialTerms[0]}</NavLink></li>
        <li><NavLink to={`search/${initialTerms[1]}`}>{initialTerms[1]}</NavLink></li>
        <li><NavLink to={`search/${initialTerms[2]}`}>{initialTerms[2]}</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav

