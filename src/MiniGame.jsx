import { useState, useEffect, useRef } from 'react';
import './MiniGame.css';

const INITIAL_SPAWN_INTERVAL = 1500;
const MIN_SPAWN_INTERVAL = 400;
const SPEEDUP_RATE = 0.9;

export default function MiniGame({ onGameEnd }) {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(INITIAL_SPAWN_INTERVAL);
  const nextIdRef = useRef(0);
  const spawnIntervalRef = useRef(null);
  const speedupIntervalRef = useRef(null);

  useEffect(() => {
    if (gameEnded) return;

    const spawnItem = () => {
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
    };

    const startSpawning = (interval) => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
      spawnIntervalRef.current = setInterval(spawnItem, interval);
    };

    startSpawning(currentSpeed);

    speedupIntervalRef.current = setInterval(() => {
      setCurrentSpeed(prev => {
        const newSpeed = Math.max(MIN_SPAWN_INTERVAL, prev * SPEEDUP_RATE);
        startSpawning(newSpeed);
        return newSpeed;
      });
    }, 3000);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (speedupIntervalRef.current) clearInterval(speedupIntervalRef.current);
    };
  }, [currentSpeed, gameEnded]);

  useEffect(() => {
    if (strikes >= 3) {
      setGameEnded(true);
    }
  }, [strikes]);

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
      setStrikes(prev => prev + 1);
    }
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <div className="mini-game">
      <div className="game-header">
        <h2>Click the Books! Avoid the Worms!</h2>
        <div className="game-stats">
          <span className="game-score">Score: {score}</span>
          <span className="game-strikes">Strikes: {strikes}/3</span>
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
