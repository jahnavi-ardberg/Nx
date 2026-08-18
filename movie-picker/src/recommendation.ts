import { Movie } from './movie-data';

export type Filters = {
  search: string;
  genre: string;
};

export function getEligibleMovies(movies: Movie[], filters: Filters) {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return movies.filter((movie) => {
    const matchesTitle =
      normalizedSearch.length === 0 ||
      movie.title.toLowerCase().includes(normalizedSearch);

    const matchesGenre =
      !filters.genre || movie.genres.some((genre) => genre === filters.genre);

    return matchesTitle && matchesGenre;
  });
}

export function pickRandomMovie(movies: Movie[], previousId?: string) {
  if (!movies.length) return null;

  if (movies.length === 1) return movies[0];

  const available = previousId
    ? movies.filter((movie) => movie.id !== previousId)
    : movies;

  const pick = available[Math.floor(Math.random() * available.length)];
  return pick ?? movies[0];
}

export function getGenres(movies: Movie[]) {
  return [...new Set(movies.flatMap((movie) => movie.genres))].sort((a, b) =>
    a.localeCompare(b),
  );
}
