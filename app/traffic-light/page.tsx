'use client';

import { useEffect, useState } from 'react';
import styles from './TrafficLight.module.css';

const lights = ['red', 'green', 'yellow'] as const;

export default function TrafficLightPage() {
  const [activeLight, setActiveLight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLight((current) => (current + 1) % lights.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className={styles.container}>
      <h1>Traffic Light</h1>
      <div className={styles.signal} aria-label={`Current light: ${lights[activeLight]}`}>
        {lights.map((light, index) => (
          <span
            key={light}
            className={`${styles.light} ${styles[light]} ${
              activeLight === index ? styles.active : ''
            }`}
          />
        ))}
      </div>
    </main>
  );
}
