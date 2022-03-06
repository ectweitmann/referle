import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/NavModal.css';

const NavModal = ({ showModal, toggleNavModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="NavModal" onClick={() => toggleNavModal()}>
      <div className="modal-content" onClick={event => event.stopPropagation()}>
        <section className="modal-header">
          <a className="close-modal" onClick={() => toggleNavModal()}>×</a>
        </section>
        <section className="modal-body">
          <Link to="/home" className="nav-link" onClick={() => toggleNavModal()}>
            <span>➤</span>Home
          </Link>
          <Link to="/wordbank" className="nav-link" onClick={() => toggleNavModal()}>
            <span>➤</span>Word Bank
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
