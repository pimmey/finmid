import { JwtPayload, jwtDecode } from 'jwt-decode';

import { User } from '~/data/__generated__';

const TOKEN_LOCAL_STORAGE_KEY = 'sme_token';

type UserData = User & { smeId: string };
type SmeJwtPayload = JwtPayload & {
  userData: UserData;
};

function getToken(): string | null {
  return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
}

function isJWTExpired(token: string): boolean {
  const decoded = jwtDecode<JwtPayload>(token);

  if (!decoded.exp) {
    throw new Error('Invalid JWT auth: missing expiration');
  }

  return Date.now() >= decoded.exp * 1000;
}

export function getUserDataFromToken() {
  const token = getToken();
  const decoded = jwtDecode<SmeJwtPayload>(token!);
  return decoded.userData;
}

export function getValidToken(): string | boolean {
  const token = getToken();

  if (!token || isJWTExpired(token)) {
    return false;
  }

  return token;
}
