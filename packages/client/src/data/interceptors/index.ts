import { getValidToken } from '~/utils/token';

import { OpenAPI } from '../__generated__';

OpenAPI.interceptors.request.use(request => {
  const token = getValidToken();

  request.headers = [
    ['Authorization', `Bearer ${token}`],
    ['Content-Type', 'application/json'],
  ];

  return request;
});
