import type { FormData } from "../page";

type Props = {
  data: FormData;
  onBack: () => void;
  onSubmit: () => void;
};

export default function Step03({ data, onBack, onSubmit }: Props) {
  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>

      <p>Father Name: {data.fathername}</p>
      <p>Father Email: {data.fatheremail}</p>
      <p>Father Phone: {data.fatherphone}</p>

      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}