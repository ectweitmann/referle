import React from 'react';
import '../styles/WordCard.css';

const WordCard = ({
  id,
  word,
  avgCorrect,
  avgPresent,
  avgAbsent,
  avgTileScore,
  isBookmarked,
  updateWordBank
}) => {

  return (
    <section id={id} className='word-card' onDoubleClick={() => updateWordBank(id, isBookmarked)}>
      <h2>{word}</h2>
      <section className="word-heuristics">
        <section className="word-heuristics-avgs">
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
          <p className="ats-paragraph">Avg. Tile Score</p>
          <p className="ats-score">{avgTileScore}</p>
        </div>
      </section>
    </section>
  );
}

export default WordCard;
