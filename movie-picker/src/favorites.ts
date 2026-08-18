const STORAGE_KEY = 'movie-picker-favorites';

export function getStoredFavorites(): string[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]) {
  const clean = [...new Set(favorites)];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
}

export function toggleFavorite(current: string[], movieId: string) {
  if (current.includes(movieId)) {
    return current.filter((id) => id !== movieId);
  }

  return [...current, movieId];
}
