# Math Learning Game - Client

A minimal, user-friendly Next.js client application for the Math Learning Game API.

## Overview

This guide provides instructions for building the frontend UI using Next.js that connects to the Math Learning Game API server.

### Design Philosophy

- **Minimalism**: Clean, uncluttered interface
- **Neutral Beige Palette**: Warm, calming base colors
- **Refreshing Green Accents**: Natural, friendly green tones
- **User-Friendly**: Intuitive navigation and clear feedback

## Prerequisites

- Node.js LTS (>= 18)
- npm or yarn
- Next.js 14+ (App Router recommended)
- Basic knowledge of React, TypeScript, and API integration
- API server running on `http://localhost:3000`

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
PORT=5173
NEXT_PUBLIC_ADMIN_API_KEY=your-api-key
```

### 3. Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
client-math-web/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx           # Home/landing page
│   ├── game/
│   │   └── page.tsx       # Game interface
│   ├── leaderboard/
│   │   └── page.tsx       # Leaderboard page
│   ├── stats/
│   │   └── [playerName]/
│   │       └── page.tsx   # Player stats page
│   └── admin/
│       └── metrics/
│           └── page.tsx   # Admin metrics dashboard
├── components/
│   ├── Game/              # Game-specific components
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerInput.tsx
│   │   ├── ScoreDisplay.tsx
│   │   ├── Timer.tsx
│   │   ├── FeedbackMessage.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── GameControls.tsx
│   ├── Leaderboard/       # Leaderboard components
│   │   ├── LeaderboardTable.tsx
│   │   ├── LeaderboardFilters.tsx
│   │   ├── LeaderboardPagination.tsx
│   │   └── LeaderboardEntry.tsx
│   ├── Stats/             # Stats components
│   │   ├── PlayerStats.tsx
│   │   ├── StatsCard.tsx
│   │   └── DifficultyBreakdown.tsx
│   ├── Admin/             # Admin components
│   │   └── MetricsDisplay.tsx
│   │   └── MetricsCharts.tsx
│   └── Common/            # Shared UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── LoadingSpinner.tsx
│       ├── ErrorToast.tsx
│       ├── Card.tsx
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Skeleton.tsx
│       └── SkipLink.tsx
├── lib/                   # Core utilities
│   ├── api.ts            # API client functions
│   ├── types.ts          # TypeScript types matching API
│   └── utils.ts          # Utility functions
└── hooks/                 # Custom React hooks
    ├── useGameSession.ts
    ├── useLeaderboard.ts
    ├── usePlayerStats.ts
    └── useMetrics.ts
```

## Architecture

### Framework & Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hooks** for state management
- **Recharts** for data visualization
- **Native Fetch API** (no axios dependency needed)

### Project Structure Rationale

- **App Router**: Modern Next.js routing with server components capability
- **Component Organization**: Feature-based grouping (Game, Leaderboard, Stats, Admin)
- **Shared Components**: Common UI primitives in separate directory
- **Hooks**: Custom hooks for reusable logic
- **Lib**: Core utilities and API client

## API Client

The API client (`lib/api.ts`) provides a unified interface for all API calls with consistent error handling.

### Error Handling Strategy

```typescript
interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    requestId?: string;
    details?: any;
  };
}
```

### Available API Modules

- **Session API**: Create, end, and get session summaries
- **Question API**: Generate questions for game sessions
- **Answer API**: Submit answers and get results
- **Leaderboard API**: Get leaderboard with pagination and filtering
- **Player Stats API**: Get player statistics and metrics
- **Metrics API**: Admin-only server metrics (requires API key)

### Usage Pattern

```typescript
const result = await sessionApi.create(playerName);
if (result.error) {
  // Handle error
  return;
}
// Use result.data
```

## State Management

### Local State (useState)
- UI state (modals, toggles)
- Form inputs
- Temporary display state

### Custom Hooks
- `useGameSession`: Game flow state and session management
- `useLeaderboard`: Leaderboard data + pagination
- `usePlayerStats`: Player statistics
- `useMetrics`: Admin metrics (requires API key)

### URL State
- Game parameters (playerName, mode, difficulty)
- Query params for filtering
- Navigation state

### Session Persistence
- Store sessionId in sessionStorage
- Recover from page refresh
- Clear on session end

## Component Design Patterns

### Container/Presentational Split
- **Pages**: Container components (data fetching, state)
- **Components**: Presentational components (UI, props)

### Composition Pattern
- Small, focused components
- Compose larger features
- Reusable primitives

## Game Flow

### Session Lifecycle
1. **Start**: Create session → Generate first question
2. **Play**: Display question → User answers → Submit → Feedback → Next question
3. **End**: End session → Show summary → Navigate to stats

### Question Flow
```
Question Loaded
  ↓
Start Timer
  ↓
User Input
  ↓
Submit Answer
  ↓
Show Feedback (2s)
  ↓
Generate Next Question
```

## Validation Rules

### Player Name
- Trim whitespace
- Max 64 characters
- Pattern: `^[a-zA-Z0-9\s_-]+$`
- Client-side validation before API call

### Answer Input
- Numeric validation for arithmetic
- Equation format validation
- Empty answer prevention
- Format before submission

## Design System

### Color Palette

#### Beige (Neutral Base)
- `beige-50`: Lightest background (#faf9f7)
- `beige-100`: Card backgrounds (#f5f3f0)
- `beige-200`: Borders, dividers (#ebe7e0)
- `beige-300`: Hover states (#ddd6cc)
- `beige-500`: Secondary text (#b5a894)
- `beige-900`: Primary text (#574d42)

#### Green (Accent)
- `green-100`: Light backgrounds (#dcf2e3)
- `green-300`: Hover states (#8fd1a8)
- `green-500`: Primary actions (#3a9b5f)
- `green-600`: Active states (#2b7d4c)
- `green-700`: Dark accents (#24643e)

### Typography
- Clear, readable fonts (Inter)
- Large text for questions (text-4xl)
- Medium for UI elements (text-base)
- Small for metadata (text-sm)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Animations
- Score changes: Number animation
- Question transitions: Fade/slide
- Button interactions: Hover/active states
- Loading: Skeleton screens
- Reduced motion support

## Features

- 🎮 Interactive math game (arithmetic & equations)
- 📊 Real-time leaderboard with charts
- 📈 Player statistics
- 📉 Admin metrics dashboard with visualizations
- 🎨 Minimal, refreshing design
- 📱 Responsive layout
- ♿ Accessible interface
- ⚡ Smooth animations

## Admin Metrics Dashboard

### Overview

The admin metrics dashboard provides comprehensive server analytics with visual charts and graphs. **Manual API key authentication is required** - admins must enter the API key to access metrics.

### Access

Navigate to `/admin/metrics` and enter your admin API key.

### Features

- **Real-time Performance Metrics**: Last 60 seconds of server activity
- **Enhanced Analytics**: Players, sessions, questions, topics, performance, activity, and scores
- **Visual Charts**: 
  - Questions per hour (bar chart)
  - Topics by mode/difficulty (pie charts)
  - Accuracy comparison (bar chart)
  - Response time percentiles (bar chart)
  - Status codes distribution (bar chart)
  - Top endpoints performance (horizontal bar chart)
- **Auto-refresh**: Optional 5-second auto-refresh
- **Reset Metrics**: Reset all metrics (with confirmation)

### Security

- API key required for access
- No environment variable auto-authentication
- Manual input required each session

## Error Handling

### Error Types
1. **Network Errors**: Connection issues, timeouts
2. **API Errors**: Server errors, validation errors
3. **Client Errors**: Invalid input, state errors

### Error Display
- Toast notifications for transient errors
- Inline errors for form validation
- Error boundaries for component errors
- Fallback UI for critical failures

### Error Recovery
- Retry buttons for failed requests
- Clear error messages
- Guidance for user actions
- Log errors for debugging

### Error Format

All API errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "requestId": "uuid",
    "details": {}
  }
}
```

## Accessibility

### Keyboard Navigation
- Tab order logical
- Enter/Space for buttons
- Escape to close modals
- Arrow keys for navigation
- Skip to main content link

### Screen Readers
- ARIA labels for icons
- ARIA live regions for updates
- Semantic HTML
- Alt text for images

### Visual Accessibility
- Color contrast (WCAG AA)
- Focus indicators
- Text scaling support
- Reduced motion option

## Performance Considerations

### Code Splitting
- Route-based splitting (automatic with App Router)
- Component lazy loading for heavy features
- Dynamic imports for charts/analytics

### API Optimization
- Debounce search inputs
- Cache leaderboard data (60s server cache)
- Batch requests where possible
- Optimistic UI updates

### Rendering Optimization
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers
- Avoid unnecessary re-renders

## Important Notes

1. **Player Name Sanitization**: The server automatically sanitizes player names, but you should also validate on the client:
   - Trim whitespace
   - Limit to 64 characters
   - Only allow alphanumeric, spaces, hyphens, underscores

2. **Request ID Tracking**: The server returns `X-Request-ID` header. Log this for debugging:
   ```typescript
   const response = await fetch(url);
   const requestId = response.headers.get('X-Request-ID');
   console.log('Request ID:', requestId);
   ```

3. **CORS**: Ensure your frontend origin is set in server's `FRONTEND_ORIGIN` environment variable.

4. **Leaderboard Caching**: Leaderboard results are cached for 60 seconds. New answers automatically invalidate the cache.

5. **Session Cleanup**: Inactive sessions (>30 minutes) are automatically closed by the server.

## Testing

### Manual Testing Flow
1. Start API server (port 3000)
2. Start Next.js dev server (`npm run dev`)
3. Navigate to home page
4. Enter player name, select mode/difficulty
5. Start game
6. Answer questions
7. Check leaderboard
8. View stats
9. Test admin metrics (with API key)

### Key Test Cases
- [ ] Create session successfully
- [ ] Generate questions
- [ ] Submit correct answer
- [ ] Submit incorrect answer
- [ ] View leaderboard
- [ ] Filter leaderboard by scope
- [ ] View player stats
- [ ] Handle network errors
- [ ] Handle validation errors
- [ ] Admin metrics access
- [ ] Charts render correctly

## Common Issues & Solutions

### CORS Errors
- Ensure API server has correct `FRONTEND_ORIGIN` set
- Check API URL in `.env.local`

### Type Errors
- Ensure `lib/types.ts` matches API responses
- Check TypeScript configuration

### API Connection
- Verify API server is running
- Check `NEXT_PUBLIC_API_URL` value
- Test API endpoint directly

### Port Conflicts
- Default port is 5173 (configured in `package.json`)
- If port is in use, Next.js will automatically try next available port

## Production Deployment

- Update `NEXT_PUBLIC_API_URL` to your production server URL
- Ensure CORS is configured on the server for your production domain
- Consider using environment-specific configs for dev/staging/prod
- Build and test: `npm run build && npm start`

## Development Workflow

### Code Style
- ESLint configuration
- TypeScript strict mode
- Consistent naming conventions

### Git Workflow
- Feature branches
- Descriptive commits
- PR reviews

## Resources

- **API Docs**: `http://localhost:3000/api/docs`
- **OpenAPI Spec**: `http://localhost:3000/api/docs.json`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Recharts Docs**: https://recharts.org/

## Support

For API documentation:
- Interactive docs: `http://localhost:3000/api/docs`
- OpenAPI JSON: `http://localhost:3000/api/docs.json`

For questions about the API, refer to the server's README.md file.

## License

Private project
