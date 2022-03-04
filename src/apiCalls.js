export const getDefaultWordList = (page, limit) => {
  return fetch(`http://localhost:3010/api/v1/heuristics/sorted/avg_tile_score?page=${page}&limit=${limit}`);
}

export const getBookmarkedWords = (page, limit) => {
  return fetch(`http://localhost:3010/api/v1/heuristics/bookmarked?page=${page}&limit=${limit}`);
}

export const updateWordsBookmarkedStatus = (id, status) => {
  return fetch(`http://localhost:3010/api/v1/heuristics/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({"isBookmarked": !status}),
    headers: { 'Content-Type': 'application/json' }
  });
}
