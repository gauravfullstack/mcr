'use client';

import { useLocalStorage } from '../hooks/useLocalStorage';

export default function UseLocalStoragePage() {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <main>
      <h1>useLocalStorage</h1>
      <label>
        Name:{' '}
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <p>Open this page in another tab to see changes sync.</p>
    </main>
  );
}
