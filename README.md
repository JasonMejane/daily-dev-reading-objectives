# Reading Objectives Tracker

A simple web application to set, track, and log progress on your reading objectives.
This is my submission for the Daily.dev hackathon 2026.

## Features

- **Create Reading Objectives** - Set new reading goals with a title, tag, and challenge level
- **Track Progress** - Log articles read towards your current objective
- **Challenge Levels** - Choose from Easy, Medium, or Hard with different targets:
  - Easy: 3 articles/week, 10/month, 50/year
  - Medium: 6 articles/week, 20/month, 100/year
  - Hard: 9 articles/week, 30/month, 150/year
- **Multiple Time Frames** - Set objectives for a week, month, year, or no specific timeframe
- **Archive & Cancel** - Manage your objectives by archiving or canceling them

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Styling**: CSS-in-JS (inline styles + imported stylesheet)
- **Database**: In-memory store with singleton pattern

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── api/              # API routes for objectives management
├── components/       # Reusable React components
├── objectives/       # Pages for objective management
└── page.tsx         # Home page

lib/
├── db/              # Database singleton and storage
├── services/        # Business logic for objectives
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Usage

1. **Create an Objective** - Navigate to create and fill out the form with your reading goal
2. **View Current Objective** - See your active objective and its progress
3. **Log Progress** - Click "Log Progress" to increment your article count
4. **Archive or Cancel** - Manage your objectives as needed

## License

MIT License - See LICENSE file for details

## Author

Jason Mejane
