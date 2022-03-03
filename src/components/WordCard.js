import React from 'react';
import '../styles/WordCard.css';

const WordCard = ({ id, word, avgCorrect, avgPresent, avgAbsent, avgTileScore, isBookmarked }) => {
  return (
    <section id={`word${id}`} className='word-card'>
      <h2>{word}</h2>
      <section className="word-heurisitcs">
        <section className="word-heurisitics-avgs">
          <div>
            <p>🟩 Avg. Correct {avgCorrect}</p>
          </div>
          <div>
            <p>🟨 Avg. Present {avgPresent}</p>
          </div>
          <div>
            <p>⬜️ Avg. Absent {avgAbsent}</p>
          </div>
        </section>
        <div className="word-heuristics-tile-score">
          <p>Avg. Tile Score</p>
          <p>{avgTileScore}</p>
        </div>
      </section>
    </section>
  );
}

export default WordCard;
