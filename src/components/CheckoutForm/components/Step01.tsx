import type { FormData } from "./../Checkoutform";

type Props = {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
};

export default function Step01({ data, onChange, onNext }: Props) {
  const isValid = data.name && data.email && data.phone;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "20%" }}>
      <input
        placeholder="Enter Your Name"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <input
        placeholder="Enter Your Email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <input
        placeholder="Enter Your Phone"
        value={data.phone}
        onChange={(e) => onChange("phone", e.target.value)}
      />

      <button onClick={onNext} disabled={!isValid}>
        Next
      </button>
    </div>
  );
}