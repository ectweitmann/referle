import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PageNav.css';

const PageNav = ({ previous, current, next, changePage }) => {
  const displayPrevious = previous ? '' : 'not-visible';
  const displayNext = next ? '' : 'not-visible';
  return (
    <section className="page-nav">
      <div>
        <p className={`${displayPrevious}`} onClick={() => changePage(previous)}>‹ Prev.</p>
        <div className="page">
          <p className="page-number">{current}</p>
        </div>
        <p className={`${displayNext}`} onClick={() => changePage(next)}>Next ›</p>
      </div>
    </section>
  );
}

export default PageNav;

PageNav.propTypes = {
  previous: PropTypes.number,
  current: PropTypes.number.isRequired,
  next: PropTypes.number,
  changePage: PropTypes.func.isRequired
}
