

// "./src/components/Nav.jsx"

import { NavLink } from 'react-router-dom';

function Nav() {

  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to='search/dog'>Dog</NavLink></li>
        <li><NavLink to='search/cat'>Cat</NavLink></li>
        <li><NavLink to='search/computer'>Computer</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav

