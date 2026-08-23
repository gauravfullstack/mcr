"use client";

import { useState } from "react";

export const useMultiStepForm = (maxStep: number) => {
  const [step, setStep] = useState(1);

  const next = () => {
    setStep((prev) => Math.min(prev + 1, maxStep));
  };

  const back = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const goTo = (stepNumber: number) => {
    setStep(stepNumber);
  };

  return {
    step,
    next,
    back,
    goTo,
  };
};