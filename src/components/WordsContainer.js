import React from 'react';
import WordCard from './WordCard';
import PageNav from './PageNav'
import '../styles/WordsContainer.css';

const WordsContainer = ({ words }) => {
  const wordList = words.map(word => {
    return <WordCard
      key={word.id}
      id={word.id}
      word={word.guess}
      avgCorrect={word['avg_correct']}
      avgPresent={word['avg_present']}
      avg_absent={word['avg_absent']}
      isBookmarked={word.isBookmarked}
    />
  })
  return (
    <section className='words-container'>
      {wordList}
    </section>
  );
}

export default WordsContainer;
