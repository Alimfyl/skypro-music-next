import type {
  ApiErrorResponse,
  ApiResponse,
  ApiSelection,
  ApiTrack,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignupRequest,
  SignupResponse,
  TokenRequest,
  TokenResponse,
} from './types';
import {
  getAccessToken,
  getRefreshToken,
  notifyAuthChange,
} from '@/utils/authStorage';

const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('401');
    }
    const errorData = data as ApiErrorResponse;

    throw new Error(
      errorData.message || errorData.detail || 'Ошибка запроса к серверу',
    );
  }

  return data as T;
}

async function requestWithAuth<T>(
  path: string,
  accessToken: string,
  options?: RequestInit,
): Promise<T> {
  return request<T>(path, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function withReAuth<T>(
  requestCallback: (accessToken: string) => Promise<T>,
): Promise<T> {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new Error('Необходимо войти в аккаунт');
  }

  try {
    return await requestCallback(accessToken);
  } catch (error) {
    if (!(error instanceof Error) || error.message !== '401') {
      throw error;
    }

    const refreshedTokens = await refreshAccessToken({
      refresh: refreshToken,
    });

    localStorage.setItem('accessToken', refreshedTokens.access);
    notifyAuthChange();

    return requestCallback(refreshedTokens.access);
  }
}

export function signupUser(data: SignupRequest): Promise<SignupResponse> {
  return request<SignupResponse>('/user/signup/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function loginUser(data: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>('/user/login/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getUserTokens(data: TokenRequest): Promise<TokenResponse> {
  return request<TokenResponse>('/user/token/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function refreshAccessToken(
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  return request<RefreshTokenResponse>('/user/token/refresh/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllTracks(): Promise<ApiTrack[]> {
  const response = await request<ApiResponse<ApiTrack[]>>('/catalog/track/all/');

  return response.data;
}

export async function getAllSelections(): Promise<ApiSelection[]> {
  const response = await request<ApiResponse<ApiSelection[]>>(
    '/catalog/selection/all',
  );

  return response.data;
}

export async function getSelectionById(id: number): Promise<ApiSelection | null> {
  const response = await request<ApiResponse<ApiSelection | null>>(
    `/catalog/selection/${id}/`,
  );

  return response.data;
}

export function getFavoriteTracks(): Promise<ApiTrack[]> {
  return withReAuth(async (accessToken) => {
    const response = await requestWithAuth<ApiResponse<ApiTrack[]>>(
      '/catalog/track/favorite/all/',
      accessToken,
    );

    return response.data;
  });
}

export function addTrackToFavorite(trackId: number): Promise<ApiTrack> {
  return withReAuth(async (accessToken) => {
    const response = await requestWithAuth<ApiResponse<ApiTrack>>(
      `/catalog/track/${trackId}/favorite/`,
      accessToken,
      {
        method: 'POST',
      },
    );

    return response.data;
  });
}

export function removeTrackFromFavorite(trackId: number): Promise<ApiTrack> {
  return withReAuth(async (accessToken) => {
    const response = await requestWithAuth<ApiResponse<ApiTrack>>(
      `/catalog/track/${trackId}/favorite/`,
      accessToken,
      {
        method: 'DELETE',
      },
    );

    return response.data;
  });
}