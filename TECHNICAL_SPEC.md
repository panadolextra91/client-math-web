# Technical Specification - Math Learning Game Client

## Architecture Decisions

### Framework & Stack
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hooks** for state management
- **Native Fetch API** (no axios dependency needed)

### Project Structure Rationale
- **App Router**: Modern Next.js routing with server components capability
- **Component Organization**: Feature-based grouping (Game, Leaderboard, Stats)
- **Shared Components**: Common UI primitives in separate directory
- **Hooks**: Custom hooks for reusable logic
- **Lib**: Core utilities and API client

## API Client Design

### Error Handling Strategy
```typescript
// Unified error response format
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

### Request ID Tracking
- Extract `X-Request-ID` from response headers
- Log for debugging in development
- Include in error messages for support

### Network Error Handling
- Timeout handling (30s default)
- Retry logic for transient failures
- Offline detection
- User-friendly error messages

## State Management Approach

### Local State (useState)
- UI state (modals, toggles)
- Form inputs
- Temporary display state

### Custom Hooks
- `useGameSession`: Game flow state
- `useLeaderboard`: Leaderboard data + pagination
- `usePlayerStats`: Player statistics

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

### Props Interface
- TypeScript interfaces for all props
- Optional props with defaults
- Clear prop naming

## Game Flow Implementation

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

### Timer Implementation
- Start timer when question loads
- Stop timer on answer submit
- Track elapsed time for scoring
- Display in UI (countdown or elapsed)

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

## UI/UX Specifications

### Color Scheme
- Primary: Game theme color
- Success: Green for correct answers
- Error: Red for incorrect answers
- Neutral: Gray for secondary elements

### Typography
- Clear, readable fonts
- Large text for questions
- Medium for UI elements
- Small for metadata

### Spacing
- Consistent padding/margins
- Tailwind spacing scale
- Mobile-friendly touch targets (min 44px)

### Animations
- Score changes: Number animation
- Question transitions: Fade/slide
- Button interactions: Hover/active states
- Loading: Skeleton screens

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

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

## Error Handling Strategy

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

## Accessibility Requirements

### Keyboard Navigation
- Tab order logical
- Enter/Space for buttons
- Escape to close modals
- Arrow keys for navigation

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

## Security Considerations

### Input Sanitization
- Client-side validation
- Server-side validation (trust server)
- XSS prevention
- SQL injection (N/A - no direct DB)

### API Security
- No sensitive data in URLs
- Secure headers
- CORS configuration
- Rate limiting awareness

## Testing Strategy

### Unit Tests
- Utility functions
- Validation logic
- Format helpers
- Type guards

### Component Tests
- Rendering
- User interactions
- Props handling
- Error states

### Integration Tests
- API client
- Hook behavior
- Page flows
- Navigation

### E2E Tests (Optional)
- Complete game session
- Leaderboard navigation
- Stats viewing
- Error scenarios

## Deployment Considerations

### Environment Variables
- `NEXT_PUBLIC_API_URL`: API endpoint
- `NEXT_PUBLIC_ADMIN_API_KEY`: Admin features (optional)

### Build Configuration
- Production optimizations
- Source maps for debugging
- Environment-specific configs

### Monitoring
- Error tracking (Sentry, etc.)
- Performance monitoring
- Analytics integration
- User feedback

## Development Workflow

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Consistent naming conventions

### Git Workflow
- Feature branches
- Descriptive commits
- PR reviews
- Semantic versioning

### Documentation
- Component documentation
- API usage examples
- README updates
- Code comments for complex logic

## Future Enhancements

### Potential Features
- Multiplayer mode
- Achievements/badges
- Daily challenges
- Social sharing
- Dark mode
- Sound effects
- Tutorial/onboarding

### Technical Improvements
- Service worker for offline
- PWA capabilities
- Advanced analytics
- A/B testing
- Performance monitoring

