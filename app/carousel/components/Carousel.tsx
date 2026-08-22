'use client';
import { useState } from 'react';
import styles from './Carousel.module.css';

const slides = [
  { id: 1, label: 'Slide 1', bg: '#1976d2' },
  { id: 2, label: 'Slide 2', bg: '#388e3c' },
  { id: 3, label: 'Slide 3', bg: '#f57c00' },
  { id: 4, label: 'Slide 4', bg: '#c62828' },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrent(prev => prev + 1);
  };

  return (
    <div className={styles.container}>

      {/* Slide */}
      <div
        className={styles.slide}
        style={{ background: slides[current].bg }}
      >
        {slides[current].label}
      </div>

      {/* Controls */}
      <div className={styles.controls}>

        {/* Prev */}
        <button
          className={styles.btn}
          onClick={handlePrev}
          disabled={current === 0}
        >
          ← Prev
        </button>

        {/* Dots */}
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${current === index ? styles.activeDot : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

        {/* Next */}
        <button
          className={styles.btn}
          onClick={handleNext}
          disabled={current === slides.length - 1}
        >
          Next →
        </button>

      </div>

      {/* Counter */}
      <p className={styles.counter} style={{ textAlign: 'center', marginTop: '8px' }}>
        {current + 1} / {slides.length}
      </p>

    </div>
  );
}