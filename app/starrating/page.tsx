
'use client';

import { useState } from 'react';
import './StarRating.css';

export default function StarRating() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    value: number
  ) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setHover(Math.min(value + 1, 5));
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setHover(Math.max(value - 1, 1));
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setRating(value);
    }
  };

  const activeRating = hover || rating;

  return (
    <div className="star-rating">
      <h2>Rate this product</h2>

      <div className="stars" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            tabIndex={0}
            role="button"
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            aria-pressed={rating === star}
            className={star <= activeRating ? 'star active' : 'star'}
            onMouseEnter={() => setHover(star)}
            onClick={() => setRating(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
          >
            ★
          </span>
        ))}
      </div>

      <p>
        {rating > 0
          ? `Your rating: ${rating} / 5`
          : 'Please select a rating'}
      </p>
    </div>
  );
}
