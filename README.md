# 🛸 Reactigotchi

A React-based Tamagotchi-style virtual pet game featuring an adorable alien companion! Care for your pet by managing hunger, happiness, and cleanliness stats, play mini-games, and compete on the global leaderboard.

> Built with [Replit AI](https://replit.com/ai)

## 🎮 [Play Now on Replit!](https://reactigotchi-erinmikail.replit.app/)

## ✨ Features

- **Virtual Pet Care** - Feed, clean, and play with your alien (stats decay over time)
- **Mini-Game** - "Click the Books! Avoid the Worms!" with progressive difficulty
- **Global Leaderboard** - Top 10 high scores with PostgreSQL persistence
- **Visual Feedback** - Animations, emojis, and mood indicators

## 🛠️ Tech Stack

### Frontend
- **React** ^18.2.0 - UI library
- **Vite** ^5.0.0 - Build tool and dev server
- **TypeScript** ^5.2.2 - Type safety (partial support)

### Backend
- **Express** ^5.1.0 - REST API server
- **Node.js** - Runtime environment
- **CORS** ^2.8.5 - Cross-origin resource sharing
- **WebSocket (ws)** ^8.18.3 - Real-time communication (available for future features)

### Database
- **PostgreSQL** - Database (hosted on Neon)
- **Drizzle ORM** ^0.44.7 - Type-safe database toolkit
- **@neondatabase/serverless** ^1.0.2 - Neon PostgreSQL driver

## 📦 Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or compatible package manager
- PostgreSQL database (Neon recommended)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Reactigotchi.git
   cd Reactigotchi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@host/database
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development servers**
   ```bash
   npm start
   ```
   
   This runs both the Vite dev server (frontend) and Express API server (backend) concurrently.

## 🚀 Development

### Available Scripts

- **`npm start`** - Runs both frontend and backend concurrently
- **`npm run dev`** - Starts Vite dev server only (port varies)
- **`npm run server`** - Starts Express API server only (port 3000)
- **`npm run build`** - Creates production build
- **`npm run preview`** - Previews production build
- **`npm run db:push`** - Pushes database schema changes to Neon

### Project Structure

```
Reactigotchi/
├── src/                    # React frontend
│   ├── App.jsx            # Main app component
│   ├── Tamagotchi.jsx     # Core game logic and state
│   ├── AlienCanvas.jsx    # Alien rendering and animations
│   ├── GameUI.jsx         # Stats display and action buttons
│   ├── MiniGame.jsx       # Click game implementation
│   ├── Scoreboard.jsx     # Leaderboard display and submission
│   └── *.css              # Component styles
├── server/                 # Express backend
│   ├── index.js           # API routes and server setup
│   └── db.js              # Database connection
├── shared/                 # Shared code
│   └── schema.js          # Drizzle ORM schema
├── drizzle.config.ts      # Drizzle configuration
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
└── README.md              # You are here!
```

## 🎯 Game Mechanics

**Stats** decay every 5 seconds. **Feed** (+25 hunger), **Clean** (restores cleanliness), and **Play** (opens mini-game) to keep your alien happy!

**Mini-Game**: Click 📚 books (+1 point), avoid 🪱 worms (+1 strike). 3 strikes = game over. Score converts to happiness boost (×5).

**Leaderboard**: Top 10 scores. Submit 3-letter initials when you qualify.

## 🔌 API Endpoints

- `GET /api/highscores` - Top 10 scores
- `POST /api/highscores` - Submit score (requires `initials`, `score`, optional `email`)
- `GET /api/check-highscore/:score` - Check if score qualifies for top 10

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs by opening an issue
- Suggest new features or improvements
- Submit pull requests with enhancements

## 📝 License

This project is open source and available under the ISC License.

## 🙏 Acknowledgments

- Initially built with [Replit AI](https://replit.com/ai)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Database powered by [Neon](https://neon.tech/) and [Drizzle ORM](https://orm.drizzle.team/)
- Hosted on [Replit](https://replit.com/)
- Inspired by the classic Tamagotchi virtual pets

---

**Made with ❤️ for learning and fun!**
