export interface FormData {
  name: string;
  email: string;
  messages: string[];
  file: File | null;
}

export interface FormErrors {
  name?: string;
  email?: string;
}