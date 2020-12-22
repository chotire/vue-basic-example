import axios from 'axios';
import bus from '@/utils/bus';

function addInterceptor(instance, auth) {
  instance.interceptors.request.use(
    config => {
      if (auth) {
        config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
      }
      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    error => {
      if (Object.prototype.hasOwnProperty.call(error.config, 'errorHandle') && !error.config.errorHandle) {
        return Promise.reject(error);
      }
      bus.$emit('response:error', error);
      return Promise.reject(error);
    },
  );
  return instance;
}

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
const api = addInterceptor(axios.create(), true);
const http = addInterceptor(axios.create(), false);

export { api, http };
