import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({ toggleNavModal, toggleDarkMode }) => {
  return (
    <section className="Header">
      <div className="hamburger-menu">
        <p className="hamburger" onClick={(event) => toggleNavModal(event)}>≡</p>
      </div>
      <h1 className="referle-title">REFERLE</h1>
      <div className="theme-container">
        <p className="theme-icon" onClick={() => toggleDarkMode()}>☀︎</p>
      </div>
    </section>
  );
}

export default Header;

Header.propTypes = {
  toggleNavModal: PropTypes.func.isRequired
}
