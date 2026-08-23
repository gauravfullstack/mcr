import { useState } from "react";
import type { FormData } from "../page";
import styles from "../Form.module.css";

type Props = {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const validateName = (value: string) => {
  if (!value.trim()) {
    return "Father's name is required";
  }

  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return "Name can contain characters only";
  }

  return "";
};

const validateEmail = (value: string) => {
  if (!value.trim()) {
    return "Father's email is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email address";
  }

  return "";
};

const validatePhone = (value: string) => {
  if (!value.trim()) {
    return "Father's phone number is required";
  }

  if (!/^\d{10}$/.test(value)) {
    return "Phone number must contain 10 digits";
  }

  return "";
};

export default function Step02({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [touched, setTouched] = useState({
    fathername: false,
    fatheremail: false,
    fatherphone: false,
  });

  const nameError = validateName(data.fathername);
  const emailError = validateEmail(data.fatheremail);
  const phoneError = validatePhone(data.fatherphone);

  const isValid =
    !nameError &&
    !emailError &&
    !phoneError;

  const handleChange = (
    field: keyof typeof touched,
    value: string
  ) => {
    onChange(field, value);

    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  return (
    <div className={styles.form}>
      {/* Father's Name */}
      <div className={styles.field}>
        <input
          className={`${styles.input} ${
            touched.fathername && nameError
              ? styles.inputError
              : ""
          }`}
          placeholder="Enter Father's Name"
          value={data.fathername}
          onChange={(e) =>
            handleChange("fathername", e.target.value)
          }
        />

        {touched.fathername && nameError && (
          <span className={styles.error}>
            {nameError}
          </span>
        )}
      </div>

      {/* Father's Email */}
      <div className={styles.field}>
        <input
          className={`${styles.input} ${
            touched.fatheremail && emailError
              ? styles.inputError
              : ""
          }`}
          placeholder="Enter Father's Email"
          value={data.fatheremail}
          onChange={(e) =>
            handleChange("fatheremail", e.target.value)
          }
        />

        {touched.fatheremail && emailError && (
          <span className={styles.error}>
            {emailError}
          </span>
        )}
      </div>

      {/* Father's Phone */}
      <div className={styles.field}>
        <input
          className={`${styles.input} ${
            touched.fatherphone && phoneError
              ? styles.inputError
              : ""
          }`}
          placeholder="Enter Father's Phone"
          value={data.fatherphone}
          onChange={(e) =>
            handleChange("fatherphone", e.target.value)
          }
        />

        {touched.fatherphone && phoneError && (
          <span className={styles.error}>
            {phoneError}
          </span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={onBack}
        >
          Back
        </button>

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