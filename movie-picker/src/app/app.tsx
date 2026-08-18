import { Link, Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getEligibleMovies, getGenres, pickRandomMovie } from '../recommendation';
import { movies, Movie } from '../movie-data';
import { getStoredFavorites, saveFavorites, toggleFavorite } from '../favorites';

function App() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setFavorites(getStoredFavorites());
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const eligibleMovies = useMemo(
    () => getEligibleMovies(movies, { search, genre }),
    [search, genre],
  );

  useEffect(() => {
    if (selectedMovie && !eligibleMovies.some((movie) => movie.id === selectedMovie.id)) {
      setSelectedMovie(null);
    }
  }, [eligibleMovies, selectedMovie]);

  const genres = useMemo(() => getGenres(movies), []);

  const handlePickMovie = () => {
    if (!eligibleMovies.length) {
      setError('No movies match the current filters.');
      setSelectedMovie(null);
      return;
    }

    const next = pickRandomMovie(eligibleMovies, selectedMovie?.id);
    setSelectedMovie(next ?? null);
    setError('');
  };

  const handleFavoriteToggle = (movieId: string) => {
    const updated = toggleFavorite(favorites, movieId);
    setFavorites(updated);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Movie Picker</h1>
        <nav aria-label="Primary navigation">
          <Link to="/">Picker</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section className="picker-panel">
                <h2>Pick a movie</h2>
                <div className="filters" aria-label="Movie filters">
                  <label>
                    Search by title
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search movies"
                    />
                  </label>

                  <label>
                    Genre
                    <select value={genre} onChange={(event) => setGenre(event.target.value)}>
                      <option value="">All genres</option>
                      {genres.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setGenre('');
                    }}
                  >
                    Clear filters
                  </button>
                </div>

                <p aria-live="polite">Eligible movies: {eligibleMovies.length}</p>

                {error && <p role="alert">{error}</p>}

                {eligibleMovies.length === 0 ? (
                  <div>
                    <p>No movies match the current filters.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setGenre('');
                        setError('');
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={handlePickMovie}>
                    Pick a movie
                  </button>
                )}

                {selectedMovie && (
                  <article className="movie-card" aria-live="polite">
                    <img src={selectedMovie.poster} alt={selectedMovie.title} />
                    <div>
                      <h3>{selectedMovie.title}</h3>
                      <p>
                        {selectedMovie.year} · {selectedMovie.genres.join(', ')} · {selectedMovie.runtime}{' '}
                        min
                      </p>
                      <p>{selectedMovie.synopsis}</p>
                      <p>Rating: {selectedMovie.rating ?? 'N/A'}</p>
                      <button type="button" onClick={() => handleFavoriteToggle(selectedMovie.id)}>
                        {favorites.includes(selectedMovie.id) ? 'Remove favorite' : 'Save favorite'}
                      </button>
                    </div>
                  </article>
                )}
              </section>
            </main>
          }
        />

        <Route
          path="/favorites"
          element={
            <main>
              <section className="favorites-panel">
                <h2>Favorites</h2>
                {favorites.length === 0 ? (
                  <p>
                    No favorites yet. <Link to="/">Pick a movie</Link>
                  </p>
                ) : (
                  <ul className="favorites-list">
                    {favorites
                      .map((id) => movies.find((movie) => movie.id === id))
                      .filter((movie): movie is Movie => Boolean(movie))
                      .map((movie) => (
                        <li key={movie.id} className="favorite-item">
                          <span>{movie.title}</span>
                          <button type="button" onClick={() => handleFavoriteToggle(movie.id)}>
                            Remove
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </section>
            </main>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return (
    <main>
      <h2>Page not found</h2>
      <Link to="/">Return to picker</Link>
    </main>
  );
}

export default App;
