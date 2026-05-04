import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <button className="hamburger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>×</button>
        <ul className="nav-menu">
          <li onClick={() => scrollToSection('profile')}>
            <span className="nav-icon">👤</span> Profile
          </li>
          <li onClick={() => scrollToSection('experience')}>
            <span className="nav-icon">💼</span> Experience
          </li>
          <li onClick={() => scrollToSection('skills')}>
            <span className="nav-icon">⚡</span> Skills
          </li>
          <li onClick={() => scrollToSection('projects')}>
            <span className="nav-icon">🚀</span> Projects
          </li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Navbar;
