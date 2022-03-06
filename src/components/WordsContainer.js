import React from 'react';
import PropTypes from 'prop-types';
import WordCard from './WordCard';
import '../styles/WordsContainer.css';

const WordsContainer = ({ words, updateWordBank }) => {
  const wordList = words.map(word => {
    return <WordCard
      key={word.id}
      id={word.id}
      word={word.guess}
      avgCorrect={word['avg_correct']}
      avgPresent={word['avg_present']}
      avgAbsent={word['avg_absent']}
      avgTileScore={word['avg_tile_score']}
      isBookmarked={word.isBookmarked}
      updateWordBank={updateWordBank}
    />
  })
  return (
    <section className='words-container'>
      {wordList}
    </section>
  );
}

export default WordsContainer;

WordsContainer.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    word: PropTypes.string,
    avgCorrect: PropTypes.string,
    avgPresent: PropTypes.string,
    avgAbsent: PropTypes.string,
    avgTileScore: PropTypes.string,
    isBookmarked: PropTypes.bool
  })).isRequired,
  updateWordBank: PropTypes.func.isRequired
}
