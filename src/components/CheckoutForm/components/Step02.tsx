import type { FormData } from "./../Checkoutform";

type Props = {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function Step02({ data, onChange, onNext, onBack }: Props) {
  const isValid =
    data.fathername && data.fatheremail && data.fatherphone;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "20%" }}>
      <input
        placeholder="Enter Father's Name"
        value={data.fathername}
        onChange={(e) => onChange("fathername", e.target.value)}
      />
      <input
        placeholder="Enter Father's Email"
        value={data.fatheremail}
        onChange={(e) => onChange("fatheremail", e.target.value)}
      />
      <input
        placeholder="Enter Father's Phone"
        value={data.fatherphone}
        onChange={(e) => onChange("fatherphone", e.target.value)}
      />

      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext} disabled={!isValid}>
          Next
        </button>
      </div>
    </div>
  );
}