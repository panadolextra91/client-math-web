# Quick Start Guide - Math Learning Game Client

## Immediate Next Steps

### 1. Initialize Project
```bash
# Initialize Next.js with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --no-git

# Install dependencies (if needed)
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 3. Project Structure
Create the following directories:
```bash
mkdir -p app/game app/leaderboard app/stats/\[playerName\]
mkdir -p components/{Game,Leaderboard,Stats,Common}
mkdir -p lib hooks
```

### 4. Core Files to Create First

**Priority Order:**

1. **`lib/types.ts`** - Type definitions (foundation)
2. **`lib/api.ts`** - API client (core functionality)
3. **`lib/utils.ts`** - Utility functions (validation, formatting)
4. **`hooks/useGameSession.ts`** - Game session management
5. **`components/Common/Button.tsx`** - Basic UI component
6. **`components/Common/Input.tsx`** - Form input
7. **`components/Common/LoadingSpinner.tsx`** - Loading state
8. **`app/page.tsx`** - Home/landing page
9. **`app/game/page.tsx`** - Game interface
10. **`app/leaderboard/page.tsx`** - Leaderboard page

## Implementation Checklist

### Phase 1: Foundation (Day 1)
- [ ] Initialize Next.js project
- [ ] Set up environment variables
- [ ] Create project structure
- [ ] Implement `lib/types.ts`
- [ ] Implement `lib/api.ts`
- [ ] Create `lib/utils.ts` with validation

### Phase 2: Core Hooks (Day 2)
- [ ] Implement `hooks/useGameSession.ts`
- [ ] Implement `hooks/useLeaderboard.ts`
- [ ] Implement `hooks/usePlayerStats.ts`
- [ ] Test hooks with API

### Phase 3: Common Components (Day 2-3)
- [ ] Create `components/Common/Button.tsx`
- [ ] Create `components/Common/Input.tsx`
- [ ] Create `components/Common/LoadingSpinner.tsx`
- [ ] Create `components/Common/ErrorToast.tsx`
- [ ] Create `components/Common/Card.tsx`

### Phase 4: Game Components (Day 3-4)
- [ ] Create `components/Game/QuestionCard.tsx`
- [ ] Create `components/Game/AnswerInput.tsx`
- [ ] Create `components/Game/ScoreDisplay.tsx`
- [ ] Create `components/Game/Timer.tsx`
- [ ] Create `components/Game/FeedbackMessage.tsx`
- [ ] Create `components/Game/ProgressIndicator.tsx`

### Phase 5: Pages (Day 4-5)
- [ ] Create `app/page.tsx` (home)
- [ ] Create `app/game/page.tsx` (game)
- [ ] Create `app/leaderboard/page.tsx`
- [ ] Create `app/stats/[playerName]/page.tsx`

### Phase 6: Polish (Day 5+)
- [ ] Add animations
- [ ] Improve responsive design
- [ ] Add error handling
- [ ] Test all flows
- [ ] Fix bugs

## Key Implementation Notes

### API Client Pattern
```typescript
// Always use this pattern for API calls
const result = await sessionApi.create(playerName);
if (result.error) {
  // Handle error
  return;
}
// Use result.data
```

### Error Handling
- Always check `result.error` before using `result.data`
- Display user-friendly error messages
- Log errors for debugging

### State Management
- Use custom hooks for API interactions
- Keep UI state local with useState
- Use URL params for navigation state

### Component Structure
```typescript
'use client'; // For client components

export default function ComponentName() {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
}
```

## Testing the Implementation

### Manual Testing Flow
1. Start API server (port 3000)
2. Start Next.js dev server (`npm run dev`)
3. Navigate to home page
4. Enter player name, select mode/difficulty
5. Start game
6. Answer questions
7. Check leaderboard
8. View stats

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

## Resources

- **API Docs**: `http://localhost:3000/api/docs`
- **OpenAPI Spec**: `http://localhost:3000/api/docs.json`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## Getting Help

1. Check API documentation
2. Review error messages (check request ID)
3. Check browser console
4. Verify environment variables
5. Test API endpoints directly

