import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const mobileScreen = window.matchMedia('(max-width: 768px)');
      setIsMobile(mobileScreen.matches);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <nav className={`navbar ${isMobile ? 'mobile-dark-mode' : ''}`}>
      <div className='hamb'>
        <img
          src="https://zoya.qodeinteractive.com/wp-content/uploads/2021/04/logo-main-img-01.png"
          alt="Zoya Logo"
          className={`navbar-logo`}
        />
        <div className={`menu-icon ${isOpen ? 'active' : ''}`} onClick={handleToggle}>
          {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </div>
      </div>
      <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        <li className="nav-item">
          <NavLink 
            exact="true" // Fix: exact should be a boolean
            to="/" 
            className="nav-links" 
            activeclassname="active" 
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/about" 
            className="nav-links" 
            activeclassname="active" 
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/blog" 
            className="nav-links" 
            activeclassname="active" 
            onClick={() => setIsOpen(false)}
          >
            Blog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/gallery" 
            className="nav-links" 
            activeclassname="active" 
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/contact" 
            className="nav-links" 
            activeclassname="active" 
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;