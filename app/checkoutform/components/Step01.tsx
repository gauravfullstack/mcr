import { useState } from "react";
import type { FormData } from "../page";
import styles from "../Form.module.css";

type Props = {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
};

const validateName = (value: string) => {
  if (!value.trim()) {
    return "Name is required";
  }

  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return "Name can contain characters only";
  }

  return "";
};

const validateEmail = (value: string) => {
  if (!value.trim()) {
    return "Email is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email address";
  }

  return "";
};

const validatePhone = (value: string) => {
  if (!value.trim()) {
    return "Phone number is required";
  }

  if (!/^\d{10}$/.test(value)) {
    return "Phone number must contain 10 digits";
  }

  return "";
};

export default function Step01({
  data,
  onChange,
  onNext,
}: Props) {
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const nameError = validateName(data.name);
  const emailError = validateEmail(data.email);
  const phoneError = validatePhone(data.phone);

  const isValid =
    !nameError &&
    !emailError &&
    !phoneError;

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  return (
    <div className={styles.form}>
      {/* Name */}
      <div className={styles.field}>
        <input
          className={`${styles.input} ${
            touched.name && nameError
              ? styles.inputError
              : ""
          }`}
          placeholder="Enter Your Name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
        />

        {touched.name && nameError && (
          <span className={styles.error}>
            {nameError}
          </span>
        )}
      </div>

      {/* Email */}
      <div className={styles.field}>
        <input
          className={`${styles.input} ${
            touched.email && emailError
              ? styles.inputError
              : ""
          }`}
          placeholder="Enter Your Email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />

        {touched.email && emailError && (
          <span className={styles.error}>
            {emailError}
          </span>
        )}
      </div>

      {/* Phone */}
      <div className={styles.field}>
        <input
          className={`${styles.input} ${
            touched.phone && phoneError
              ? styles.inputError
              : ""
          }`}
          placeholder="Enter Your Phone"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
        />

        {touched.phone && phoneError && (
          <span className={styles.error}>
            {phoneError}
          </span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={onNext}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </div>
  );
}