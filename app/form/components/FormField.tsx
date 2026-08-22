import styles from "./FormField.module.css";

interface FormFieldProps {
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({
  name,
  value,
  placeholder,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormField;