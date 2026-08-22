'use client';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import { Toast as ToastType } from '../hooks/useToast';
import styles from './Toast.module.css';

type Props = {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: Props) {
  return createPortal(
    <div className={styles.container}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  );
}