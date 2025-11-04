import { useState, useEffect, useRef } from 'react';
import AlienCanvas from './AlienCanvas';
import GameUI from './GameUI';
import MiniGame from './MiniGame';
import './Tamagotchi.css';

const MAX_STAT = 100;
const MIN_STAT = 0;
const CRITICAL_THRESHOLD = 20;
const DECAY_INTERVAL = 5000;
const HUNGER_DECAY = 2;
const HAPPINESS_DECAY = 1.5;
const CLEANLINESS_DECAY = 1;

export default function Tamagotchi() {
  const [hunger, setHunger] = useState(80);
  const [happiness, setHappiness] = useState(80);
  const [cleanliness, setCleanliness] = useState(80);
  const [isJumping, setIsJumping] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [hasPoop, setHasPoop] = useState(false);
  const [feedingIcons, setFeedingIcons] = useState([]);

  const isCritical = hunger < CRITICAL_THRESHOLD || 
                     happiness < CRITICAL_THRESHOLD || 
                     cleanliness < CRITICAL_THRESHOLD;

  useEffect(() => {
    const decayInterval = setInterval(() => {
      setHunger(prev => Math.max(MIN_STAT, prev - HUNGER_DECAY));
      setHappiness(prev => Math.max(MIN_STAT, prev - HAPPINESS_DECAY));
      setCleanliness(prev => {
        const newValue = Math.max(MIN_STAT, prev - CLEANLINESS_DECAY);
        if (newValue < 40 && Math.random() < 0.3) {
          setHasPoop(true);
        }
        return newValue;
      });
    }, DECAY_INTERVAL);

    return () => clearInterval(decayInterval);
  }, []);

  const handleFeed = () => {
    setHunger(Math.min(MAX_STAT, hunger + 25));
    setHappiness(Math.min(MAX_STAT, happiness + 5));
    
    const icon = Math.random() > 0.5 ? '⚛️' : 'JS';
    const newIcon = {
      id: Date.now(),
      icon: icon,
      x: Math.random() * 60 + 20,
      y: 50
    };
    setFeedingIcons(prev => [...prev, newIcon]);
    
    setTimeout(() => {
      setFeedingIcons(prev => prev.filter(i => i.id !== newIcon.id));
    }, 1500);
  };

  const handleClean = () => {
    setCleanliness(MAX_STAT);
    setHasPoop(false);
    setHappiness(Math.min(MAX_STAT, happiness + 10));
  };

  const handlePlay = () => {
    setShowMiniGame(true);
  };

  const handleGameEnd = (score) => {
    const happinessBoost = score * 5;
    setHappiness(Math.min(MAX_STAT, happiness + happinessBoost));
    setShowMiniGame(false);
  };

  const handleAlienClick = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
  };

  return (
    <div className="tamagotchi-container">
      <h1 className="title">Reactigotchi!</h1>
      
      {showMiniGame ? (
        <MiniGame onGameEnd={handleGameEnd} />
      ) : (
        <>
          <div className="alien-area">
            <AlienCanvas 
              isSad={isCritical}
              isJumping={isJumping}
              hasBrainRot={isCritical}
              hasPoop={hasPoop}
              onClick={handleAlienClick}
            />
            {feedingIcons.map(item => (
              <div
                key={item.id}
                className="feeding-icon"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`
                }}
              >
                {item.icon}
              </div>
            ))}
          </div>
          
          <GameUI
            hunger={hunger}
            happiness={happiness}
            cleanliness={cleanliness}
            onFeed={handleFeed}
            onClean={handleClean}
            onPlay={handlePlay}
          />
        </>
      )}
    </div>
  );
}
