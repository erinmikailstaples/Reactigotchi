import { useState, useEffect, useRef } from 'react';
import './MiniGame.css';

const GAME_DURATION = 15000;
const SPAWN_INTERVAL = 1500;

export default function MiniGame({ onGameEnd }) {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [gameEnded, setGameEnded] = useState(false);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const isBook = Math.random() > 0.4;
      const itemId = nextIdRef.current;
      nextIdRef.current += 1;
      
      const newItem = {
        id: itemId,
        type: isBook ? 'book' : 'worm',
        x: Math.random() * 80,
        y: Math.random() * 60 + 10,
      };
      setItems(prev => [...prev, newItem]);
      
      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== itemId));
      }, 3000);
    }, SPAWN_INTERVAL);

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 0.1;
        if (newTime <= 0) {
          setGameEnded(true);
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (gameEnded) {
      onGameEnd(score);
    }
  }, [gameEnded, score, onGameEnd]);

  const handleItemClick = (item) => {
    if (gameEnded) return;
    
    if (item.type === 'book') {
      setScore(prev => prev + 1);
    } else {
      setScore(prev => Math.max(0, prev - 1));
    }
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <div className="mini-game">
      <div className="game-header">
        <h2>Click the Books! Avoid the Worms!</h2>
        <div className="game-stats">
          <span className="game-score">Score: {score}</span>
          <span className="game-timer">Time: {timeLeft.toFixed(1)}s</span>
        </div>
      </div>
      
      <div className="game-area">
        {items.map(item => (
          <div
            key={item.id}
            className={`game-item ${item.type}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            onClick={() => handleItemClick(item)}
          >
            {item.type === 'book' ? '📚' : '🪱'}
          </div>
        ))}
      </div>
    </div>
  );
}
