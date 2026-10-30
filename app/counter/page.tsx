
'use client';

import { useState } from 'react';
import './Counter.css';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const handleIncrement = () => {
    setCount((prev) => prev + step);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - step);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h2>Counter App</h2>

      <div className="counter-value">{count}</div>

      <div className="counter-actions">
        <button onClick={handleDecrement}>- Decrement</button>
        <button onClick={handleIncrement}>+ Increment</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="counter-step">
        <label htmlFor="step">Step Value:</label>
        <input
          id="step"
          type="number"
          min="1"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
