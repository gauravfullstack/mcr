'use client';
import styles from './Toast.module.css';
import { Toast as ToastType } from '../hooks/useToast';

type Props = {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export default function Toast({ toast, onRemove }: Props) {
  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <span>{toast.message}</span>
      <button
        className={styles.closeBtn}
        onClick={() => onRemove(toast.id)}
      >
        ✕
      </button>
    </div>
  );
}