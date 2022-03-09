import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({ toggleNavModal }) => {
  return (
    <section className="Header">
      <div className="hamburger-menu">
        <p className="hamburger" onClick={(event) => toggleNavModal(event)}>≡</p>
      </div>
      <h1 className="referle-title">REFERLE</h1>
      <div className="wordbank-count"></div>
    </section>
  );
}

export default Header;

Header.propTypes = {
  toggleNavModal: PropTypes.func.isRequired
}
