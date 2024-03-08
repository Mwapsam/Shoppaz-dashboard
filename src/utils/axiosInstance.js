import axios from 'axios';
import { ACCESS_KEY, BASE_URL, REFRESH_KEY } from '.';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const getUserTokens = () => {
  try {
    const accessToken = localStorage.getItem(ACCESS_KEY);
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error getting user tokens from local storage:', error);
    return { accessToken: null, refreshToken: null };
  }
};

const refreshTokens = async () => {
  try {
    const { refreshToken } = getUserTokens();
    const response = await axiosInstance.post('users/api/token/refresh/', {
      refresh: refreshToken,
    });

    const { access, refresh } = response.data.data;

    if (response.data.code === 200) {
      localStorage.setItem(ACCESS_KEY, access);
      localStorage.setItem(REFRESH_KEY, refresh);
    }

    return response.data;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return null;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = getUserTokens() ?? {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let logoutCallback;

export const setLogoutCallback = (callback) => {
  if (typeof callback === 'function') {
    logoutCallback = callback;
  } else {
    throw new Error('Callback must be a function');
  }
};

const isTokenRefreshableRequest = (config) => {
  return !config.url.includes('token/refresh') && !config.url.includes('public-endpoint');
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && isTokenRefreshableRequest(originalRequest) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokens = await refreshTokens();

        if (newTokens) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing tokens:', refreshError);

        if ((refreshError)?.response?.status === 401) {
          localStorage.removeItem(ACCESS_KEY);
          localStorage.removeItem(REFRESH_KEY);

          if (logoutCallback) {
            logoutCallback();
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
