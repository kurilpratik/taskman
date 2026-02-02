import axios from 'axios';
import { getAccessTokenStore, setAccessTokenStore } from './token';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Request interceptor to add access token to headers
api.interceptors.request.use((config) => {
  const token = getAccessTokenStore();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //  Do NOT refresh on refresh endpoint itself otherwise it will loop
    if (originalRequest?.url?.includes('/auth/refresh')) {
      setAccessTokenStore(null);
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post('/auth/refresh');

        const newAccessToken = res.data.accessToken;
        setAccessTokenStore(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        setAccessTokenStore(null);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Attaches access token to every request
// Refreshes token automatically
// Retries failed request once
// Redirects on refresh failure

export default api;
