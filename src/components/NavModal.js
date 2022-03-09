import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/NavModal.css';

const NavModal = ({ showModal, toggleNavModal, inDarkMode }) => {
  if (!showModal) {
    return null;
  }
  const lightMode = inDarkMode ? '' : 'light-mode';
  return (
    <div className="NavModal" onClick={() => toggleNavModal()}>
      <div className={`modal-content ${lightMode}`} onClick={event => event.stopPropagation()}>
        <section className="modal-header">
          <button className={`close-modal ${lightMode}`} onClick={() => toggleNavModal()}>×</button>
        </section>
        <section className="modal-body">
          <Link to="/home" className="nav-link" onClick={() => toggleNavModal()}>
            <span className="modal-arrow">➤</span>Home
          </Link>
          <Link to="/wordbank" className="nav-link" onClick={() => toggleNavModal()}>
            <span className="modal-arrow">➤</span>Word Bank
          </Link>
        </section>
      </div>
    </div>
  );
}

export default NavModal;

NavModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleNavModal: PropTypes.func.isRequired
}
