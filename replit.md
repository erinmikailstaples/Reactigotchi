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

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack**: React 18 with Vite bundler
- **Rationale**: Vite provides extremely fast Hot Module Replacement (HMR) and optimized builds, making the development experience smooth and productive
- **Component Structure**: The application is organized into distinct UI components:
  - `GameUI.jsx` - Manages the pet's statistics display with animated progress bars
  - `MiniGame.jsx` - Handles interactive mini-games for earning points/improving stats
  - `Tamagotchi.jsx` - Main container component that orchestrates the overall game state
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

## No Backend Dependencies

The application is entirely client-side with no:
- Database connections
- API integrations
- Authentication systems
- Server-side rendering

All game state is maintained in the browser session. Future enhancements could add localStorage for persistence or a backend for high scores/multi-player features.