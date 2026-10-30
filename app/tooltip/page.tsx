'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

type TooltipPosition = {
  left: number;
  top: number;
};

export default function TooltipPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      const target = targetRef.current?.getBoundingClientRect();
      const tooltip = tooltipRef.current?.getBoundingClientRect();
      if (!target || !tooltip) return;

      const spaceAbove = target.top;
      const spaceBelow = window.innerHeight - target.bottom;
      const showAbove =
        spaceAbove >= tooltip.height + 8 || spaceAbove > spaceBelow;

      setPosition({
        left: target.left + target.width / 2,
        top: showAbove
          ? target.top - tooltip.height - 8
          : target.bottom + 8,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isVisible]);

  const showTooltip = () => {
    setPosition(null);
    setIsVisible(true);
  };

  return (
    <main className={styles.container}>
      <h1>Tooltip</h1>
      <button
        ref={targetRef}
        type="button"
        aria-describedby={isVisible ? 'example-tooltip' : undefined}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={showTooltip}
        onBlur={() => setIsVisible(false)}
      >
        Hover or focus me
      </button>
      {isVisible && (
        <span
          ref={tooltipRef}
          id="example-tooltip"
          className={styles.tooltip}
          role="tooltip"
          style={
            position
              ? { left: position.left, top: position.top, visibility: 'visible' }
              : { visibility: 'hidden' }
          }
        >
          This tooltip moves to the side with more space.
        </span>
      )}
    </main>
  );
}
