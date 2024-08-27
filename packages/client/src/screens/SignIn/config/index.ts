import { object, string } from 'yup';

import { FormField, FormValues } from '../types';

export const FIELDS: FormField<FormValues>[] = [
  { id: 'email', type: 'text', label: 'Email' },
  { id: 'password', type: 'password', label: 'Password' },
];

export const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export const GENERIC_AUTH_ERROR_MESSAGE =
  'Something went wrong logging you in 🥲';
