import type {
  ApiErrorResponse,
  ApiSelection,
  ApiTrack,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  TokenRequest,
  TokenResponse,
} from './types';

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
    const errorData = data as ApiErrorResponse;

    throw new Error(
      errorData.message || errorData.detail || 'Ошибка запроса к серверу',
    );
  }

  return data as T;
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

export function getAllTracks(): Promise<ApiTrack[]> {
  return request<ApiTrack[]>('/catalog/track/all/');
}

export function getAllSelections(): Promise<ApiSelection[]> {
  return request<ApiSelection[]>('/catalog/selection/all');
}

export function getSelectionById(id: number): Promise<ApiSelection> {
  return request<ApiSelection>(`/catalog/selection/${id}/`);
}