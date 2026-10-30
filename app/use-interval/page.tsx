'use client';

import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

export default function UseIntervalPage() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => setCount((value) => value + 1), isRunning ? 1000 : null);

  return (
    <main>
      <h1>useInterval</h1>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setIsRunning((running) => !running)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </main>
  );
}
