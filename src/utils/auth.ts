import jwt_decode from "jwt-decode";
import { tokenKey } from "../constants/config";


import { User } from "../context/AuthContext";

interface Token {
  accessToken: string;
  notBeforeTimestampInMillis: number;
  expirationTimestampInMillis: number;
}

class WrongCredentialsException extends Error {}

let logoutIfExpiredHandlerId: NodeJS.Timeout;

export function setLogoutIfExpiredHandler(
    setUser: (user: any) => void
) {
  if (!isTokenActive()) {
    return;
  }
  const token = getToken();
  if (!token) {
    return;
  }

  logoutIfExpiredHandlerId = setTimeout(
    () => setUser(undefined),
    token.expirationTimestampInMillis - Date.now()
  );
}

export function setAuthToken(accessToken: string, expiresIn: number) {
  const currentTimestamp = Date.now();
  const token: Token = {
    accessToken: accessToken,
    notBeforeTimestampInMillis: currentTimestamp,
    expirationTimestampInMillis: expiresIn * 1000 + currentTimestamp,
  };
  localStorage.setItem(tokenKey, JSON.stringify(token));
}

function logout() {
  removeAuthToken();
  clearTimeout(logoutIfExpiredHandlerId);
}

export function removeAuthToken() {
  localStorage.removeItem(tokenKey);
}

function getToken(): Token | null {
  let token: Token;
  const tokenJson = localStorage.getItem(tokenKey);
  if (tokenJson) {
    token = JSON.parse(tokenJson);
    return token;
  }
  return null;
}

function getAccessToken(): string {
  const token = getToken();
  if (token) {
    return token.accessToken;
  }
  return "";
}

export function getCurrentUser(): User | undefined {
  const token = getToken();
  if (token) {
    const { userId, userName, displayName } = jwt_decode<{
      sub: any;
    }>(token.accessToken).sub;
    const user = {
      id: userId,
      active: true,
      userName,
      displayName,
    };
    return user;
  } else {
    return undefined;
  }
}

function isTokenActive(): boolean {
  const token = getToken();
  const currentTimestamp = Date.now();

  return !!(
    token &&
    token.expirationTimestampInMillis - currentTimestamp > 0 &&
    token.notBeforeTimestampInMillis <= currentTimestamp
  );
}

export { WrongCredentialsException, logout, getAccessToken, isTokenActive };
