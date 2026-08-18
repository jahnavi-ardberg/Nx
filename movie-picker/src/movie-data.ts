export type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  synopsis: string;
  runtime: number;
  rating?: number;
  poster: string;
};

export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'Dune',
    year: 2021,
    genres: ['Sci-Fi', 'Adventure'],
    synopsis: 'A young nobleman joins a brutal desert conflict to save his family and the future.',
    runtime: 155,
    rating: 8.0,
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm2',
    title: 'The Grand Budapest Hotel',
    year: 2014,
    genres: ['Comedy', 'Adventure'],
    synopsis: 'A legendary concierge and his protégé embark on a mysterious caper across Europe.',
    runtime: 99,
    rating: 8.1,
    poster: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm3',
    title: 'Spirited Away',
    year: 2001,
    genres: ['Animation', 'Fantasy'],
    synopsis: 'A young girl finds herself in a magical spirit world and must find a way home.',
    runtime: 125,
    rating: 8.6,
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm4',
    title: 'The Dark Knight',
    year: 2008,
    genres: ['Action', 'Drama'],
    synopsis: 'Batman faces a criminal mastermind and the city teeters on collapse.',
    runtime: 152,
    rating: 9.0,
    poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm5',
    title: 'La La Land',
    year: 2016,
    genres: ['Musical', 'Drama'],
    synopsis: 'A jazz pianist and an aspiring actress chase their dreams in modern Los Angeles.',
    runtime: 128,
    rating: 8.0,
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm6',
    title: 'Arrival',
    year: 2016,
    genres: ['Sci-Fi', 'Drama'],
    synopsis: 'A linguist is recruited to communicate with an alien species before time runs out.',
    runtime: 116,
    rating: 7.9,
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm7',
    title: 'Pride and Prejudice',
    year: 2005,
    genres: ['Romance', 'Drama'],
    synopsis: 'A sharp-witted young woman confronts class, pride, and love in Regency England.',
    runtime: 127,
    rating: 7.8,
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm8',
    title: 'The Princess Bride',
    year: 1987,
    genres: ['Adventure', 'Comedy'],
    synopsis: 'A fairy-tale adventure full of romance, humor, and swashbuckling action.',
    runtime: 98,
    rating: 8.1,
    poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80',
  },
];

export const unknownPoster = 'https://example.invalid/poster.jpg';
