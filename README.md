# SpaceX Mission Explorer

A modern React application built with Next.js, TypeScript, Tailwind CSS, and Redux Toolkit to explore SpaceX launches and missions. This is a simple assignment built for the Atmosly React intern assessment.

## Features

- **Browse Launches**: Display a comprehensive list of SpaceX launches with mission details
- **Search & Filter**: 
  - Debounced search by mission name
  - Filter by launch year
  - Toggle to show only successful launches
  - Toggle to show favorites only
- **Mission Details**: Detailed modal view with mission patch, rocket info, and external links
- **Favorites System**: Mark/unmark missions as favorites (stored in localStorage)
- **Responsive Design**: Mobile-first responsive design with accessibility features
- **Loading States**: Skeleton loaders, error handling, and empty states

## Tech Stack

- **Next.js** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **SpaceX API v4** for data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the project:
```bash
git clone https://github.com/Ankit-Matth/spacex-mission-explorer.git
cd spacex-mission-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser


## Build for Production

```bash
npm run build
npm start
```

## Run Tests
