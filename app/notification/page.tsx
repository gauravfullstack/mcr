'use client';
import { useToast } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';

export default function App() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <div style={{ padding: '40px' }}>
      <h2>Toast System</h2>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => addToast('Saved successfully!', 'success')}>
          Success
        </button>
        <button onClick={() => addToast('Something went wrong.', 'error')}>
          Error
        </button>
        <button onClick={() => addToast('New update available.', 'info')}>
          Info
        </button>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}