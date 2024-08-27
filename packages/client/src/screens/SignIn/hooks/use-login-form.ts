import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
  AuthService,
  PostLoginData,
  PostLoginResponse,
} from '~/data/__generated__';
import { setToken } from '~/utils/token';

import { GENERIC_AUTH_ERROR_MESSAGE, loginSchema } from '../config';
import { FormValues, MutationErrorData } from '../types';

export default function useLoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const { mutate: login } = useMutation<
    PostLoginResponse,
    MutationErrorData,
    PostLoginData
  >({
    mutationFn: AuthService.postLogin,
  });

  const onSubmit: SubmitHandler<FormValues> = data =>
    login(
      {
        requestBody: data,
      },
      {
        onSuccess: ({ token }) => {
          if (token) {
            setToken(token);
            navigate('/');
          } else {
            toast.error(GENERIC_AUTH_ERROR_MESSAGE);
          }
        },
        onError: data => {
          if (data?.body?.error) {
            toast.error(`${data.body.error}: ${data?.body?.message}.`);
          } else {
            toast.error(GENERIC_AUTH_ERROR_MESSAGE);
          }
        },
      },
    );

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
}
