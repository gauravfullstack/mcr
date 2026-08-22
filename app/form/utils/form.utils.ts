import type { FormData as ContactFormData } from '../types/form.type';

export const createFormData = (
  formData: ContactFormData
): globalThis.FormData => {
  const fd = new globalThis.FormData();

  fd.append('name', formData.name);
  fd.append('email', formData.email);
  fd.append(
    'messages',
    JSON.stringify(formData.messages)
  );

  if (formData.file) {
    fd.append('file', formData.file);
  }

  return fd;
};

export const getInitialFormData = (): ContactFormData => ({
  name: '',
  email: '',
  messages: [''],
  file: null,
});