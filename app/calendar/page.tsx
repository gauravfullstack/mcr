'use client';

import { useState } from 'react';
import styles from './Calendar.module.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const [month, setMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const dates = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const changeMonth = (offset: number) => {
    setMonth(new Date(year, monthIndex + offset, 1));
  };

  return (
    <main className={styles.container}>
      <h1>Calendar</h1>
      <div className={styles.header}>
        <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>
          ←
        </button>
        <h2>
          {month.toLocaleDateString('en', { month: 'long', year: 'numeric' })}
        </h2>
        <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>
          →
        </button>
      </div>

      <div className={styles.grid}>
        {weekdays.map((weekday) => (
          <strong key={weekday}>{weekday}</strong>
        ))}
        {dates.map((date, index) => {
          if (date === null) return <span key={`empty-${index}`} />;

          const isSelected =
            selectedDate?.getFullYear() === year &&
            selectedDate.getMonth() === monthIndex &&
            selectedDate.getDate() === date;

          return (
            <button
              key={date}
              type="button"
              aria-pressed={isSelected}
              className={isSelected ? styles.selected : ''}
              onClick={() => setSelectedDate(new Date(year, monthIndex, date))}
            >
              {date}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <p>
          Selected date: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </main>
  );
}
