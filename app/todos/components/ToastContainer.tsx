"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Toast as ToastType } from "../hooks/useToast";
import Toast from "./Toast";
import styles from "./Toast.module.css";

type Props = {
  toasts: ToastType[];
  onRemove: (id: string) => void;
};

export default function ToastContainer({ toasts, onRemove }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  );
}
