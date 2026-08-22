'use client';
import { useState } from 'react';
import Modal from './components/Modal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>This is modal content.</p>
      </Modal>
    </div>
  );
}