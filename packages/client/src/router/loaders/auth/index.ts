import { redirect } from 'react-router-dom';

import { getValidToken } from '~/utils/token';

export async function authLoader() {
  const token = getValidToken();

  if (!token) {
    return redirect('/sign-in');
  }

  return null;
}
