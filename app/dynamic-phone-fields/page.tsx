'use client';

import { useState } from 'react';
import styles from './DynamicPhoneFields.module.css';

export default function DynamicPhoneFields() {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);

  const updatePhoneNumber = (index: number, value: string) => {
    setPhoneNumbers((numbers) =>
      numbers.map((number, currentIndex) =>
        currentIndex === index ? value : number,
      ),
    );
  };

  const removePhoneNumber = (index: number) => {
    setPhoneNumbers((numbers) =>
      numbers.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  return (
    <main className={styles.container}>
      <h1>Phone Numbers</h1>

      {phoneNumbers.map((phoneNumber, index) => (
        <div className={styles.field} key={index}>
          <label htmlFor={`phone-${index}`}>Phone number {index + 1}</label>
          <input
            id={`phone-${index}`}
            type="tel"
            value={phoneNumber}
            onChange={(event) =>
              updatePhoneNumber(index, event.target.value)
            }
          />
          <button type="button" onClick={() => removePhoneNumber(index)}>
            Remove
          </button>
        </div>
      ))}

      <button
        className={styles.addButton}
        type="button"
        onClick={() => setPhoneNumbers((numbers) => [...numbers, ''])}
      >
        Add phone number
      </button>
    </main>
  );
}
