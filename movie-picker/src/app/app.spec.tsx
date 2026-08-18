import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

beforeEach(() => {
  window.localStorage.clear();
});

describe('Movie Picker App', () => {
  it('renders the picker and supports filtering', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Movie Picker' })).toBeTruthy();
    expect(screen.getByText(/Eligible movies:/i)).toBeTruthy();

    const search = screen.getByLabelText('Search by title');
    fireEvent.change(search, { target: { value: 'dune' } });

    expect(screen.getByText(/Eligible movies: 1/i)).toBeTruthy();
  });

  it('allows picking a movie and saving it to favorites', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pick a movie' }));
    const saveButton = screen.getByRole('button', { name: /save favorite/i });
    fireEvent.click(saveButton);

    expect(window.localStorage.getItem('movie-picker-favorites')).toContain('m');
  });

  it('shows an empty favorites state and allows navigation', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Favorites' }));
    expect(screen.getByText(/No favorites yet/i)).toBeTruthy();
  });
});
