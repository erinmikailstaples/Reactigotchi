# Overview

This is a Tamagotchi-style virtual pet game built as a React web application featuring a nerdy alien character. The application allows users to interact with their virtual pet by managing three stats (hunger, happiness, cleanliness) through various actions and a reaction-based mini-game. The alien is rendered using pixel art on an HTML5 Canvas with retro 8-bit aesthetics. The project uses modern web technologies including React 18, Vite as the build tool, and TypeScript support for development.

## Recent Changes (November 4, 2025)

- Built complete Tamagotchi game from scratch with pixel art alien character
- Implemented Canvas-based rendering system with animations (jumping, blinking, sad states)
- Created game state management with stat degradation over time
- Built reaction mini-game where users click books (correct) and avoid worms (incorrect)
- Added brain rot visual effect for critically low stats
- Applied retro 8-bit styling with Press Start 2P font and gradient backgrounds
- Fixed stale closure bug in mini-game to ensure proper score tracking
- Redesigned alien with larger, more prominent nerdy glasses
- Renamed to "Reactigotchi!" with React/JavaScript themed feeding animations
- Optimized layout to fit everything on screen without scrolling (320px canvas, compact UI)
- Added PostgreSQL database with Drizzle ORM for persistent high score storage
- Built Express backend server with REST API endpoints for high scores
- Implemented Top 10 scoreboard with 3-letter initials submission
- Added optional email collection for high score notifications (emails are not displayed publicly)
- Created scoreboard overlay that shows after mini-game completion if player makes Top 10

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Architecture

**Technology Stack**: Node.js + Express + PostgreSQL
- **Express Server**: RESTful API running on port 3000
- **Database**: PostgreSQL (Neon) for persistent high score storage
- **ORM**: Drizzle ORM for type-safe database operations

**API Endpoints**:
- `GET /api/highscores` - Retrieves top 10 high scores (excludes email addresses)
- `POST /api/highscores` - Submits a new high score with initials and optional email
- `GET /api/check-highscore/:score` - Checks if a score qualifies for Top 10

**Database Schema**:
- Table: `high_scores`
  - `id`: Serial primary key
  - `initials`: VARCHAR(3) - 3-letter initials (stored in uppercase)
  - `score`: Integer - player's game score
  - `email`: VARCHAR(255) - optional email (not displayed publicly)
  - `created_at`: Timestamp - when the score was achieved

**Security Considerations**:
- Email addresses are stored but never returned in public API responses
- Input validation on initials (exactly 3 characters) and score (positive integer)
- CORS enabled for frontend-backend communication

## Frontend Architecture

**Technology Stack**: React 18 with Vite bundler
- **Rationale**: Vite provides extremely fast Hot Module Replacement (HMR) and optimized builds, making the development experience smooth and productive
- **Component Structure**: The application is organized into distinct UI components:
  - `GameUI.jsx` - Manages the pet's statistics display with animated progress bars and action buttons
  - `MiniGame.jsx` - Handles interactive mini-games for earning points/improving stats
  - `Scoreboard.jsx` - Modal overlay for displaying Top 10 scores and submitting new high scores
  - `Tamagotchi.jsx` - Main container component that orchestrates the overall game state
  - `AlienCanvas.jsx` - Canvas-based rendering of the pixel art alien character
  - `App.jsx` - Root application component

**Rendering Strategy**: Canvas-based rendering for the pet character
- **Rationale**: Canvas allows for pixel-perfect rendering with crisp edges (image-rendering: crisp-edges), essential for retro/pixel-art aesthetic
- **Pros**: Full control over graphics rendering, smooth animations, retro gaming feel
- **Cons**: More complex than DOM-based rendering, requires manual drawing logic

**Styling Approach**: Modular CSS with component-specific stylesheets
- Each component has its own CSS file for isolated styling
- Global styles in `App.css` for base resets
- **Design System**: Retro gaming aesthetic with:
  - Press Start 2P font for authentic pixel game feel
  - Gradient backgrounds (purple/blue theme)
  - Thick borders and text shadows for retro UI elements
  - Animation effects (pulse, float) for visual feedback

## State Management

**Approach**: Component-level state (likely using React hooks)
- **Rationale**: For a single-player game with localized state, React's built-in state management is sufficient
- **Game State**: Manages pet statistics (health, happiness, hunger), mini-game scores, and timers
- **Alternatives Considered**: Redux/Zustand would add unnecessary complexity for this scope

## Build Configuration

**Vite Configuration**: Custom server settings for Replit deployment
- Host: '0.0.0.0' - allows external connections
- Port: 5000 - custom port configuration
- AllowedHosts: 'all' - permits access from Replit's proxy system
- **Rationale**: These settings ensure the app works correctly within Replit's cloud environment

**TypeScript Support**: Optional TypeScript with JSX fallback
- tsconfig.json configured but project uses .jsx files
- Allows gradual migration to TypeScript by renaming files to .tsx
- **Flexibility**: Developers can choose JavaScript or TypeScript per file

## Animation & Interaction System

**CSS Animations**: Used for UI feedback and visual polish
- Pulse animations on stat bars for dynamic feel
- Float animations on title text
- Smooth transitions on stat changes (0.3s ease)
- **Rationale**: CSS animations are performant and don't require JavaScript overhead

**Game Loop**: Canvas-based animation system
- **Approach**: Likely uses requestAnimationFrame for smooth 60fps rendering
- Handles pet animations, mini-game item movement, collision detection

# External Dependencies

## Core Dependencies

**React & React-DOM** (v18.2.0)
- Modern React with concurrent features
- Provides the component framework

**Vite** (v5.0.0)
- Development server with HMR
- Production build optimization
- ES modules support

**@vitejs/plugin-react** (v4.2.0)
- Enables React Fast Refresh
- JSX transformation

**TypeScript** (v5.2.2)
- Type checking support
- Included for optional use

## External Resources

**Google Fonts API**
- Press Start 2P font family
- Loaded via CDN for retro typography
- **Rationale**: Authentic pixel-game aesthetic without bundling font files

## Server Dependencies

**Backend (Node.js)**:
- `express` (v5.1.0) - Web framework for REST API
- `cors` (v2.8.5) - Cross-origin resource sharing middleware
- `@neondatabase/serverless` (v1.0.2) - PostgreSQL client for Neon database
- `drizzle-orm` (v0.44.7) - TypeScript ORM for database operations
- `drizzle-kit` (v0.31.6) - Schema migration and push utilities
- `ws` (v8.18.3) - WebSocket library required by Neon serverless

## Development Workflows

**Two concurrent workflows**:
1. `dev` - Frontend Vite dev server on port 5000 (webview output)
2. `server` - Backend Express API server on port 3000 (console output)

**Database Commands**:
- `npm run db:push` - Push schema changes to database (no manual migrations needed)

**Proxy Configuration**:
- Vite proxies `/api/*` requests to backend server on localhost:3000