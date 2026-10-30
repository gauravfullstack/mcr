'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimerPage() {
  const [duration, setDuration] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setRemaining((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (remaining === 0) setIsRunning(false);
  }, [remaining]);

  const startOrResume = () => {
    if (remaining === 0) setRemaining(duration);
    setHasStarted(true);
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setRemaining(duration);
  };

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');

  return (
    <main style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
      <h1>Countdown Timer</h1>
      <p style={{ fontSize: 48, margin: '16px 0' }}>
        {minutes}:{seconds}
      </p>
      <label>
        Duration (seconds){' '}
        <input
          type="number"
          min="1"
          value={duration}
          disabled={isRunning}
          onChange={(event) => {
            const value = Math.max(1, Number(event.target.value) || 1);
            setDuration(value);
            setRemaining(value);
            setHasStarted(false);
          }}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
        {!isRunning ? (
          <button type="button" onClick={startOrResume}>
            {hasStarted && remaining > 0 ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button type="button" onClick={() => setIsRunning(false)}>
            Pause
          </button>
        )}
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </main>
  );
}
