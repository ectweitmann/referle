import React from 'react';
import WordCard from './WordCard';
import PageNav from './PageNav'
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
