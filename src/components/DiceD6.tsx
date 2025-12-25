import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';

export function DiceD6() {
  const last = useGameStore(s => s.lastDie);
  const prev = useGameStore(s => s.prevDie);
  const roll = useGameStore(s => s.rollDie);
  const [rolling, setRolling] = useState(false);
  const [animNum, setAnimNum] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!rolling) return;
    const t0 = Date.now();
    const int = setInterval(() => {
      setAnimNum(Math.floor(Math.random() * 6) + 1);
      if (Date.now() - t0 > 650) {
        clearInterval(int);
        setRolling(false);
        setAnimNum(undefined);
      }
    }, 60);
    return () => clearInterval(int);
  }, [rolling]);

  return (
    <div className={rolling ? 'dice rolling' : 'dice'}>
      <button
        className="primary"
        onClick={() => {
          setRolling(true);
          roll();
        }}
        disabled={rolling}
      >
        {rolling ? 'Tirando…' : 'Tirar dado (1D6)'}
      </button>
      <div className="dice-result">
        <div className="row wrap" style={{ gap: 12 }}>
          <span className="muted">Anterior:</span>
          <strong className="dice-num">{prev ?? '—'}</strong>
          <span className="muted">Último:</span>
          <strong className="dice-num">{rolling ? (animNum ?? last ?? '—') : (last ?? '—')}</strong>
        </div>
      </div>
    </div>
  );
}
