export interface ApiConfig {
  contentType?: string;
  withAuth?: boolean;
  timeout?: number;
  baseURL?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
  code?: string;
}

export interface TokenData {
  access_token: string;
  refresh_token?: string;
} 