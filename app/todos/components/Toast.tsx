"use client";

import styles from "./Toast.module.css";
import type { Toast as ToastType } from "../hooks/useToast";

type Props = {
  toast: ToastType;
  onRemove: (id: string) => void;
};

export default function Toast({ toast, onRemove }: Props) {
  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      role={toast.type === "error" ? "alert" : "status"}
    >
      <span>{toast.message}</span>
      <button
        className={styles.closeBtn}
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onRemove(toast.id)}
      >
        ✕
      </button>
    </div>
  );
}
