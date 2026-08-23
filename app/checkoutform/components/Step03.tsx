import type { FormData } from "../page";
import styles from "../Form.module.css";

type Props = {
  data: FormData;
  onBack: () => void;
  onSubmit: () => void;
};

const isValidName = (value: string) => {
  return /^[a-zA-Z\s]+$/.test(value.trim());
};

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

const isValidPhone = (value: string) => {
  return /^\d{10}$/.test(value.trim());
};

export default function Step03({
  data,
  onBack,
  onSubmit,
}: Props) {
  const isValid =
    isValidName(data.name) &&
    isValidEmail(data.email) &&
    isValidPhone(data.phone) &&
    isValidName(data.fathername) &&
    isValidEmail(data.fatheremail) &&
    isValidPhone(data.fatherphone);

  return (
    <div className={styles.summary}>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>

      <p>Father Name: {data.fathername}</p>
      <p>Father Email: {data.fatheremail}</p>
      <p>Father Phone: {data.fatherphone}</p>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={onBack}
        >
          Back
        </button>

        <button
          className={styles.button}
          onClick={onSubmit}
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
}