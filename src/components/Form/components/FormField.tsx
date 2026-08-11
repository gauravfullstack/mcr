interface FormFieldProps {
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function FormField({
  name,
  value,
  placeholder,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          borderColor: error ? 'red' : 'gray',
        }}
      />

      {error && (
        <span style={{ color: 'red' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;