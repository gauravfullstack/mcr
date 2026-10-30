'use client';

import { useState } from 'react';
import { usePrevious } from '../hooks/usePrevious';

export default function UsePreviousPage() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <main>
      <h1>usePrevious</h1>
      <p>Current value: {count}</p>
      <p>Previous value: {previousCount ?? 'None'}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increment
      </button>
    </main>
  );
}
