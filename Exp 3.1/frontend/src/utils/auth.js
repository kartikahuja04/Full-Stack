import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "authToken";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    clearToken();
    return null;
  }

  return {
    email: decoded.email,
    role: decoded.role
  };
}
