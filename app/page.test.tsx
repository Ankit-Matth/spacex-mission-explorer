import React from 'react';
import { screen } from '@testing-library/react';
import Home from './page';
import { renderWithProviders } from '../utils/test-utils';

jest.mock('@/components/SearchAndFilters', () => () => <div>SearchAndFilters</div>);
jest.mock('@/components/MissionList', () => () => <div>MissionsList</div>);

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Home Page', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('displays the correct number of favorites from the redux store', () => {
    const preloadedState = {
      launches: {
        launches: [],
        rockets: {},
        favorites: ['launch_id_1', 'launch_id_2', 'launch_id_3'], // 3 favorites
        loading: false,
        error: null,
        searchTerm: '',
        selectedYear: '',
        showSuccessfulOnly: false,
        showFavoritesOnly: false,
        currentPage: 1,
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    const favoritesDisplay = screen.getByText(/3 favorites/i);
    expect(favoritesDisplay).toBeInTheDocument();
  });

  it('shows "0 Favorites" when the favorites array is empty', () => {
    const preloadedState = {
      launches: {
        launches: [],
        rockets: {},
        favorites: [],
        loading: false,
        error: null,
        searchTerm: '',
        selectedYear: '',
        showSuccessfulOnly: false,
        showFavoritesOnly: false,
        currentPage: 1,
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    const favoritesDisplay = screen.getByText(/0 favorites/i);
    expect(favoritesDisplay).toBeInTheDocument();
  });
});