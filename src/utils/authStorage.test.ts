import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  AUTH_CHANGE_EVENT,
  clearAuthStorage,
  getAccessToken,
  getRefreshToken,
  getServerSnapshot,
  getUserId,
  getUserName,
  notifyAuthChange,
  saveAuthData,
  setAccessToken,
  subscribeToAuth,
} from './authStorage';

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns empty strings when auth data is missing', () => {
    expect(getAccessToken()).toBe('');
    expect(getRefreshToken()).toBe('');
    expect(getUserName()).toBe('');
    expect(getUserId()).toBe('');
    expect(getServerSnapshot()).toBe('');
  });

  it('sets access token', () => {
    setAccessToken('access-token');

    expect(getAccessToken()).toBe('access-token');
  });

  it('saves all auth data', () => {
    saveAuthData({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      userName: 'Almir',
      userId: '1',
    });

    expect(getAccessToken()).toBe('access-token');
    expect(getRefreshToken()).toBe('refresh-token');
    expect(getUserName()).toBe('Almir');
    expect(getUserId()).toBe('1');
  });

  it('clears auth data', () => {
    saveAuthData({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      userName: 'Almir',
      userId: '1',
    });

    clearAuthStorage();

    expect(getAccessToken()).toBe('');
    expect(getRefreshToken()).toBe('');
    expect(getUserName()).toBe('');
    expect(getUserId()).toBe('');
  });

  it('notifies about auth changes', () => {
    const listener = vi.fn();

    window.addEventListener(AUTH_CHANGE_EVENT, listener);
    notifyAuthChange();
    window.removeEventListener(AUTH_CHANGE_EVENT, listener);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('subscribes and unsubscribes from auth changes', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToAuth(listener);

    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    window.dispatchEvent(new Event('storage'));

    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();

    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    window.dispatchEvent(new Event('storage'));

    expect(listener).toHaveBeenCalledTimes(2);
  });
});