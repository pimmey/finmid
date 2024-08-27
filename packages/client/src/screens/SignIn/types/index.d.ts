export type FormValues = {
  email: string;
  password: string;
};

type FormField<T> = {
  id: keyof T;
  type: 'text' | 'password';
  label: string;
};

type ErrorBody = {
  error: string;
  message: string;
};

export type MutationErrorData = {
  body: ErrorBody;
};
