import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Play, Trophy } from 'lucide-react';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
}

export default function GameModal({ isOpen, onClose }: GameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const gameState = useRef({
    player: { x: 175, y: 460, width: 34, height: 60, speed: 6 },
    traffic: [] as Car[],
    keys: { ArrowLeft: false, ArrowRight: false, a: false, d: false },
    score: 0,
    speedFactor: 1,
    lastSpawn: 0,
    animId: 0,
    roadOffset: 0,
  });

  const lanes = [60, 140, 220, 300];

  const startGame = () => {
    setGameOver(false);
    setIsPlaying(true);
    setScore(0);
    gameState.current.score = 0;
    gameState.current.speedFactor = 1;
    gameState.current.traffic = [];
    gameState.current.player.x = 180;
    gameState.current.lastSpawn = performance.now();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (['ArrowLeft', 'ArrowRight', 'a', 'd', 'A', 'D'].includes(e.key)) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') gameState.current.keys.ArrowLeft = true;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') gameState.current.keys.ArrowRight = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') gameState.current.keys.ArrowLeft = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') gameState.current.keys.ArrowRight = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(gameState.current.animId);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const loop = (timestamp: number) => {
      if (!running) return;

      // Update game
      if (isPlaying && !gameOver) {
        // Player steering
        const p = gameState.current.player;
        if (gameState.current.keys.ArrowLeft && p.x > 35) {
          p.x -= p.speed;
        }
        if (gameState.current.keys.ArrowRight && p.x < canvas.width - 35 - p.width) {
          p.x += p.speed;
        }

        // Road speed & score
        gameState.current.score += 1;
        if (gameState.current.score % 6 === 0) {
          setScore(Math.floor(gameState.current.score / 6));
        }

        gameState.current.speedFactor = 1 + (gameState.current.score / 2000);
        gameState.current.roadOffset = (gameState.current.roadOffset + 8 * gameState.current.speedFactor) % 40;

        // Fair-Spawn Director: ensure at least one lane is guaranteed safe
        if (timestamp - gameState.current.lastSpawn > Math.max(700, 1500 - gameState.current.speedFactor * 150)) {
          gameState.current.lastSpawn = timestamp;

          // Pick 1 to 2 random lanes to spawn oncoming vehicles, leaving at least 2 lanes open
          const availableLanes = [...lanes];
          const chosenLaneIdx = Math.floor(Math.random() * availableLanes.length);
          const chosenLane = availableLanes.splice(chosenLaneIdx, 1)[0];

          gameState.current.traffic.push({
            x: chosenLane - 17,
            y: -80,
            width: 34,
            height: 58,
            speed: 4 + Math.random() * 2 * gameState.current.speedFactor,
            color: Math.random() > 0.5 ? '#6E6B66' : '#E4E1DA',
          });

          // Occasionally spawn 2nd car but guarantee exit route
          if (Math.random() > 0.65 && availableLanes.length > 1) {
            const secondLaneIdx = Math.floor(Math.random() * (availableLanes.length - 1));
            const secondLane = availableLanes[secondLaneIdx];
            gameState.current.traffic.push({
              x: secondLane - 17,
              y: -140,
              width: 34,
              height: 58,
              speed: 4 + Math.random() * 2 * gameState.current.speedFactor,
              color: '#6E6B66',
            });
          }
        }

        // Move traffic & check collision
        for (let i = gameState.current.traffic.length - 1; i >= 0; i--) {
          const car = gameState.current.traffic[i];
          car.y += car.speed + (3 * gameState.current.speedFactor);

          // AABB Collision test
          const pLeft = p.x + 4;
          const pRight = p.x + p.width - 4;
          const pTop = p.y + 4;
          const pBottom = p.y + p.height - 4;

          const cLeft = car.x + 4;
          const cRight = car.x + car.width - 4;
          const cTop = car.y + 4;
          const cBottom = car.y + car.height - 4;

          if (pRight > cLeft && pLeft < cRight && pBottom > cTop && pTop < cBottom) {
            setGameOver(true);
            setIsPlaying(false);
            const finalScore = Math.floor(gameState.current.score / 6);
            setHighScore((prev) => Math.max(prev, finalScore));
          }

          if (car.y > canvas.height + 100) {
            gameState.current.traffic.splice(i, 1);
          }
        }
      }

      // RENDER
      ctx.fillStyle = '#111110';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Road boundaries
      ctx.strokeStyle = 'rgba(247, 246, 243, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(25, 0);
      ctx.lineTo(25, canvas.height);
      ctx.moveTo(canvas.width - 25, 0);
      ctx.lineTo(canvas.width - 25, canvas.height);
      ctx.stroke();

      // Dashed lane dividers
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -gameState.current.roadOffset;
      ctx.strokeStyle = 'rgba(247, 246, 243, 0.12)';
      lanes.slice(0, 3).forEach((lane) => {
        ctx.beginPath();
        ctx.moveTo(lane + 40, 0);
        ctx.lineTo(lane + 40, canvas.height);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Draw Oncoming Traffic
      gameState.current.traffic.forEach((car) => {
        ctx.fillStyle = car.color;
        ctx.beginPath();
        ctx.roundRect(car.x, car.y, car.width, car.height, 4);
        ctx.fill();

        // Headlights
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(car.x + 4, car.y + car.height - 4, 6, 3);
        ctx.fillRect(car.x + car.width - 10, car.y + car.height - 4, 6, 3);
      });

      // Draw Player Car (Accent color)
      const p = gameState.current.player;
      ctx.fillStyle = '#FF4D00';
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.width, p.height, 5);
      ctx.fill();

      // Taillights
      ctx.fillStyle = '#FFD000';
      ctx.fillRect(p.x + 4, p.y, 6, 4);
      ctx.fillRect(p.x + p.width - 10, p.y, 6, 4);

      // Cockpit / roof detail
      ctx.fillStyle = '#111110';
      ctx.fillRect(p.x + 6, p.y + 16, p.width - 12, 22);

      gameState.current.animId = requestAnimationFrame(loop);
    };

    gameState.current.animId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(gameState.current.animId);
    };
  }, [isOpen, isPlaying, gameOver]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[440px] bg-[#111110] border border-hairline-dark rounded-[8px] p-6 text-[#F7F6F3] shadow-2xl flex flex-col items-center"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between border-b border-hairline-dark pb-4 mb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF4D00] block">
                01 // PLAYABLE ENGINE
              </span>
              <h3 className="font-serif text-2xl">Highway Rush</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#6E6B66] hover:text-[#F7F6F3] transition-colors"
              aria-label="Close Arcade Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats bar */}
          <div className="w-full flex items-center justify-between font-mono text-xs text-[#6E6B66] mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="text-[#F7F6F3] tabular-nums font-medium text-sm">{score}m</span>
              <span>DISTANCE</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#FF4D00]">
              <Trophy className="w-3.5 h-3.5" />
              <span className="tabular-nums font-mono">{highScore}m</span>
            </div>
          </div>

          {/* Canvas Container with invisible mobile touch steer zones */}
          <div className="relative w-[360px] h-[520px] rounded-[6px] overflow-hidden border border-hairline-dark bg-[#111110]">
            <canvas
              ref={canvasRef}
              width={360}
              height={520}
              className="w-full h-full block"
            />

            {/* Invisible touch steer overlay for mobile */}
            <div className="absolute inset-0 flex pointer-events-auto">
              <div
                onTouchStart={() => { gameState.current.keys.ArrowLeft = true; }}
                onTouchEnd={() => { gameState.current.keys.ArrowLeft = false; }}
                className="w-1/2 h-full opacity-0 active:opacity-10 bg-white/5 cursor-pointer select-none"
              />
              <div
                onTouchStart={() => { gameState.current.keys.ArrowRight = true; }}
                onTouchEnd={() => { gameState.current.keys.ArrowRight = false; }}
                className="w-1/2 h-full opacity-0 active:opacity-10 bg-white/5 cursor-pointer select-none"
              />
            </div>

            {/* Overlay if not playing */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-[#111110]/80 flex flex-col items-center justify-center p-6 text-center">
                {gameOver ? (
                  <>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF4D00] mb-1">
                      COLLISION DETECTED
                    </span>
                    <h4 className="font-serif text-3xl mb-2">Game Over</h4>
                    <p className="font-mono text-xs text-[#6E6B66] mb-6">
                      Distance: <span className="text-[#F7F6F3] font-bold">{score}m</span>
                    </p>
                    <button
                      type="button"
                      onClick={startGame}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D00] text-[#F7F6F3] font-mono text-xs uppercase tracking-[0.14em] font-medium hover:bg-white hover:text-[#111110] transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </button>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6E6B66] mb-2">
                      60FPS CANVAS ENGINE
                    </span>
                    <h4 className="font-serif text-3xl mb-3">Dodge Oncoming Traffic</h4>
                    <p className="font-mono text-[11px] text-[#6E6B66] max-w-[260px] mb-6 leading-relaxed">
                      Use [← / →] keys or tap screen sides. Guaranteed escape route director active.
                    </p>
                    <button
                      type="button"
                      onClick={startGame}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D00] text-[#F7F6F3] font-mono text-xs uppercase tracking-[0.14em] font-medium hover:bg-white hover:text-[#111110] transition-colors"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Launch Engine
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6B66]">
            Arrows or A/D to steer · Tap sides on mobile
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
