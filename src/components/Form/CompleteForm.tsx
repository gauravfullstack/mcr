import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import type {
  FormData,
  FormErrors,
} from './types/form.type';

import FormField from './components/FormField';
import MessageFields from './components/MessageFields';
import FileUpload from './components/FileUpload';
import SubmitButton from './components/SubmitButton';

import {
  validateField,
  validateForm,
} from './utils/validation';

import {
  createFormData,
  getInitialFormData,
} from './utils/form.utils';


function CompleteForm() {
  const [formData, setFormData] =
    useState<FormData>(getInitialFormData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);


  // -----------------------------
  // Input change
  // -----------------------------

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };


  // -----------------------------
  // File change
  // -----------------------------

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file =
      e.target.files?.[0] ?? null;

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };


  // -----------------------------
  // Add message
  // -----------------------------

  const handleAddMessage = (): void => {
    setFormData((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        '',
      ],
    }));
  };


  // -----------------------------
  // Change message
  // -----------------------------

  const handleMessageChange = (
    index: number,
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      messages: prev.messages.map(
        (message, i) =>
          i === index
            ? value
            : message
      ),
    }));
  };


  // -----------------------------
  // Remove message
  // -----------------------------

  const handleRemoveMessage = (
    index: number
  ): void => {
    setFormData((prev) => ({
      ...prev,
      messages: prev.messages.filter(
        (_, i) => i !== index
      ),
    }));
  };


  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const validationErrors =
      validateForm(
        formData.name,
        formData.email
      );

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      return;
    }

    setIsSubmitting(true);

    const fd =
      createFormData(formData);

    try {
      const response = await fetch(
        '/api/contact',
        {
          method: 'POST',
          body: fd,
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to submit form'
        );
      }

      alert('Form submitted!');

      setFormData(
        getInitialFormData()
      );

      setErrors({});
    } catch (error) {
      alert(
        'Error submitting form'
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  // -----------------------------
  // Render
  // -----------------------------

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>

      <FormField
        name="name"
        value={formData.name}
        placeholder="Name"
        error={errors.name}
        onChange={handleChange}
      />

      <FormField
        name="email"
        value={formData.email}
        placeholder="Email"
        error={errors.email}
        onChange={handleChange}
      />

      <MessageFields
        messages={formData.messages}
        onChange={handleMessageChange}
        onAdd={handleAddMessage}
        onRemove={handleRemoveMessage}
      />

      <FileUpload
        file={formData.file}
        onChange={handleFileChange}
      />

      <SubmitButton
        isSubmitting={isSubmitting}
      />
    </form>
  );
}

export default CompleteForm;