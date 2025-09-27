import React from 'react';
import { screen, waitFor, act, within } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import { mockLaunches, mockRockets } from '../utils/mockData';
import MissionsList from './MissionList';

jest.mock('./SearchAndFilters', () => {
  const MockedSearchAndFilters = () => <div>SearchAndFilters Mock</div>;
  MockedSearchAndFilters.displayName = 'SearchAndFilters';
  return MockedSearchAndFilters;
});

describe('User Interactions', () => {
  it('renders a list of missions and filters for successful launches only', async () => {
    const { store } = renderWithProviders(<MissionsList />, {
      preloadedState: {
        launches: {
          launches: mockLaunches,
          rockets: { falcon9: mockRockets },
          favorites: [],
          loading: false,
          error: null,
          searchTerm: '',
          selectedYear: '',
          showSuccessfulOnly: false,
          showFavoritesOnly: false,
          currentPage: 1,
        },
      },
    });

    expect(screen.getByText('Starlink Mission')).toBeInTheDocument();
    expect(screen.getByText('Crew Dragon Demo-2')).toBeInTheDocument();
    expect(screen.getByText('Amos-6')).toBeInTheDocument();

    act(() => {
        store.dispatch({ type: 'launches/toggleSuccessfulOnly' });
    });

    await waitFor(() => {
      expect(screen.queryByText('Amos-6')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Starlink Mission')).toBeInTheDocument();
    expect(screen.getByText('Crew Dragon Demo-2')).toBeInTheDocument();
  });

  it('allows a user to toggle a mission as a favorite', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MissionsList />, {
      preloadedState: {
        launches: {
          launches: [mockLaunches[0]],
          rockets: { falcon9: mockRockets },
          favorites: [],
          loading: false,
          error: null,
          searchTerm: '',
          selectedYear: '',
          showSuccessfulOnly: false,
          showFavoritesOnly: false,
          currentPage: 1,
        },
      },
    });

    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(favoriteButton.querySelector('img')?.getAttribute('src')).toBe('/outlined-heart.svg');
    
    await user.click(favoriteButton);

    await waitFor(() => {
      const unfavoriteButton = screen.getByRole('button', { name: /remove from favorites/i });
      expect(unfavoriteButton.querySelector('img')?.getAttribute('src')).toBe('/red-heart.svg');
    });
  });

it('opens and displays the correct mission details in a modal when a card is clicked', async () => {
  const user = userEvent.setup();
  renderWithProviders(<MissionsList />, {
    preloadedState: {
      launches: {
        launches: [mockLaunches[0]],
        rockets: { falcon9: mockRockets },
        favorites: [],
        loading: false,
        error: null,
        searchTerm: '',
        selectedYear: '',
        showSuccessfulOnly: false,
        showFavoritesOnly: false,
        currentPage: 1,
      },
    },
  });

  const detailsButton = screen.getByRole('button', { name: /view details for starlink mission/i });
  await user.click(detailsButton);

  const modal = await screen.findByRole('dialog');
  expect(modal).toBeInTheDocument();
  
  const modalWithin = within(modal);

  expect(modalWithin.getByRole('heading', { name: 'Starlink Mission' })).toBeInTheDocument();
  expect(modalWithin.getByText('Flight Number')).toBeInTheDocument();
  expect(modalWithin.getByText('101')).toBeInTheDocument();
  expect(modalWithin.getByText(/A successful mission/)).toBeInTheDocument();
});
});