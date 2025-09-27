import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import MissionsList from '@/components/MissionList';
import { mockLaunches, mockRockets } from '../utils/mockData';

jest.mock('@/components/MissionCard', () => {
  const MockedMissionCard = () => <div data-testid="mission-card" />;
  MockedMissionCard.displayName = 'MockedMissionCard';
  return MockedMissionCard;
});

jest.mock('@/components/MissionModal', () => () => null);

describe('MissionsList Component - Empty State Scenarios', () => {
  
  test('renders the correct empty state when a search term yields no results', () => {
    const searchTerm = 'MissionToMars';
    renderWithProviders(<MissionsList />, {
      preloadedState: {
        launches: {
          launches: mockLaunches,
          rockets: { falcon9: mockRockets },
          favorites: [],
          loading: false,
          error: null,
          searchTerm: searchTerm,
          selectedYear: '',
          showSuccessfulOnly: false,
          showFavoritesOnly: false,
          currentPage: 1,
        },
      },
    });

    const expectedTitle = `No missions match "${searchTerm}". Try a different search term.`;
    expect(screen.getByRole('heading', { name: expectedTitle })).toBeInTheDocument();
    
    expect(screen.queryByTestId('mission-card')).not.toBeInTheDocument();
  });

  test('renders the "no favorites" empty state when "Favorites only" is toggled with an empty favorites list', () => {
    renderWithProviders(<MissionsList />, {
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
          showFavoritesOnly: true, 
          currentPage: 1,
        },
      },
    });

    expect(screen.getByRole('heading', { name: 'No favorites yet' })).toBeInTheDocument();
    expect(screen.getByText('Mark some missions as favorites to see them here.')).toBeInTheDocument();
    
    expect(screen.queryByTestId('mission-card')).not.toBeInTheDocument();
  });
  
  test('renders a generic empty state when other filters result in no matches', () => {
    renderWithProviders(<MissionsList />, {
      preloadedState: {
        launches: {
          launches: mockLaunches,
          rockets: { falcon9: mockRockets },
          favorites: [],
          loading: false,
          error: null,
          searchTerm: '',
          selectedYear: '2024',
          showSuccessfulOnly: false,
          showFavoritesOnly: false,
          currentPage: 1,
        },
      },
    });

    expect(screen.getByRole('heading', { name: 'No missions match your filters' })).toBeInTheDocument();
    expect(screen.getByText('Try removing some filters to see more results.')).toBeInTheDocument();
  });

});