export const AUTH_CHANGE_EVENT = 'auth-change';

export function subscribeToAuth(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}

export function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getAccessToken() {
  return localStorage.getItem('accessToken') || '';
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken') || '';
}

export function getUserName() {
  return localStorage.getItem('userName') || '';
}

export function getUserId() {
  return localStorage.getItem('userId') || '';
}

export function getServerSnapshot() {
  return '';
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

export function saveAuthData({
  accessToken,
  refreshToken,
  userName,
  userId,
}: {
  accessToken: string;
  refreshToken: string;
  userName: string;
  userId: string;
}) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userName', userName);
  localStorage.setItem('userId', userId);
}

export function clearAuthStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
}