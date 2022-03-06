import React from 'react';
import PropTypes from 'prop-types';
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

  const isBookmarkedStyle = isBookmarked ? 'bookmarked' : '';

  return (
    <section id={id} className={`word-card ${isBookmarkedStyle}`}  onDoubleClick={() => updateWordBank(id, isBookmarked)}>
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

WordCard.propTypes = {
  id: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  avgCorrect: PropTypes.string.isRequired,
  avgPresent: PropTypes.string.isRequired,
  avgAbsent: PropTypes.string.isRequired,
  avgTileScore: PropTypes.string.isRequired,
  isBookmarked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  updateWordBank: PropTypes.func.isRequired
}
