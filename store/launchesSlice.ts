import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Launch, Rocket, LaunchState } from '@/types/spacex';

const loadFavorites = (): string[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('spacex-favorites');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const saveFavorites = (favorites: string[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('spacex-favorites', JSON.stringify(favorites));
  }
};

const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Failed to fetch after multiple retries');
};

export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', async () => {
  const response = await fetchWithRetry('https://api.spacexdata.com/v4/launches');
  if (!response.ok) {
    throw new Error('Failed to fetch launches');
  }
  return response.json() as Promise<Launch[]>;
});

export const fetchRockets = createAsyncThunk('launches/fetchRockets', async () => {
  const response = await fetch('https://api.spacexdata.com/v4/rockets');
  if (!response.ok) {
    throw new Error('Failed to fetch rockets');
  }
  const rockets = await response.json() as Rocket[];
  const rocketMap: Record<string, Rocket> = {};
  rockets.forEach(rocket => {
    rocketMap[rocket.id] = rocket;
  });
  return rocketMap;
});

const initialState: LaunchState = {
  launches: [],
  rockets: {},
  favorites: loadFavorites(),
  loading: false,
  error: null,
  searchTerm: '',
  selectedYear: '',
  showSuccessfulOnly: false,
  showFavoritesOnly: false,
  currentPage: 1,
};

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSelectedYear: (state, action: PayloadAction<string>) => {
      state.selectedYear = action.payload;
      state.currentPage = 1;
    },
    toggleSuccessfulOnly: (state) => {
      state.showSuccessfulOnly = !state.showSuccessfulOnly;
      state.currentPage = 1;
    },
    toggleFavoritesOnly: (state) => {
      state.showFavoritesOnly = !state.showFavoritesOnly;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const launchId = action.payload;
      const index = state.favorites.indexOf(launchId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(launchId);
      }
      saveFavorites(state.favorites);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.loading = false;
        state.launches = action.payload;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch launches';
      })
      .addCase(fetchRockets.pending, (state) => {
        // Don't set loading for rockets as it's secondary data
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        console.error('Failed to fetch rockets:', action.error.message);
      });
  },
});

export const {
  setSearchTerm,
  setSelectedYear,
  toggleSuccessfulOnly,
  toggleFavoritesOnly,
  toggleFavorite,
  clearError,
  setCurrentPage,
} = launchesSlice.actions;

export default launchesSlice.reducer;