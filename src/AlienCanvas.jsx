import { useEffect, useRef } from 'react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

export default function AlienCanvas({ isSad, isJumping, hasBrainRot, hasPoop, onClick }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let jumpOffset = 0;
    let blinkCounter = 0;
    let isBlinking = false;

    const drawPixel = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * 8, y * 8, 8, 8);
    };

    const drawAlien = (offsetY = 0) => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      const centerX = 25;
      const centerY = 20 + offsetY;
      
      const bodyColor = '#00ff88';
      const darkColor = '#00aa55';
      const glassesColor = '#333333';
      const eyeColor = isSad ? '#666666' : '#ffffff';
      const pupilColor = '#000000';
      
      drawPixel(centerX, centerY - 8, bodyColor);
      drawPixel(centerX - 1, centerY - 8, bodyColor);
      drawPixel(centerX + 1, centerY - 8, bodyColor);
      
      for (let x = -2; x <= 2; x++) {
        drawPixel(centerX + x, centerY - 7, bodyColor);
        drawPixel(centerX + x, centerY - 6, bodyColor);
      }
      
      for (let x = -3; x <= 3; x++) {
        drawPixel(centerX + x, centerY - 5, bodyColor);
        drawPixel(centerX + x, centerY - 4, bodyColor);
        drawPixel(centerX + x, centerY - 3, bodyColor);
      }
      
      for (let x = -2; x <= 2; x++) {
        drawPixel(centerX + x, centerY - 2, bodyColor);
        drawPixel(centerX + x, centerY - 1, bodyColor);
        drawPixel(centerX + x, centerY, bodyColor);
      }
      
      for (let x = -1; x <= 1; x++) {
        drawPixel(centerX + x, centerY + 1, bodyColor);
      }
      
      drawPixel(centerX - 4, centerY - 6, bodyColor);
      drawPixel(centerX - 5, centerY - 5, bodyColor);
      drawPixel(centerX - 5, centerY - 4, bodyColor);
      
      drawPixel(centerX + 4, centerY - 6, bodyColor);
      drawPixel(centerX + 5, centerY - 5, bodyColor);
      drawPixel(centerX + 5, centerY - 4, bodyColor);
      
      for (let x = -2; x <= 2; x++) {
        drawPixel(centerX + x, centerY - 5, glassesColor);
      }
      drawPixel(centerX - 3, centerY - 5, glassesColor);
      drawPixel(centerX + 3, centerY - 5, glassesColor);
      
      if (!isBlinking) {
        drawPixel(centerX - 2, centerY - 4, eyeColor);
        drawPixel(centerX - 1, centerY - 4, eyeColor);
        drawPixel(centerX + 1, centerY - 4, eyeColor);
        drawPixel(centerX + 2, centerY - 4, eyeColor);
        
        drawPixel(centerX - 1, centerY - 4, pupilColor);
        drawPixel(centerX + 2, centerY - 4, pupilColor);
      }
      
      drawPixel(centerX - 1, centerY - 2, darkColor);
      drawPixel(centerX, centerY - 2, darkColor);
      drawPixel(centerX + 1, centerY - 2, darkColor);
      
      if (isSad) {
        drawPixel(centerX - 1, centerY - 1, darkColor);
        drawPixel(centerX, centerY, darkColor);
        drawPixel(centerX + 1, centerY - 1, darkColor);
      } else {
        drawPixel(centerX - 1, centerY, darkColor);
        drawPixel(centerX, centerY - 1, darkColor);
        drawPixel(centerX + 1, centerY, darkColor);
      }
      
      drawPixel(centerX - 3, centerY + 2, bodyColor);
      drawPixel(centerX - 4, centerY + 3, bodyColor);
      
      drawPixel(centerX + 3, centerY + 2, bodyColor);
      drawPixel(centerX + 4, centerY + 3, bodyColor);
      
      if (hasBrainRot) {
        const rotColors = ['#ff00ff', '#00ffff', '#ffff00'];
        for (let i = 0; i < 3; i++) {
          const angle = (frameRef.current * 0.1 + i * Math.PI * 2 / 3);
          const spiralX = Math.floor(centerX + Math.cos(angle) * 4);
          const spiralY = Math.floor(centerY - 7 + Math.sin(angle) * 2);
          drawPixel(spiralX, spiralY, rotColors[i]);
        }
      }
      
      if (hasPoop) {
        drawPixel(centerX + 6, centerY + 2, '#8B4513');
        drawPixel(centerX + 7, centerY + 1, '#654321');
        drawPixel(centerX + 7, centerY + 2, '#654321');
      }
    };

    const animate = () => {
      frameRef.current++;
      
      if (frameRef.current % 120 === 0) {
        isBlinking = true;
      } else if (frameRef.current % 120 === 10) {
        isBlinking = false;
      }
      
      if (isJumping) {
        const jumpProgress = (frameRef.current % 60) / 60;
        jumpOffset = -Math.sin(jumpProgress * Math.PI) * 40;
      } else {
        jumpOffset = 0;
      }
      
      drawAlien(jumpOffset);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSad, isJumping, hasBrainRot, hasPoop]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onClick={onClick}
      style={{ cursor: 'pointer', imageRendering: 'pixelated' }}
    />
  );
}
