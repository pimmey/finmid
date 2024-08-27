import { UnauthorizedError } from '~/data/__generated__';

export type FormValues = {
  email: string;
  password: string;
};

type FormField<T> = {
  id: keyof T;
  type: 'text' | 'password';
  label: string;
};

export type MutationErrorData = {
  body: UnauthorizedError;
};
