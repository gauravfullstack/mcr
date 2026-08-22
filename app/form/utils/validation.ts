import type { FormErrors } from '../types/form.type';

export const validateField = (
  name: string,
  value: string
): string => {
  if (name === 'name' && !value.trim()) {
    return 'Name required';
  }

  if (name === 'email' && !value.includes('@')) {
    return 'Valid email required';
  }

  return '';
};

export const validateForm = (
  name: string,
  email: string
): FormErrors => {
  const errors: FormErrors = {};

  const nameError = validateField('name', name);
  const emailError = validateField('email', email);

  if (nameError) {
    errors.name = nameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  return errors;
};