import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <section className="Header">
      <div className="hamburger-menu">
        <p className="hamburger">≡</p>
      </div>
      <h1 className="referle-title">REFERLE</h1>
      <div className="wordbank-count">
        <p className="count">0</p>
      </div>
    </section>
  );
}

export default Header;
