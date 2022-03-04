export const cleanData = (data) => {
  return data.result.map(word => {
    return {
      guess: word.guess,
      avg_correct: parseFloat(word['avg_correct']).toFixed(3),
      avg_present: parseFloat(word['avg_present']).toFixed(3),
      avg_absent: parseFloat(word['avg_absent']).toFixed(3),
      avg_tile_score: parseFloat(word['avg_tile_score']).toFixed(1),
      id: word.id,
      isBookmarked: word.isBookmarked
    }
  });
}
