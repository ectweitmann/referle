export const getDefaultWordList = (page, limit) => {
  return fetch(`http://localhost:3010/api/v1/heuristics/sorted/avg_tile_score?page=${page}&limit=${limit}`);
}
