export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  success: boolean | null;
  upcoming: boolean;
  rocket: string;
  details: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  auto_update: boolean;
  tbd: boolean;
  flight_number: number;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number;
  fairings: {
    reused: boolean | null;
    recovery_attempt: boolean | null;
    recovered: boolean | null;
    ships: string[];
  } | null;
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  description: string;
  wikipedia: string;
  flickr_images: string[];
}

export interface LaunchState {
  launches: Launch[];
  rockets: Record<string, Rocket>;
  favorites: string[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedYear: string;
  showSuccessfulOnly: boolean;
  showFavoritesOnly: boolean;
  currentPage: number;
}

export interface RootState {
  launches: LaunchState;
}