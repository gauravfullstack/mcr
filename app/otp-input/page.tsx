'use client';

import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';

const OTP_LENGTH = 6;

export default function OtpInputPage() {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [submittedOtp, setSubmittedOtp] = useState('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (digits.every(Boolean)) {
      setSubmittedOtp(digits.join(''));
    }
  }, [digits]);

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const digit = event.target.value.replace(/\D/g, '').slice(-1);
    setDigits((current) =>
      current.map((value, currentIndex) =>
        currentIndex === index ? digit : value,
      ),
    );
    setSubmittedOtp('');

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>Enter OTP</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            autoFocus={index === 0}
            aria-label={`OTP digit ${index + 1}`}
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            style={{ width: 40, padding: 8, textAlign: 'center' }}
          />
        ))}
      </div>
      {submittedOtp && <p role="status">OTP submitted: {submittedOtp}</p>}
    </main>
  );
}
