export const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: Unable to load content. Please try reloading the page.`);
  } else {
    return response.json();
  }
}

export const cleanData = (data) => {
  const { previous, current, next } = cleanPageData(data.previous, data.current, data.next);
  const result = cleanWordData(data.result);
  return {
    previous: previous,
    current: current,
    next: next,
    result: result
  }
}

const cleanWordData = (wordData) => {
  return wordData.map(word => {
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

const cleanPageData = (previous, current, next) => {
  return {
    previous: previous ? previous.page : null,
    current: current.page,
    next: next ? next.page : null
  }
}
