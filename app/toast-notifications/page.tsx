'use client';

import ToastContainer from '../todos/components/ToastContainer';
import { useToast } from '../todos/hooks/useToast';

export default function ToastNotificationsPage() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <main style={{ maxWidth: 500, margin: '40px auto' }}>
      <h1>Toast Notifications</h1>
      <button
        type="button"
        onClick={() => addToast('Action completed successfully.', 'success')}
      >
        Success toast
      </button>{' '}
      <button
        type="button"
        onClick={() => addToast('Something went wrong.', 'error')}
      >
        Error toast
      </button>{' '}
      <button
        type="button"
        onClick={() => addToast('Here is some information.', 'info')}
      >
        Info toast
      </button>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </main>
  );
}
