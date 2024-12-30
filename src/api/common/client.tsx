import { Env } from '@env';
import axios from 'axios';
import { log } from './logger';
export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  responseType: 'json',
  timeout: 30000,
});

client.interceptors.request.use(
  (config) => {
    log('----------------REQUEST-------------------');
    log('URL:', `${Env.API_URL}${config.url}`);
    log('params', config.params);
    log('HEADER:', config.headers);
    log('Body:', config.data?.body || '');
    log('---------------END REQUEST----------------');
    if (config.headers.ProjectId) {
      config.headers.ProjectId = config.headers.ProjectId;
    }
    if (config.headers.Authorization) {
      config.headers.Authorization = config.headers.Authorization;
    }
    return config;
  },
  function error() {
    return Promise.reject(error);
  }
);

export const setupInterceptors = (onUnauthorized: () => void) => {
  client.interceptors.response.use(
    (response) => {
      if (response.data.status === 401) {
        onUnauthorized?.();
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
