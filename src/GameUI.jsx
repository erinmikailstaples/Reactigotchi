import './GameUI.css';

export default function GameUI({ hunger, happiness, cleanliness, onFeed, onClean, onPlay }) {
  const getBarColor = (value) => {
    if (value > 60) return '#00ff88';
    if (value > 30) return '#ffaa00';
    return '#ff3366';
  };

  return (
    <div className="game-ui">
      <div className="stats">
        <div className="stat">
          <label>Hunger</label>
          <div className="stat-bar">
            <div 
              className="stat-fill" 
              style={{ 
                width: `${hunger}%`,
                backgroundColor: getBarColor(hunger)
              }}
            />
          </div>
          <span className="stat-value">{Math.round(hunger)}</span>
        </div>

        <div className="stat">
          <label>Happiness</label>
          <div className="stat-bar">
            <div 
              className="stat-fill" 
              style={{ 
                width: `${happiness}%`,
                backgroundColor: getBarColor(happiness)
              }}
            />
          </div>
          <span className="stat-value">{Math.round(happiness)}</span>
        </div>

        <div className="stat">
          <label>Cleanliness</label>
          <div className="stat-bar">
            <div 
              className="stat-fill" 
              style={{ 
                width: `${cleanliness}%`,
                backgroundColor: getBarColor(cleanliness)
              }}
            />
          </div>
          <span className="stat-value">{Math.round(cleanliness)}</span>
        </div>
      </div>

      <div className="actions">
        <button className="action-btn feed-btn" onClick={onFeed}>
          🍔 Feed
        </button>
        <button className="action-btn clean-btn" onClick={onClean}>
          🧹 Clean
        </button>
        <button className="action-btn play-btn" onClick={onPlay}>
          📚 Play Game
        </button>
      </div>
    </div>
  );
}
