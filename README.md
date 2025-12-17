# Math Learning Game - Client

A minimal, user-friendly Next.js client application for the Math Learning Game API.

## Design Philosophy

- **Minimalism**: Clean, uncluttered interface
- **Neutral Beige Palette**: Warm, calming base colors
- **Refreshing Green Accents**: Natural, friendly green tones
- **User-Friendly**: Intuitive navigation and clear feedback

## Getting Started

### Prerequisites

- Node.js LTS (>= 18)
- npm or yarn
- API server running on `http://localhost:3000`

### Installation

```bash
npm install
```

### Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
client-math-web/
├── app/                    # Next.js App Router pages
│   ├── game/              # Game interface
│   ├── leaderboard/       # Leaderboard page
│   └── stats/             # Player stats
├── components/            # React components
│   ├── Game/             # Game-specific components
│   ├── Leaderboard/      # Leaderboard components
│   ├── Stats/            # Stats components
│   └── Common/           # Shared UI components
├── lib/                   # Core utilities
│   ├── api.ts            # API client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
└── hooks/                 # Custom React hooks
```

## Color Palette

### Beige (Neutral Base)
- `beige-50`: Lightest background
- `beige-100`: Card backgrounds
- `beige-200`: Borders, dividers
- `beige-500`: Secondary text
- `beige-900`: Primary text

### Green (Accent)
- `green-100`: Light backgrounds
- `green-300`: Hover states
- `green-500`: Primary actions
- `green-600`: Active states
- `green-700`: Dark accents

## Features

- 🎮 Interactive math game (arithmetic & equations)
- 📊 Real-time leaderboard
- 📈 Player statistics
- 🎨 Minimal, refreshing design
- 📱 Responsive layout
- ♿ Accessible interface

## API Integration

The client connects to the Math Learning Game API server. Ensure the API server is running and configured with the correct CORS settings.

## License

Private project

