

// "./src/components/Nav.jsx"

import { NavLink } from 'react-router-dom';

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

