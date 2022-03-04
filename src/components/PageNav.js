import React from 'react';
import '../styles/PageNav.css';

const PageNav = ({ previous, current, next, changePage }) => {
  const handleClickPrev = previous ? changePage: () => {};
  const handleClickNext = next ? changePage : () => {};
  return (
    <section className="page-nav">
      <div>
        <p onClick={() => handleClickPrev(previous) } >‹ Prev.</p>
        <div className="page">
          <p className="page-number">{current}</p>
        </div>
        <p onClick={() => handleClickNext(next)} >Next ›</p>
      </div>
    </section>
  );
}

export default PageNav;
