export type ApiUser = {
  _id: number;
  email: string;
  username: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  username: string;
};

export type SignupResponse = {
  message: string;
  result: ApiUser;
  success: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = ApiUser;

export type TokenRequest = {
  email: string;
  password: string;
};

export type TokenResponse = {
  access: string;
  refresh: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiErrorResponse = {
  message?: string;
  detail?: string;
  code?: string;
};

export type ApiTrack = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: unknown;
  track_file: string;
  staredUser: number[];
};

export type ApiSelection = {
  _id: number;
  name?: string;
  items: number[];
  owner: number[];
};