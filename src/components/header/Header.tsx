import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const getActiveLinkClassName = (isActive: boolean) => (isActive ? 'link link--active' : 'link');

  return (
    <header>
      <nav className="navigation">
        <NavLink to="/" className={({ isActive }) => getActiveLinkClassName(isActive)}>Home</NavLink>
        <NavLink to="/characters" className={({ isActive }) => getActiveLinkClassName(isActive)}>Characters</NavLink>
        <NavLink to="/episode" className={({ isActive }) => getActiveLinkClassName(isActive)}>Episodes</NavLink>
        <NavLink to="/location" className={({ isActive }) => getActiveLinkClassName(isActive)}>Locations</NavLink>
      </nav>
    </header>
  );
};

export default Header;
