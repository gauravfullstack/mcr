import { useState } from "react";
import Step01 from "./components/Step01";
import Step02 from "./components/Step02";
import Step03 from "./components/Step03";
import { useMultiStepForm } from "./hooks/useMultiStepForm";

export type FormData = {
  name: string;
  email: string;
  phone: string;
  fathername: string;
  fatheremail: string;
  fatherphone: string;
};

export default function CheckoutForm() {
  const { step, next, back } = useMultiStepForm(3);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    fathername: "",
    fatheremail: "",
    fatherphone: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("FINAL DATA:", formData);
    alert("Form submitted!");
  };

  return (
    <div>
      <h3>Checkout Form</h3>

      {step === 1 && (
        <Step01 data={formData} onChange={handleChange} onNext={next} />
      )}

      {step === 2 && (
        <Step02
          data={formData}
          onChange={handleChange}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <Step03 data={formData} onBack={back} onSubmit={handleSubmit} />
      )}
    </div>
  );
}