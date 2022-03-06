import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ErrorModal.css';

const ErrorModal = ({ error }) => {

  return (
    <div className="ErrorModal">
      <div className="error-modal-content">
        <section className="error-modal-body">
          <span className="error-span">⚠️</span>
          <p className="error-text">{error}</p>
          <span className="error-span">⚠️</span>
        </section>
      </div>
    </div>
  );
}

export default ErrorModal;

ErrorModal.propTypes = {
  error: PropTypes.string.isRequired
}
