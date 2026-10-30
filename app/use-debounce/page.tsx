'use client';

import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export default function UseDebouncePage() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  return (
    <main>
      <h1>useDebounce</h1>
      <label>
        Type here:{' '}
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <p>Debounced value: {debouncedValue}</p>
    </main>
  );
}
