import { Launch, Rocket } from "@/types/spacex";

export const mockRockets = {
  id: 'falcon9',
  name: 'Falcon 9',
  description: 'A reusable two-stage rocket designed and manufactured by SpaceX.',
  height: { meters: 70, feet: 229.6 },
  mass: { kg: 549054, lb: 1207920 },
  flickr_images: [],
  success_rate_pct: 98,
  cost_per_launch: 62000000,
} as unknown as Rocket;

export const mockLaunches = [
  {
    id: 'launch1',
    name: 'Starlink Mission',
    flight_number: 101,
    date_utc: '2023-05-15T18:00:00.000Z',
    success: true,
    upcoming: false,
    details: 'A successful mission to deploy Starlink satellites.',
    rocket: 'falcon9',
    links: { 
      patch: { 
        small: 'https://via.placeholder.com/80', 
        large: 'https://via.placeholder.com/220' 
      }, 
      webcast: '#', 
      wikipedia: '#', 
      article: '#' 
    }
  } as unknown as Launch,
  {
    id: 'launch2',
    name: 'Crew Dragon Demo-2',
    flight_number: 102,
    date_utc: '2020-05-30T19:22:00.000Z',
    success: true,
    upcoming: false,
    details: 'The first crewed test flight of the Crew Dragon spacecraft.',
    rocket: 'falcon9',
    links: { 
      patch: { 
        small: 'https://via.placeholder.com/80', 
        large: 'https://via.placeholder.com/220' 
      }, 
      webcast: '#', 
      wikipedia: '#', 
      article: '#' 
    }
  } as unknown as Launch,
  {
    id: 'launch3',
    name: 'Amos-6',
    flight_number: 103,
    date_utc: '2016-09-01T13:07:00.000Z',
    success: false,
    upcoming: false,
    details: 'A mission that ended in a catastrophic failure during a static fire test.',
    rocket: 'falcon9',
    links: { 
      patch: { 
        small: 'https://via.placeholder.com/80', 
        large: 'https://via.placeholder.com/220' 
      }, 
      webcast: '#', 
      wikipedia: '#', 
      article: '#' 
    }
  } as unknown as Launch,
];